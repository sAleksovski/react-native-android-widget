package com.reactnativeandroidwidget;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

public class AndroidWidgetModule extends com.reactnativeandroidwidget.AndroidWidgetSpec {
    public static final String NAME = "AndroidWidget";

    AndroidWidgetModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void drawWidget(ReadableMap config, String widgetName) {
        try {
            new RNWidget(getReactApplicationContext(), config, widgetName).drawWidgets();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void drawWidgetById(ReadableMap config, String widgetName, double widgetId) {
        try {
            new RNWidget(getReactApplicationContext(), config, widgetName).drawWidget((int) widgetId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void createPreview(ReadableMap config, double width, double height, Promise promise) {
        String preview = null;
        try {
            preview = new RNWidget(getReactApplicationContext(), config).createPreview((int) width, (int) height);
        } catch (Exception e) {
            e.printStackTrace();
        }
        promise.resolve(preview);
    }

    @ReactMethod
    public void getWidgetInfo(String widgetName, Promise promise) {
        WritableArray widgetInfo = RNWidgetUtil.getWidgetInfo(getReactApplicationContext(), widgetName);
        promise.resolve(widgetInfo);
    }
}
