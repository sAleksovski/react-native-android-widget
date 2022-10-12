package com.reactnativeandroidwidget;

import static android.content.res.Configuration.ORIENTATION_PORTRAIT;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProviderInfo;
import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RemoteViews;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.builder.ClickableView;
import com.reactnativeandroidwidget.builder.WidgetFactory;
import com.reactnativeandroidwidget.builder.WidgetWithViews;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class RNWidget {
    private final ReactApplicationContext appContext;
    private final ReadableMap config;
    private final String widgetName;

    public RNWidget(ReactApplicationContext context, ReadableMap config, String widgetName) {
        this.appContext = context;
        this.config = config;
        this.widgetName = widgetName;
    }

    public RNWidget(ReactApplicationContext context, ReadableMap config) {
        this(context, config, "");
    }

    public void drawWidgets() throws Exception {
        int[] widgetIds = getWidgetIds();

        for (int widgetId : widgetIds) {
            drawWidget(widgetId);
        }
    }

    public void drawWidget(int widgetId) throws Exception {
        ReadableMap configClone = Arguments.makeNativeMap(config.toHashMap());
        RemoteViews remoteWidgetView = new RemoteViews(appContext.getPackageName(), R.layout.rn_widget);

        int widgetWidth = getWidgetWidth(widgetId);
        int widgetHeight = getWidgetHeight(widgetId);

        WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(appContext, configClone, widgetWidth, widgetHeight);
        View rootView = widgetWithViews.getRootView();

        Bitmap bitmap = Bitmap.createBitmap(
            widgetWidth,
            widgetHeight,
            Bitmap.Config.ARGB_8888
        );
        Canvas bitmapHolder = new Canvas(bitmap);
        rootView.draw(bitmapHolder);

        remoteWidgetView.setImageViewBitmap(R.id.rn_widget_image, bitmap);

        remoteWidgetView.removeAllViews(R.id.rn_widget_clickable_container);
        List<ClickableView> clickableViews = widgetWithViews.getClickableViews();
        for (int i = 0; i < clickableViews.size(); i++) {
            ClickableView clickableView = clickableViews.get(i);
            addClickableArea(remoteWidgetView, (ViewGroup) rootView, clickableView, widgetId);
        }

        AppWidgetManager.getInstance(appContext)
            .updateAppWidget(widgetId, remoteWidgetView);
    }

    public String createPreview(int width, int height) throws Exception {
        ReadableMap configClone = Arguments.makeNativeMap(config.toHashMap());

        WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(appContext, configClone, dipToPx(width), dipToPx(height));
        View rootView = widgetWithViews.getRootView();

        Bitmap bitmap = Bitmap.createBitmap(
            dipToPx(width),
            dipToPx(height),
            Bitmap.Config.ARGB_8888
        );
        Canvas bitmapHolder = new Canvas(bitmap);
        rootView.draw(bitmapHolder);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private int[] getWidgetIds() {
        String widgetProviderClassName = getWidgetProviderClassName();

        if (widgetProviderClassName == null) {
            return new int[]{};
        }

        ComponentName name = new ComponentName(appContext, widgetProviderClassName);
        return AppWidgetManager.getInstance(appContext).getAppWidgetIds(name);
    }

    private String getWidgetProviderClassName() {
        List<AppWidgetProviderInfo> installedProviders = AppWidgetManager.getInstance(appContext).getInstalledProviders();

        for (AppWidgetProviderInfo providerInfo : installedProviders) {
            if (providerInfo.provider.getPackageName().equals(appContext.getPackageName())
                && providerInfo.provider.getShortClassName().endsWith("." + widgetName)) {

                return providerInfo.provider.getClassName();
            }
        }

        return null;
    }

    private void addClickableArea(RemoteViews widgetView, ViewGroup rootWidget, ClickableView clickableView, int widgetId) {
        View clickableWidget = clickableView.getView();
        Rect offsetViewBounds = new Rect();
        clickableWidget.getDrawingRect(offsetViewBounds);
        rootWidget.offsetDescendantRectToMyCoords(clickableWidget, offsetViewBounds);
        RemoteViews clickableRemoteView = new RemoteViews(appContext.getPackageName(), R.layout.rn_widget_clickable);

        clickableRemoteView.setViewPadding(R.id.rn_widget_clickable_positioner, offsetViewBounds.left, offsetViewBounds.top, getWidgetWidth(widgetId) - offsetViewBounds.right, getWidgetHeight(widgetId) - offsetViewBounds.bottom);

        registerClickTask(widgetId, clickableView.getClickAction(), clickableRemoteView, R.id.rn_widget_clickable_area);

        widgetView.addView(R.id.rn_widget_clickable_container, clickableRemoteView);
    }

    private void registerClickTask(int id, String clickAction, RemoteViews widgetView, Integer button) {
        Intent intent = new Intent("com.reactnativeandroidwidget.WIDGET_CLICK");
        intent.setComponent(new ComponentName(appContext, getWidgetProviderClassName()));
        intent.putExtra("widgetId", id);
        intent.putExtra("clickAction", clickAction);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            appContext,
            (int) System.currentTimeMillis(),
            intent,
            PendingIntent.FLAG_CANCEL_CURRENT
                | PendingIntent.FLAG_MUTABLE
        );
        widgetView.setOnClickPendingIntent(button, pendingIntent);
    }

    private int getWidgetWidth(int widgetId) {
        boolean isPortrait = appContext.getResources().getConfiguration().orientation == ORIENTATION_PORTRAIT;
        if (isPortrait) {
            return dipToPx(getWidgetSizeInDp(widgetId, AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH));
        } else {
            return dipToPx(getWidgetSizeInDp(widgetId, AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH));
        }
    }

    private int getWidgetHeight(int widgetId) {
        boolean isPortrait = appContext.getResources().getConfiguration().orientation == ORIENTATION_PORTRAIT;
        if (isPortrait) {
            return dipToPx(getWidgetSizeInDp(widgetId, AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT));
        } else {
            return dipToPx(getWidgetSizeInDp(widgetId, AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT));
        }
    }

    private int getWidgetSizeInDp(int widgetId, String key) {
        return AppWidgetManager.getInstance(appContext).getAppWidgetOptions(widgetId).getInt(key, 0);
    }

    private int dipToPx(int dipValue) {
        return Math.round(dipValue * appContext.getResources().getDisplayMetrics().density);
    }
}
