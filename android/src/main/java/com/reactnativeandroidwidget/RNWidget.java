package com.reactnativeandroidwidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
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
        int[] widgetIds = RNWidgetUtil.getWidgetIds(appContext, widgetName);

        for (int widgetId : widgetIds) {
            drawWidget(widgetId);
        }
    }

    public void drawWidget(int widgetId) throws Exception {
        ReadableMap configClone = Arguments.makeNativeMap(config.toHashMap());
        RemoteViews remoteWidgetView = new RemoteViews(appContext.getPackageName(), R.layout.rn_widget);

        WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(
            appContext,
            configClone,
            RNWidgetUtil.getWidgetWidth(appContext, widgetId),
            RNWidgetUtil.getWidgetHeight(appContext, widgetId)
        );

        Bitmap bitmap = drawViewToBitmap(widgetWithViews.getRootView());
        remoteWidgetView.setImageViewBitmap(R.id.rn_widget_image, bitmap);

        addClickableAreas(widgetId, remoteWidgetView, widgetWithViews);

        AppWidgetManager.getInstance(appContext)
            .updateAppWidget(widgetId, remoteWidgetView);
    }

    public String createPreview(int width, int height) throws Exception {
        ReadableMap configClone = Arguments.makeNativeMap(config.toHashMap());

        WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(appContext, configClone, width, height);
        Bitmap bitmap = drawViewToBitmap(widgetWithViews.getRootView());

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private Bitmap drawViewToBitmap(View rootView) {
        Bitmap bitmap = Bitmap.createBitmap(
            rootView.getMeasuredWidth(),
            rootView.getMeasuredHeight(),
            Bitmap.Config.ARGB_8888
        );
        Canvas bitmapHolder = new Canvas(bitmap);
        rootView.draw(bitmapHolder);
        return bitmap;
    }

    private void addClickableAreas(int widgetId, RemoteViews remoteWidgetView, WidgetWithViews widgetWithViews) {
        remoteWidgetView.removeAllViews(R.id.rn_widget_clickable_container);
        ViewGroup rootView = (ViewGroup) widgetWithViews.getRootView();
        List<ClickableView> clickableViews = widgetWithViews.getClickableViews();
        for (int i = 0; i < clickableViews.size(); i++) {
            ClickableView clickableView = clickableViews.get(i);
            addClickableArea(remoteWidgetView, rootView, clickableView, widgetId);
        }
    }

    private void addClickableArea(RemoteViews widgetView, ViewGroup rootWidget, ClickableView clickableView, int widgetId) {
        View clickableWidget = clickableView.getView();
        Rect offsetViewBounds = new Rect();
        clickableWidget.getDrawingRect(offsetViewBounds);
        rootWidget.offsetDescendantRectToMyCoords(clickableWidget, offsetViewBounds);
        RemoteViews clickableRemoteView = new RemoteViews(appContext.getPackageName(), R.layout.rn_widget_clickable);

        clickableRemoteView.setViewPadding(
            R.id.rn_widget_clickable_positioner,
            offsetViewBounds.left,
            offsetViewBounds.top,
            RNWidgetUtil.dpToPx(appContext, RNWidgetUtil.getWidgetWidth(appContext, widgetId)) - offsetViewBounds.right,
            RNWidgetUtil.dpToPx(appContext, RNWidgetUtil.getWidgetHeight(appContext, widgetId)) - offsetViewBounds.bottom
        );

        registerClickTask(widgetId, clickableView, clickableRemoteView, R.id.rn_widget_clickable_area);

        widgetView.addView(R.id.rn_widget_clickable_container, clickableRemoteView);
    }

    private void registerClickTask(int id, ClickableView clickableView, RemoteViews widgetView, Integer button) {
        Intent intent = new Intent(appContext.getPackageName() + ".WIDGET_CLICK");
        intent.setComponent(new ComponentName(appContext, RNWidgetUtil.getWidgetProviderClassName(appContext, widgetName)));
        intent.putExtra("widgetId", id);
        intent.putExtra("clickAction", clickableView.getClickAction());
        intent.putExtra("clickActionData", Arguments.toBundle(clickableView.getClickActionData()));
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            appContext,
            (int) System.currentTimeMillis(),
            intent,
            PendingIntent.FLAG_CANCEL_CURRENT
                | PendingIntent.FLAG_MUTABLE
        );
        widgetView.setOnClickPendingIntent(button, pendingIntent);
    }
}
