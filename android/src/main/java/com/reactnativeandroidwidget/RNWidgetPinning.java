package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Build;

import com.facebook.react.bridge.Promise;

public class RNWidgetPinning {
    public static void requestPinWidget(Context context, String widgetName, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            promise.resolve(false);
            return;
        }

        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);

        if (!appWidgetManager.isRequestPinAppWidgetSupported()) {
            promise.resolve(false);
            return;
        }

        String providerClassName = RNWidgetUtil.getWidgetProviderClassName(context, widgetName);
        if (providerClassName == null) {
            promise.reject(
                "E_WIDGET_NOT_FOUND",
                "No widget provider named '" + widgetName + "' was found in this application."
            );
            return;
        }

        try {
            ComponentName provider = new ComponentName(context, providerClassName);
            promise.resolve(appWidgetManager.requestPinAppWidget(provider, null, null));
        } catch (Exception e) {
            promise.reject("E_REQUEST_PIN_WIDGET", "Failed to request pinning widget '" + widgetName + "'.", e);
        }
    }
}
