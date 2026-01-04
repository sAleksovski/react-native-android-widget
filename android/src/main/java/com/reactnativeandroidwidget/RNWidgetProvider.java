package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;

import androidx.work.Data;

import com.facebook.react.bridge.Arguments;

import org.json.JSONObject;

public class RNWidgetProvider extends AppWidgetProvider {
    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);

        if (isSizeChanged(context, appWidgetId)) {
            storeWidgetSize(context, appWidgetId);

            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), appWidgetId, "WIDGET_RESIZED");
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            String widgetAction = isWidgetNew(context, widgetId) ? "WIDGET_ADDED" : "WIDGET_UPDATE";
            storeWidgetSize(context, widgetId);

            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, widgetAction);
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!incomingIntent.getAction().startsWith(context.getPackageName() + ".WIDGET")) {
            return;
        }

        int widgetId = incomingIntent.getIntExtra("widgetId", -1);

        switch (incomingIntent.getStringExtra("clickAction")) {
            case "OPEN_APP":
                openApp(context);
                break;
            case "OPEN_URI":
                openUri(context, incomingIntent.getBundleExtra("clickActionData").getString("uri"));
                break;
            default:
                handleWidgetClick(context, incomingIntent, widgetId);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        super.onDeleted(context, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            removeWidgetSize(context, widgetId);
            RNWidgetImageProvider.deleteWidgetImages(context, widgetId);

            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, "WIDGET_DELETED");
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
    }

    private boolean isSizeChanged(Context context, int widgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences(
            context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);
        int oldWidth = sharedPref.getInt(widgetId + "-width", 0);
        int oldHeight = sharedPref.getInt(widgetId + "-height", 0);
        int newWidth = RNWidgetUtil.getWidgetWidth(context, widgetId);
        int newHeight = RNWidgetUtil.getWidgetHeight(context, widgetId);

        return oldWidth != newWidth || oldHeight != newHeight;
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

    private boolean isWidgetNew(Context context, int widgetId) {
        SharedPreferences sharedPref = context.getSharedPreferences(
            context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);
        int oldWidth = sharedPref.getInt(widgetId + "-width", -1);
        return oldWidth == -1;
    }

    private void openApp(Context context) {
        try {
            Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
            context.startActivity(launchIntent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void openUri(Context context, String uri) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void handleWidgetClick(Context context, Intent incomingIntent, int widgetId) {
        Data additionalData = Data.EMPTY;

        if (incomingIntent.hasExtra("clickAction")) {
            Bundle clickActionData = incomingIntent.getBundleExtra("clickActionData");
            additionalData = new Data.Builder()
                .putString("clickAction", incomingIntent.getStringExtra("clickAction"))
                .putString("clickActionData", new JSONObject(Arguments.fromBundle(clickActionData).toHashMap()).toString())
                .build();
        }

        Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, "WIDGET_CLICK", additionalData);
        RNWidgetJsCommunication.startBackgroundTask(context, data);
    }
}
