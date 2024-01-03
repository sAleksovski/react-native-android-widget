package com.reactnativeandroidwidget;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.work.Data;
import androidx.work.WorkerParameters;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.reactnativeandroidwidget.oss.HeadlessJsTaskWorker;

import java.util.HashMap;
import java.util.Map;

public class RNWidgetBackgroundTaskWorker extends HeadlessJsTaskWorker {

    public RNWidgetBackgroundTaskWorker(
        @NonNull Context context,
        @NonNull WorkerParameters params) {
        super(context, params);
    }

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Data data) {
        Map<String, Object> arguments = new HashMap<>(data.getKeyValueMap());
        arguments.put("screenInfo", RNWidgetUtil.getScreenInfo(getApplicationContext()).toHashMap());

        return new HeadlessJsTaskConfig(
            "RNWidgetBackgroundTask",
            Arguments.makeNativeMap(arguments),
            30 * 1000,
            true
        );
    }
}
