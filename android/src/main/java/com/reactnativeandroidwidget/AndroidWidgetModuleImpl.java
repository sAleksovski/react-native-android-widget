package com.reactnativeandroidwidget;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;

/**
 * This is where the module implementation lives
 * The exposed methods can be defined in the `turbo` and `legacy` folders
 */
public class AndroidWidgetModuleImpl  {
  public static final String NAME = "AndroidWidget";

  public static void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
}
