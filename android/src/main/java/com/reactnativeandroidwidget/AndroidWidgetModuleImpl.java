package com.reactnativeandroidwidget;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.demo.BitmapDemo;

/**
 * This is where the module implementation lives
 * The exposed methods can be defined in the `turbo` and `legacy` folders
 */
public class AndroidWidgetModuleImpl  {
  public static final String NAME = "AndroidWidget";

  public static void drawWidget(ReactApplicationContext context, ReadableMap config, String widgetName) {
    try {
      new BitmapDemo(context, config, widgetName).drawWidgets();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void drawWidgetById(ReactApplicationContext context, ReadableMap config, String widgetName, int widgetId) {
    try {
      new BitmapDemo(context, config, widgetName).drawWidget(widgetId);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void createPreview(ReactApplicationContext context, ReadableMap config, String widgetName, int width, int height, Promise promise) {
    String preview = null;
    try {
      preview = new BitmapDemo(context, config, widgetName).createPreview(width, height);
    } catch (Exception e) {
      e.printStackTrace();
    }
    promise.resolve(preview);
  }
}
