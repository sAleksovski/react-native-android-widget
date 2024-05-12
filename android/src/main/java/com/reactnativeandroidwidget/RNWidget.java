package com.reactnativeandroidwidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RemoteViews;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.reactnativeandroidwidget.builder.ClickableView;
import com.reactnativeandroidwidget.builder.CollectionView;
import com.reactnativeandroidwidget.builder.CollectionViewItem;
import com.reactnativeandroidwidget.builder.WidgetFactory;
import com.reactnativeandroidwidget.builder.WidgetWithViews;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

public class RNWidget {
    private final ReactApplicationContext appContext;
    private final ReadableMap config;
    private final String widgetName;

    private static final int[] listWrappers = {R.id.rn_widget_list_0_wrapper, R.id.rn_widget_list_1_wrapper};
    private static final int[] lists = {R.id.rn_widget_list_0, R.id.rn_widget_list_1};

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

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            addClickableAreas(widgetId, remoteWidgetView, widgetWithViews);
        }
        addCollectionViews(widgetId, remoteWidgetView, widgetWithViews);

        AppWidgetManager.getInstance(appContext)
            .updateAppWidget(widgetId, remoteWidgetView);
    }

    public WritableMap createPreview(int width, int height) throws Exception {
        ReadableMap configClone = Arguments.makeNativeMap(config.toHashMap());

        WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(appContext, configClone, width, height);
        Bitmap bitmap = drawViewToBitmap(widgetWithViews.getRootView());

        WritableMap preview = Arguments.createMap();
        preview.putString("base64Image", convertBitmapToBase64(bitmap));
        preview.putArray("clickableAreas", createClickableAreasPreview(widgetWithViews));
        preview.putArray("collectionAreas", createCollectionAreasPreview(widgetWithViews));

        return preview;
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

    @RequiresApi(Build.VERSION_CODES.N)
    private void addClickableAreas(int widgetId, RemoteViews remoteWidgetView, WidgetWithViews widgetWithViews) {
        remoteWidgetView.removeAllViews(R.id.rn_widget_clickable_container);
        ViewGroup rootView = (ViewGroup) widgetWithViews.getRootView();
        List<ClickableView> clickableViews = widgetWithViews.getClickableViews();
        for (int i = 0; i < clickableViews.size(); i++) {
            ClickableView clickableView = clickableViews.get(i);
            addClickableArea(remoteWidgetView, rootView, clickableView, widgetId);
        }
    }

    @RequiresApi(Build.VERSION_CODES.N)
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
            0
        );

        clickableRemoteView.setInt(R.id.rn_widget_clickable_area, "setMinimumHeight", offsetViewBounds.height());

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

    private void addCollectionViews(int widgetId, RemoteViews remoteWidgetView, WidgetWithViews widgetWithViews) {
        remoteWidgetView.removeAllViews(R.id.rn_widget_collection_container);
        ViewGroup rootView = (ViewGroup) widgetWithViews.getRootView();
        List<CollectionView> collectionViews = widgetWithViews.getCollectionViews();

        for (int i = 0; i < Math.min(collectionViews.size(), RNWidgetCollectionService.MAX_COLLECTION_WIDGETS); i++) {
            CollectionView collectionView = collectionViews.get(i);
            addCollectionView(remoteWidgetView, rootView, collectionView, widgetId, i);
        }
    }

    private void addCollectionView(RemoteViews remoteWidgetView, ViewGroup rootView, CollectionView collectionView, int widgetId, int collectionId) {
        RNWidgetCollectionService.storeCollection(appContext, widgetId, collectionId, collectionView.getRenderedViews());

        View collectionWidget = collectionView.getView();
        Rect offsetViewBounds = new Rect();
        collectionWidget.getDrawingRect(offsetViewBounds);
        rootView.offsetDescendantRectToMyCoords(collectionWidget, offsetViewBounds);

        RemoteViews collectionRemoteView = new RemoteViews(appContext.getPackageName(), R.layout.rn_widget_list);

        collectionRemoteView.setViewPadding(
            R.id.rn_widget_list_positioner,
            offsetViewBounds.left,
            offsetViewBounds.top,
            RNWidgetUtil.dpToPx(appContext, RNWidgetUtil.getWidgetWidth(appContext, widgetId)) - offsetViewBounds.right,
            RNWidgetUtil.dpToPx(appContext, RNWidgetUtil.getWidgetHeight(appContext, widgetId)) - offsetViewBounds.bottom
        );

        for (int i = 0; i < listWrappers.length; i++) {
            if (i != collectionId) {
                collectionRemoteView.removeAllViews(listWrappers[i]);
            }
        }

        PendingIntent collectionPendingIntentTemplate = createCollectionPendingIntentTemplate(widgetId);
        Intent remoteAdapterIntent = createCollectionRemoteAdapterIntent(widgetId, collectionId, collectionView);

        collectionRemoteView.setPendingIntentTemplate(lists[collectionId], collectionPendingIntentTemplate);

        remoteWidgetView.addView(R.id.rn_widget_collection_container, collectionRemoteView);
        remoteWidgetView.setRemoteAdapter(lists[collectionId], remoteAdapterIntent);
    }

    private Intent createCollectionRemoteAdapterIntent(int widgetId, int collectionId, CollectionView collectionView) {
        List<CollectionViewItem> collectionItems = collectionView.getRenderedViews();
        Intent intent = new Intent(appContext, RNWidgetCollectionService.class);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);
        intent.putExtra("widgetName", widgetName);
        intent.putExtra("collectionId", collectionId);
        intent.putExtra("collectionSize", collectionItems.size());
        // Needed for creating a new ListRemoteViewsFactory when re-rendering widget
        intent.putExtra("random", Math.random());
        intent.setData(Uri.parse(intent.toUri(Intent.URI_INTENT_SCHEME)));

        ArrayList<Bundle> collectionItemsBundle = new ArrayList<>();
        for (CollectionViewItem collectionViewItem : collectionItems) {
            Bundle bundle = new Bundle();
            bundle.putString("clickAction", collectionViewItem.getClickAction());
            bundle.putBundle("clickActionData", Arguments.toBundle(collectionViewItem.getClickActionData()));
            collectionItemsBundle.add(bundle);

            ArrayList<Bundle> clickableAreas = new ArrayList<>();
            for (ClickableView clickableView : collectionViewItem.getClickableViews()) {
                Rect offsetViewBounds = new Rect();
                clickableView.getView().getDrawingRect(offsetViewBounds);
                collectionViewItem.getView().offsetDescendantRectToMyCoords(clickableView.getView(), offsetViewBounds);

                Bundle collectionViewMap = new Bundle();
                collectionViewMap.putInt("left", offsetViewBounds.left);
                collectionViewMap.putInt("top", offsetViewBounds.top);
                collectionViewMap.putInt("right", offsetViewBounds.right);
                collectionViewMap.putInt("bottom", offsetViewBounds.bottom);
                collectionViewMap.putInt("height", offsetViewBounds.height());
                collectionViewMap.putInt("width", offsetViewBounds.width());
                collectionViewMap.putString("clickAction", clickableView.getClickAction());
                collectionViewMap.putBundle("clickActionData", Arguments.toBundle(clickableView.getClickActionData()));

                clickableAreas.add(collectionViewMap);
            }

            bundle.putParcelableArrayList("clickableAreas", clickableAreas);
        }
        intent.putParcelableArrayListExtra("collectionItems", collectionItemsBundle);

        return intent;
    }

    private PendingIntent createCollectionPendingIntentTemplate(int widgetId) {
        // This section makes it possible for items to have individualized
        // behavior. It does this by setting up a pending intent template.
        // Individuals items of a collection can't set up their own pending
        // intents. Instead, the collection as a whole sets up a pending
        // intent template, and the individual items set a fillInIntent
        // to create unique behavior on an item-by-item basis.
        Intent widgetListItemClickIntent = new Intent(appContext, RNWidgetCollectionService.class);
        // Set the action for the intent.
        // When the user touches a particular view, it has the effect of
        // broadcasting WIDGET_CLICK.
        widgetListItemClickIntent.setComponent(new ComponentName(appContext, RNWidgetUtil.getWidgetProviderClassName(appContext, widgetName)));
        widgetListItemClickIntent.setAction(appContext.getPackageName() + ".WIDGET_CLICK");
        widgetListItemClickIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);
        return PendingIntent.getBroadcast(appContext, 0, widgetListItemClickIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_MUTABLE);
    }

    private String convertBitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private WritableArray createClickableAreasPreview(WidgetWithViews widgetWithViews) {
        WritableArray clickableAreas = Arguments.createArray();
        ViewGroup rootView = (ViewGroup) widgetWithViews.getRootView();

        for (ClickableView clickableView : widgetWithViews.getClickableViews()) {
            WritableMap clickableViewMap = createClickableAreaPreview(rootView, clickableView);
            clickableAreas.pushMap(clickableViewMap);
        }

        return clickableAreas;
    }

    private WritableMap createClickableAreaPreview(ViewGroup rootView, ClickableView clickableView) {
        View clickableWidget = clickableView.getView();
        Rect offsetViewBounds = new Rect();
        clickableWidget.getDrawingRect(offsetViewBounds);
        rootView.offsetDescendantRectToMyCoords(clickableWidget, offsetViewBounds);

        WritableMap clickableViewMap = Arguments.createMap();
        clickableViewMap.putDouble("left", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.left));
        clickableViewMap.putDouble("top", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.top));
        clickableViewMap.putDouble("width", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.width()));
        clickableViewMap.putDouble("height", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.height()));
        clickableViewMap.putString("clickAction", clickableView.getClickAction());
        clickableViewMap.putMap("clickActionData", Arguments.makeNativeMap(clickableView.getClickActionData().toHashMap()));

        return clickableViewMap;
    }

    private WritableArray createCollectionAreasPreview(WidgetWithViews widgetWithViews) {
        WritableArray collectionAreas = Arguments.createArray();
        ViewGroup rootView = (ViewGroup) widgetWithViews.getRootView();

        for (CollectionView collectionView : widgetWithViews.getCollectionViews()) {
            WritableMap collectionViewMap = createCollectionAreaPreview(rootView, collectionView);
            collectionAreas.pushMap(collectionViewMap);
        }

        return collectionAreas;
    }

    private WritableMap createCollectionAreaPreview(ViewGroup rootView, CollectionView collectionView) {
        View clickableWidget = collectionView.getView();
        Rect offsetViewBounds = new Rect();
        clickableWidget.getDrawingRect(offsetViewBounds);
        rootView.offsetDescendantRectToMyCoords(clickableWidget, offsetViewBounds);

        WritableMap collectionViewMap = Arguments.createMap();
        collectionViewMap.putDouble("left", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.left));
        collectionViewMap.putDouble("top", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.top));
        collectionViewMap.putDouble("width", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.width()));
        collectionViewMap.putDouble("height", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.height()));

        WritableArray collectionItems = Arguments.createArray();
        for (CollectionViewItem collectionItemView : collectionView.getRenderedViews()) {
            WritableMap collectionItemMap = createCollectionItemPreview(collectionItemView);
            collectionItems.pushMap(collectionItemMap);
        }
        collectionViewMap.putArray("items", collectionItems);

        return collectionViewMap;
    }

    private WritableMap createCollectionItemPreview(CollectionViewItem collectionItemView) {
        WritableMap collectionItemMap = Arguments.createMap();
        Bitmap bitmap = collectionItemView.getBitmap();
        collectionItemMap.putString("base64Image", convertBitmapToBase64(bitmap));
        collectionItemMap.putDouble("height", RNWidgetUtil.pxToDp(appContext, bitmap.getHeight()));
        collectionItemMap.putDouble("width", RNWidgetUtil.pxToDp(appContext, bitmap.getWidth()));
        collectionItemMap.putString("clickAction", collectionItemView.getClickAction());
        collectionItemMap.putMap("clickActionData", Arguments.makeNativeMap(collectionItemView.getClickActionData().toHashMap()));
        collectionItemMap.putArray("clickableAreas", createCollectionItemClickableAreas(collectionItemView));
        return collectionItemMap;
    }

    private WritableArray createCollectionItemClickableAreas(CollectionViewItem collectionItemView) {
        WritableArray clickableAreas = Arguments.createArray();

        for (ClickableView clickableView : collectionItemView.getClickableViews()) {
            Rect offsetViewBounds = new Rect();
            clickableView.getView().getDrawingRect(offsetViewBounds);
            collectionItemView.getView().offsetDescendantRectToMyCoords(clickableView.getView(), offsetViewBounds);

            WritableMap collectionViewMap = Arguments.createMap();
            collectionViewMap.putDouble("left", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.left));
            collectionViewMap.putDouble("top", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.top));
            collectionViewMap.putDouble("width", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.width()));
            collectionViewMap.putDouble("height", RNWidgetUtil.pxToDp(appContext, offsetViewBounds.height()));
            collectionViewMap.putString("clickAction", clickableView.getClickAction());
            collectionViewMap.putMap("clickActionData", Arguments.makeNativeMap(clickableView.getClickActionData().toHashMap()));

            clickableAreas.pushMap(collectionViewMap);
        }

        return clickableAreas;
    }
}
