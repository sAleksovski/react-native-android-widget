package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.work.Data;

import com.facebook.react.bridge.Arguments;

import org.json.JSONObject;

public class RNWidgetProvider extends AppWidgetProvider {
    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);

        if (RNWidgetSizing.updateStoredSize(context, appWidgetId)) {
            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), appWidgetId, "WIDGET_RESIZED");
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            String widgetAction = RNWidgetSizing.isWidgetNew(context, widgetId) ? "WIDGET_ADDED" : "WIDGET_UPDATE";
            RNWidgetSizing.updateStoredSize(context, widgetId);

            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, widgetAction);
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!(context.getPackageName() + ".WIDGET_CLICK").equals(incomingIntent.getAction())) {
            return;
        }

        int widgetId = incomingIntent.getIntExtra("widgetId", -1);

        if (RNWidgetSizing.correct(context, widgetId, incomingIntent)) {
            RNWidgetSizing.updateStoredSize(context, widgetId);
            Data resizeData = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, "WIDGET_RESIZED");
            RNWidgetJsCommunication.startBackgroundTask(context, resizeData);
            // Before correction, the image and hit areas may disagree. Consume this tap
            // instead of executing a potentially unintended custom or native action.
            return;
        }
        // A second tap can arrive before the corrective render replaces the old overlays.
        if (RNWidgetSizing.hasOutdatedSize(context, widgetId, incomingIntent)) return;
        String clickAction = incomingIntent.getStringExtra("clickAction");
        if (clickAction != null) {
            switch (clickAction) {
                case "OPEN_APP":
                    openApp(context);
                    break;
                case "OPEN_URI":
                    openUri(context, incomingIntent.getBundleExtra("clickActionData").getString("uri"));
                    break;
                default:
                    handleWidgetClick(context, incomingIntent, widgetId);
                    return;
            }
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        super.onDeleted(context, appWidgetIds);

        for (int widgetId : appWidgetIds) {
            RNWidgetSizing.clear(context, widgetId);
            RNWidgetImageProvider.deleteWidgetImages(context, widgetId);

            Data data = RNWidgetJsCommunication.buildData(context, getClass().getSimpleName(), widgetId, "WIDGET_DELETED");
            RNWidgetJsCommunication.startBackgroundTask(context, data);
        }
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
            Intent ownIntent = new Intent(intent).setPackage(context.getPackageName());
            if (ownIntent.resolveActivity(context.getPackageManager()) != null) {
                intent = ownIntent;
            }
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
