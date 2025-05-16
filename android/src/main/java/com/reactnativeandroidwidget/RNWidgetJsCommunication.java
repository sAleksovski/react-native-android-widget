package com.reactnativeandroidwidget;

import android.content.Context;

import androidx.work.Data;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;

import java.util.concurrent.TimeUnit;

public class RNWidgetJsCommunication {
    public static void requestWidgetUpdate(Context context, String widgetName) {
        int[] widgetIds = RNWidgetUtil.getWidgetIds(context, widgetName);

        for (int widgetId : widgetIds) {
            Data data = buildData(context, widgetName, widgetId, "WIDGET_UPDATE");
            startBackgroundTask(context, data);
        }
    }

    protected static void startBackgroundTask(Context context, Data data) {
        workManagerWorkaround(context);

        OneTimeWorkRequest headlessJsTaskWorkRequest =
            new OneTimeWorkRequest.Builder(RNWidgetBackgroundTaskWorker.class)
                .setInputData(data)
                .build();

        WorkManager
            .getInstance(context)
            .enqueue(headlessJsTaskWorkRequest);
    }

    // `APPWIDGET_UPDATE` (`onUpdate`) method is called when the WorkManager queue is empty.
    // Since we enqueue only on WorkRequest, the queue will be empty after every execution of the
    // widgetTaskHandler.
    // This is a bug in android (https://issuetracker.google.com/issues/115575872).
    //
    // The suggested workaround is to schedule another WorkRequest really far out into the future.
    // So, we are creating a OneTimeWorkRequest with an initial delay of 10 years, with a name
    // `app.package.WORK_MANAGER_HACK`.
    //
    // Every time when we schedule another WorkRequest, we REPLACE the WorkRequest with a new one.
    // That way there is always at least one outstanding request, and `onUpdate` is not called when
    // the WorkManager finishes with its work.
    private static void workManagerWorkaround(Context context) {
        OneTimeWorkRequest headlessJsTaskWorkRequest =
            new OneTimeWorkRequest.Builder(RNWidgetBackgroundTaskWorker.class)
                .setInputData(Data.EMPTY)
                .setInitialDelay(10 * 365, TimeUnit.DAYS)
                .build();

        WorkManager.getInstance(context)
            .enqueueUniqueWork(
                context.getPackageName() + ".WORK_MANAGER_HACK",
                ExistingWorkPolicy.REPLACE,
                headlessJsTaskWorkRequest
            );
    }

    protected static Data buildData(Context context, String widgetName, int widgetId, String widgetAction, Data additionalData) {
        return new Data.Builder()
            .putString("widgetName", widgetName)
            .putInt("widgetId", widgetId)
            .putInt("width", RNWidgetUtil.getWidgetWidth(context, widgetId))
            .putInt("height", RNWidgetUtil.getWidgetHeight(context, widgetId))
            .putString("widgetAction", widgetAction)
            .putAll(additionalData)
            .build();
    }

    protected static Data buildData(Context context, String widgetName, int widgetId, String widgetAction) {
        return buildData(context, widgetName, widgetId, widgetAction, Data.EMPTY);
    }
}
