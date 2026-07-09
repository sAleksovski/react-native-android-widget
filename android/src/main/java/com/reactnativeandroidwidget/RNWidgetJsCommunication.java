package com.reactnativeandroidwidget;

import android.content.Context;
import android.os.Build;

import androidx.work.Data;
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.OutOfQuotaPolicy;
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

        OneTimeWorkRequest.Builder builder =
            new OneTimeWorkRequest.Builder(RNWidgetBackgroundTaskWorker.class)
                .setInputData(data);

        // Widget updates are user-visible and usually user-initiated (adding/resizing a widget, or a
        // click that maps to WIDGET_CLICK), so they should run as soon as possible. A plain
        // OneTimeWorkRequest is deferrable work: when the app is not in the foreground WorkManager can
        // hold it back (Doze / App Standby / batching), which is why widgets can appear to only refresh
        // once the host app is opened. Requesting an expedited job lets the system run the task
        // immediately when possible. See https://github.com/sAleksovski/react-native-android-widget/issues/145
        //
        // Expedited work is only requested on API 31+. There, expedited jobs are backed by JobScheduler
        // and do not require a foreground service. On older versions WorkManager backs expedited work with
        // a foreground service, which needs the worker to implement getForegroundInfo() (see
        // ListenableWorker#getForegroundInfoAsync) — RNWidgetBackgroundTaskWorker does not, so we keep the
        // existing deferrable behavior below API 31 to avoid the resulting IllegalStateException.
        //
        // RUN_AS_NON_EXPEDITED_WORK_REQUEST makes the request fall back to a regular deferrable job once
        // the app's (quota-limited) expedited execution budget is exhausted, so enqueue never fails.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            builder.setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST);
        }

        WorkManager
            .getInstance(context)
            .enqueue(builder.build());
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
