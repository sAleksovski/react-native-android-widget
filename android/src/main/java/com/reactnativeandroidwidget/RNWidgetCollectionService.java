package com.reactnativeandroidwidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativeandroidwidget.builder.CollectionViewItem;

import java.util.ArrayList;
import java.util.List;

public class RNWidgetCollectionService extends RemoteViewsService {
    public static final int MAX_COLLECTION_WIDGETS = 2;

    public static void storeCollection(ReactApplicationContext context, int widgetId, int collectionId, List<CollectionViewItem> collectionViewItems, String mode) {
        RNWidgetImageProvider.deleteCollectionImages(context, widgetId, collectionId, mode);
        for (int i = 0; i < collectionViewItems.size(); i++) {
            CollectionViewItem item = collectionViewItems.get(i);

            RNWidgetImageProvider.writeImage(context, getImageName(widgetId, collectionId, i, mode), item.getBitmap());
        }
    }

    static String getImageName(int widgetId, int collectionId, int position, String mode) {
        return "widget_" + widgetId + "_mode_" + mode + "_collection_" + collectionId + "_" + position + ".png";
    }

    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new ListRemoteViewsFactory(this.getApplicationContext(), intent);
    }
}

class ListRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
    private final int mCount;
    private final List<Bundle> mCollectionItems;

    private final Context mContext;
    private final int mAppWidgetId;
    private final String widgetName;

    public ListRemoteViewsFactory(Context context, Intent intent) {
        mContext = context;
        mAppWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        mCount = intent.getIntExtra("collectionSize", 0);
        mCollectionItems = intent.getParcelableArrayListExtra("collectionItems");
        widgetName = intent.getStringExtra("widgetName");
    }

    public void onCreate() {
    }

    public void onDestroy() {
    }

    public int getCount() {
        return mCount;
    }

    public RemoteViews getViewAt(int position) {
        Bundle bundle = mCollectionItems.get(position);

        RemoteViews listItemView = new RemoteViews(mContext.getPackageName(), R.layout.rn_widget_list_item);
        listItemView.removeAllViews(R.id.rn_widget_list_item_clickable_container);
        Uri lightImageUri = RNWidgetImageProvider.getImageUri(mContext, bundle.getString("lightImageName"));
        listItemView.setImageViewUri(R.id.rn_widget_list_item_light, lightImageUri);
        Uri darkImageUri = RNWidgetImageProvider.getImageUri(mContext, bundle.getString("darkImageName"));
        listItemView.setImageViewUri(R.id.rn_widget_list_item_dark, darkImageUri);

        // Set item accessibility label on ImageViews if available
        if (bundle.getString("itemAccessibilityLabel", null) != null) {
            String itemAccessibilityLabel = bundle.getString("itemAccessibilityLabel");
            listItemView.setContentDescription(R.id.rn_widget_list_item_light, itemAccessibilityLabel);
            listItemView.setContentDescription(R.id.rn_widget_list_item_dark, itemAccessibilityLabel);
        }

        // Set a fill-intent which will be used to fill-in the pending intent template
        // which is set on the collection view in RNWidget.
        if (bundle.getString("clickAction", null) != null) {
            Intent fillInIntent = createFillInIntent(bundle);
            listItemView.setOnClickFillInIntent(R.id.rn_widget_list_item_clickable_container, fillInIntent);
        }

        ArrayList<Bundle> clickableAreas = bundle.getParcelableArrayList("clickableAreas");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            for (Bundle clickableArea : clickableAreas) {
                addClickableArea(listItemView, clickableArea, bundle.getInt("imageWidth"));
            }
        }

        return listItemView;
    }

    @RequiresApi(Build.VERSION_CODES.N)
    private void addClickableArea(RemoteViews widgetView, Bundle clickableArea, int imageWidth) {
        RemoteViews clickableRemoteView = new RemoteViews(mContext.getPackageName(), R.layout.rn_widget_clickable);

        clickableRemoteView.setViewPadding(
            R.id.rn_widget_clickable_positioner,
            clickableArea.getInt("left"),
            clickableArea.getInt("top"),
            imageWidth - clickableArea.getInt("right"),
            0
        );

        clickableRemoteView.setInt(R.id.rn_widget_clickable_area, "setMinimumHeight", clickableArea.getInt("height"));

        // Set accessibility label on clickable area if available
        if (clickableArea.getString("accessibilityLabel", null) != null) {
            clickableRemoteView.setContentDescription(R.id.rn_widget_clickable_area, clickableArea.getString("accessibilityLabel"));
        }

        PendingIntent pendingIntent = createPendingIntent(clickableArea);
        clickableRemoteView.setOnClickPendingIntent(R.id.rn_widget_clickable_area, pendingIntent);

        Intent fillInIntent = createFillInIntent(clickableArea);
        clickableRemoteView.setOnClickFillInIntent(R.id.rn_widget_clickable_area, fillInIntent);

        widgetView.addView(R.id.rn_widget_list_item_clickable_container, clickableRemoteView);
    }

    private Intent createFillInIntent(Bundle bundle) {
        Bundle extras = new Bundle();
        extras.putInt("widgetId", mAppWidgetId);

        extras.putString("clickAction", bundle.getString("clickAction"));
        extras.putBundle("clickActionData", bundle.getBundle("clickActionData"));

        Intent fillInIntent = new Intent();
        fillInIntent.putExtras(extras);
        return fillInIntent;
    }

    private PendingIntent createPendingIntent(Bundle clickableArea) {
        Intent intent = new Intent(mContext.getPackageName() + ".WIDGET_CLICK");
        intent.setComponent(new ComponentName(mContext, RNWidgetUtil.getWidgetProviderClassName(mContext, widgetName)));
        intent.putExtra("widgetId", mAppWidgetId);
        intent.putExtra("clickAction", clickableArea.getString("clickAction"));
        intent.putExtra("clickActionData", clickableArea.getBundle("clickActionData"));
        return PendingIntent.getBroadcast(
            mContext,
            (int) System.currentTimeMillis(),
            intent,
            PendingIntent.FLAG_CANCEL_CURRENT
                | PendingIntent.FLAG_MUTABLE
        );
    }

    public RemoteViews getLoadingView() {
        // You can create a custom loading view (for instance when getViewAt() is slow.) If you
        // return null here, you will get the default loading view.
        return new RemoteViews(mContext.getPackageName(), R.layout.rn_widget_list_item);
    }

    public int getViewTypeCount() {
        return 1;
    }

    public long getItemId(int position) {
        return position;
    }

    public boolean hasStableIds() {
        return true;
    }

    public void onDataSetChanged() {
    }
}
