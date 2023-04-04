package com.reactnativeandroidwidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.widget.RemoteViews;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;

public class RNWidgetProvider extends AppWidgetProvider {
    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);

        if (isSizeChanged(context, appWidgetId)) {
            Intent backgroundTaskIntent = buildIntent(context, appWidgetId, "WIDGET_RESIZED");

            executeJs(context, backgroundTaskIntent, appWidgetId);
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            storeWidgetSize(context, widgetId);

            Intent backgroundTaskIntent = buildIntent(context, widgetId, "WIDGET_ADDED");
            executeJs(context, backgroundTaskIntent, widgetId);
        }
    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!incomingIntent.getAction().startsWith(context.getPackageName() + ".WIDGET")) {
            return;
        }

        int widgetId = incomingIntent.getIntExtra("widgetId", -1);
        String action = incomingIntent.hasExtra("widgetAction") ? incomingIntent.getStringExtra("widgetAction") : "WIDGET_CLICK";
        boolean openApp = incomingIntent.hasExtra("openApp") && incomingIntent.getBooleanExtra("openApp", false);

        if (openApp) {
            try {
                Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                if (incomingIntent.hasExtra("clickActionData")) {
                    launchIntent.putExtra("clickActionData", incomingIntent.getBundleExtra("clickActionData"));
                }
                context.startActivity(launchIntent);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            Intent backgroundTaskIntent = buildIntent(context, widgetId, action);

            if (incomingIntent.hasExtra("clickAction")) {
                backgroundTaskIntent.putExtra("clickAction", incomingIntent.getStringExtra("clickAction"));
                backgroundTaskIntent.putExtra("clickActionData", incomingIntent.getBundleExtra("clickActionData"));
            }

            startBackgroundTask(context, backgroundTaskIntent);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        super.onDeleted(context, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            removeWidgetSize(context, widgetId);
        }
    }

    private Intent buildIntent(Context context, int widgetId, String action) {
        Bundle screenInfoBundle = new Bundle();
        screenInfoBundle.putBundle("screenInfo", Arguments.toBundle(RNWidgetUtil.getScreenInfo(context)));

        Intent backgroundTaskIntent = new Intent(context, RNWidgetBackgroundTaskService.class);
        backgroundTaskIntent.putExtra("widgetName", getClass().getSimpleName());
        backgroundTaskIntent.putExtra("widgetId", widgetId);
        backgroundTaskIntent.putExtra("width", RNWidgetUtil.getWidgetWidth(context, widgetId));
        backgroundTaskIntent.putExtra("height", RNWidgetUtil.getWidgetHeight(context, widgetId));
        backgroundTaskIntent.putExtra("widgetAction", action);
        backgroundTaskIntent.putExtras(screenInfoBundle);
        return backgroundTaskIntent;
    }

    private void executeJs(Context context, Intent backgroundTaskIntent, int widgetId) {
        // Android 12+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            addClickToUpdateOverlay(context, backgroundTaskIntent, widgetId);
        } else {
            startBackgroundTask(context, backgroundTaskIntent);
        }
    }

    private void addClickToUpdateOverlay(Context context, Intent backgroundTaskIntent, int widgetId) {
        RemoteViews remoteWidgetView = new RemoteViews(context.getPackageName(), R.layout.rn_widget);
        RemoteViews clickableView = new RemoteViews(context.getPackageName(), R.layout.rn_widget_placeholder);

        Intent intent = new Intent(context.getPackageName() + ".WIDGET_CLICK");
        intent.setClass(context, getClass());
        intent.putExtra("widgetId", widgetId);
        intent.putExtra("widgetAction", backgroundTaskIntent.getStringExtra("widgetAction"));

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            context,
            (int) System.currentTimeMillis(),
            intent,
            PendingIntent.FLAG_CANCEL_CURRENT
                | PendingIntent.FLAG_MUTABLE
        );
        clickableView.setOnClickPendingIntent(R.id.rn_widget_placeholder_click_to_update, pendingIntent);

        remoteWidgetView.removeAllViews(R.id.rn_widget_clickable_container);
        remoteWidgetView.addView(R.id.rn_widget_clickable_container, clickableView);

        AppWidgetManager.getInstance(context)
            .updateAppWidget(widgetId, remoteWidgetView);
    }

    private void startBackgroundTask(Context context, Intent serviceIntent) {
        HeadlessJsTaskService.acquireWakeLockNow(context);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }
    }

    private boolean isSizeChanged(Context context, int widgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences(
            context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);
        int oldWidth = sharedPref.getInt(widgetId + "-width", 0);
        int oldHeight = sharedPref.getInt(widgetId + "-height", 0);
        int newWidth = RNWidgetUtil.getWidgetWidth(context, widgetId);
        int newHeight = RNWidgetUtil.getWidgetHeight(context, widgetId);

        boolean sizeChanged = oldWidth != newWidth || oldHeight != newHeight;

        if (sizeChanged) {
            SharedPreferences.Editor editor = sharedPref.edit();

            editor.putInt(widgetId + "-width", newWidth);
            editor.putInt(widgetId + "-height", newHeight);

            editor.apply();
        }

        return sizeChanged;
    }

    private void storeWidgetSize(Context context, int widgetId) {
        int width = RNWidgetUtil.getWidgetWidth(context, widgetId);
        int height = RNWidgetUtil.getWidgetHeight(context, widgetId);

        SharedPreferences sharedPref = context.getSharedPreferences(
            context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedPref.edit();

        editor.putInt(widgetId + "-width", width);
        editor.putInt(widgetId + "-height", height);

        editor.apply();
    }

    private void removeWidgetSize(Context context, int widgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences(
            context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedPref.edit();

        editor.remove(widgetId + "-width");
        editor.remove(widgetId + "-height");

        editor.apply();
    }
}
