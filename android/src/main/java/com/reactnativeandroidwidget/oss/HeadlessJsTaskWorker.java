// MIT License
//
// Copyright (c) 2022 Jay Kim
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// https://github.com/wjaykim/react-native-headless-task-worker
package com.reactnativeandroidwidget.oss;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.concurrent.futures.CallbackToFutureAdapter;
import androidx.work.Data;
import androidx.work.ListenableWorker;
import androidx.work.WorkerParameters;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceEventListener;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.jstasks.HeadlessJsTaskContext;
import com.facebook.react.jstasks.HeadlessJsTaskEventListener;
import com.google.common.util.concurrent.ListenableFuture;

public abstract class HeadlessJsTaskWorker extends ListenableWorker implements HeadlessJsTaskEventListener {
    private int taskId;
    private CallbackToFutureAdapter.Completer<Result> mCompleter;

    public HeadlessJsTaskWorker(
        @NonNull Context context,
        @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public ListenableFuture<Result> startWork() {
        return CallbackToFutureAdapter.getFuture(completer -> {
            HeadlessJsTaskConfig taskConfig = this.getTaskConfig(this.getInputData());
            mCompleter = completer;
            if (taskConfig != null) {
                this.startTask(taskConfig);
            } else {
                mCompleter.set(Result.failure());
            }
            return "";
        });
    }

    @Nullable
    protected abstract HeadlessJsTaskConfig getTaskConfig(Data data);

    protected void startTask(final HeadlessJsTaskConfig taskConfig) {
        final ReactInstanceManager reactInstanceManager = this.getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
        if (reactContext == null) {
            reactInstanceManager.addReactInstanceEventListener(new ReactInstanceEventListener() {
                public void onReactContextInitialized(ReactContext reactContext) {
                    HeadlessJsTaskWorker.this.invokeStartTask(reactContext, taskConfig);
                    reactInstanceManager.removeReactInstanceEventListener(this);
                }
            });
            reactInstanceManager.createReactContextInBackground();
        } else {
            this.invokeStartTask(reactContext, taskConfig);
        }
    }

    private void invokeStartTask(ReactContext reactContext, final HeadlessJsTaskConfig taskConfig) {
        final HeadlessJsTaskContext headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactContext);
        headlessJsTaskContext.addTaskEventListener(this);
        UiThreadUtil.runOnUiThread(() -> this.taskId = headlessJsTaskContext.startTask(taskConfig));
    }

    private void cleanUpTask() {
        if (this.getReactNativeHost().hasInstance()) {
            ReactInstanceManager reactInstanceManager = this.getReactNativeHost().getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if (reactContext != null) {
                HeadlessJsTaskContext headlessJsTaskContext = HeadlessJsTaskContext.getInstance(reactContext);
                headlessJsTaskContext.removeTaskEventListener(this);
            }
        }
    }

    @Override
    public void onStopped() {
        super.onStopped();
        cleanUpTask();
    }

    @Override
    public void onHeadlessJsTaskStart(int taskId) {

    }

    @Override
    public void onHeadlessJsTaskFinish(int taskId) {
        if (this.taskId == taskId) {
            if (this.mCompleter != null) {
                this.mCompleter.set(Result.success());
                cleanUpTask();
            }
        }
    }

    protected ReactNativeHost getReactNativeHost() {
        return ((ReactApplication) this.getApplicationContext()).getReactNativeHost();
    }
}
