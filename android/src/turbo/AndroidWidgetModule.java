package com.reactnativeandroidwidget;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

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

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @Override
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    AndroidWidgetModuleImpl.multiply(a, b, promise);
  }
}
