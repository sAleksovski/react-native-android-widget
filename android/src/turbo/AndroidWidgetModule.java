package com.reactnativeandroidwidget;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class AndroidWidgetModule extends NativeAndroidWidgetSpec {
    public static final String NAME = AndroidWidgetModuleImpl.NAME;

    AndroidWidgetModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return AndroidWidgetModuleImpl.NAME;
    }

    @Override
    @ReactMethod
    public void drawWidget(ReadableMap config, String widgetName) {
        AndroidWidgetModuleImpl.drawWidget(this.getReactApplicationContext(), config, widgetName);
    }

    @Override
    @ReactMethod
    public void drawWidgetById(ReadableMap config, String widgetName, double widgetId) {
        AndroidWidgetModuleImpl.drawWidgetById(this.getReactApplicationContext(), config, widgetName, (int) widgetId);
    }

    @Override
    @ReactMethod
    public void createPreview(ReadableMap config, double width, double height, Promise promise) {
        AndroidWidgetModuleImpl.createPreview(this.getReactApplicationContext(), config, (int) width, (int) height, promise);
    }

    @Override
    @ReactMethod
    public void getWidgetInfo(String widgetName, Promise promise) {
        AndroidWidgetModuleImpl.getWidgetInfo(this.getReactApplicationContext(), widgetName, promise);
    }
}
