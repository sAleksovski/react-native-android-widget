package com.reactnativeandroidwidget;

import static android.content.res.Configuration.ORIENTATION_PORTRAIT;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.widget.RemoteViews;

import com.facebook.react.HeadlessJsTaskService;

public class RNWidgetProvider extends AppWidgetProvider {
    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);

        Intent backgroundTaskIntent = buildIntent(context, appWidgetId, "WIDGET_RESIZED");

        executeJs(context, backgroundTaskIntent, appWidgetId);
    }

    /*
     * When enabled on screen, let the BackgroundTaskBridge
     * manipulate it from javascript
     */
//    @Override
//    public void onEnabled(Context context) {
//        int widgetId = getNewestWidgetId(context);
//
//        Intent backgroundTaskIntent = buildIntent(context, widgetId, "WIDGET_ADDED");
//
//        executeJs(context, backgroundTaskIntent, widgetId);
//    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            Intent backgroundTaskIntent = buildIntent(context, widgetId, "WIDGET_ADDED");

            executeJs(context, backgroundTaskIntent, widgetId);
        }
    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!incomingIntent.getAction().startsWith("com.reactnativeandroidwidget.WIDGET")) {
            return;
        }

        int widgetId = incomingIntent.getIntExtra("widgetId", -1);
        String action = incomingIntent.hasExtra("widgetAction") ? incomingIntent.getStringExtra("widgetAction") : "WIDGET_CLICK";

        Intent backgroundTaskIntent = buildIntent(context, widgetId, action);

        if (incomingIntent.hasExtra("clickAction")) {
            backgroundTaskIntent.putExtra("clickAction", incomingIntent.getStringExtra("clickAction"));
        }

        startBackgroundTask(context, backgroundTaskIntent);
    }

    private Intent buildIntent(Context context, int widgetId, String action) {
        Intent backgroundTaskIntent = new Intent(context, RNWidgetBackgroundTaskService.class);
        backgroundTaskIntent.putExtra("widgetAction", action);
        backgroundTaskIntent.putExtra("widgetId", widgetId);
        backgroundTaskIntent.putExtra("widgetName", getClass().getSimpleName());
        backgroundTaskIntent.putExtra("width", getWidgetWidth(context, widgetId));
        backgroundTaskIntent.putExtra("height", getWidgetHeight(context, widgetId));
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

        Intent intent = new Intent("com.reactnativeandroidwidget.WIDGET_CLICK");
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

    private int getWidgetWidth(Context context, int widgetId) {
        boolean isPortrait = context.getResources().getConfiguration().orientation == ORIENTATION_PORTRAIT;
        if (isPortrait) {
            return dipToPx(context, getWidgetSizeInDp(context, widgetId, AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH));
        } else {
            return dipToPx(context, getWidgetSizeInDp(context, widgetId, AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH));
        }
    }

    private int getWidgetHeight(Context context, int widgetId) {
        boolean isPortrait = context.getResources().getConfiguration().orientation == ORIENTATION_PORTRAIT;
        if (isPortrait) {
            return dipToPx(context, getWidgetSizeInDp(context, widgetId, AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT));
        } else {
            return dipToPx(context, getWidgetSizeInDp(context, widgetId, AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT));
        }
    }

    private int getWidgetSizeInDp(Context context, int widgetId, String key) {
        return AppWidgetManager.getInstance(context).getAppWidgetOptions(widgetId).getInt(key, 0);
    }

    private int dipToPx(Context context, int dipValue) {
        return Math.round(dipValue * context.getResources().getDisplayMetrics().density);
    }
}
