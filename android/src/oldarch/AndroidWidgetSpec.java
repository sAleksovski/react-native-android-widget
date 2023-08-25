package com.reactnativeandroidwidget;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;

abstract class AndroidWidgetSpec extends ReactContextBaseJavaModule {
    AndroidWidgetSpec(ReactApplicationContext context) {
        super(context);
    }

    public abstract void drawWidget(ReadableMap config, String widgetName);

    public abstract void drawWidgetById(ReadableMap config, String widgetName, double widgetId);

    public abstract void createPreview(ReadableMap config, double width, double height, Promise promise);

    public abstract void getWidgetInfo(String widgetName, Promise promise);

    public abstract void finishWidgetConfiguration(double widgetId, String result);
}
