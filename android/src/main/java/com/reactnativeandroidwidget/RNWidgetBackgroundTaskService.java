package com.reactnativeandroidwidget;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class RNWidgetBackgroundTaskService extends HeadlessJsTaskService {

    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        WritableMap data = extras != null ? Arguments.fromBundle(extras) : Arguments.createMap();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createChannel();
            Notification notification = new NotificationCompat.Builder(getApplicationContext(), "demo")
                .setContentTitle("Headless Work")
                .setTicker("run")
                .setSilent(true)
                .setOngoing(true)
                .build();
            startForeground(1, notification);
        }

        return new HeadlessJsTaskConfig(
            "RNWidgetBackgroundTaskService",
            data,
            5000,
            true
        );
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private void createChannel() {
        String description = "test channel";
        int importance = NotificationManager.IMPORTANCE_DEFAULT;
        NotificationChannel channel = new NotificationChannel("demo", "test", importance);
        channel.setDescription(description);
        NotificationManager notificationManager =
            (NotificationManager) getApplicationContext().getSystemService(NOTIFICATION_SERVICE);

        notificationManager.createNotificationChannel(channel);
    }
}
