package com.reactnativeandroidwidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

public class RNWidgetPinning {
    public static void isRequestPinWidgetSupported(Context context, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            promise.resolve(false);
            return;
        }

        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        promise.resolve(appWidgetManager.isRequestPinAppWidgetSupported());
    }

    public static void requestPinWidget(Context context, String widgetName, @Nullable ReadableMap callbackData, Promise promise) {
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
            promise.resolve(appWidgetManager.requestPinAppWidget(provider, null, createSuccessCallback(context, provider, callbackData)));
        } catch (Exception e) {
            promise.reject("E_REQUEST_PIN_WIDGET", "Failed to request pinning widget '" + widgetName + "'.", e);
        }
    }

    @Nullable
    private static PendingIntent createSuccessCallback(Context context, ComponentName provider, @Nullable ReadableMap callbackData) {
        if (callbackData == null) {
            return null;
        }

        // Delivered to the provider as a click, with the new widget's id in EXTRA_APPWIDGET_ID.
        // Its own action keeps it from matching the widget's click PendingIntents, and it must be
        // mutable so the system can add the widget id.
        Intent intent = new Intent(context.getPackageName() + ".WIDGET_PINNED");
        intent.setComponent(provider);
        intent.putExtra("clickAction", "WIDGET_PINNED");
        intent.putExtra("clickActionData", Arguments.toBundle(callbackData));
        return PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT
                | PendingIntent.FLAG_MUTABLE
        );
    }
}
