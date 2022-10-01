package com.reactnativeandroidwidget;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class AndroidWidgetModule extends ReactContextBaseJavaModule {
    public static final String NAME = AndroidWidgetModuleImpl.NAME;

    AndroidWidgetModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return AndroidWidgetModuleImpl.NAME;
    }

    @ReactMethod
    public void drawWidget(ReadableMap config, String widgetName) {
        AndroidWidgetModuleImpl.drawWidget(this.getReactApplicationContext(), config, widgetName);
    }

    @ReactMethod
    public void drawWidgetById(ReadableMap config, String widgetName, double widgetId) {
        AndroidWidgetModuleImpl.drawWidgetById(this.getReactApplicationContext(), config, widgetName, (int) widgetId);
    }

    @ReactMethod
    public void createPreview(ReadableMap config, String widgetName, double width, double height, Promise promise) {
        AndroidWidgetModuleImpl.createPreview(this.getReactApplicationContext(), config, widgetName, (int) width, (int) height, promise);
    }
}
