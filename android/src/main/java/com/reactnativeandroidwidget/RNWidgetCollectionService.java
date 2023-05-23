package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativeandroidwidget.builder.CollectionViewItem;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class RNWidgetCollectionService extends RemoteViewsService {
    public static final int MAX_COLLECTION_WIDGETS = 2;

    public static void deleteWidgetImages(Context context, int widgetId) {
        deleteImages(context, "widget_" + widgetId);
    }

    private static void deleteCollectionImages(Context context, int widgetId, int collectionId) {
        deleteImages(context, "widget_" + widgetId + "_collection_" + collectionId);
    }

    private static void deleteImages(Context context, String prefix) {
        ContextWrapper cw = new ContextWrapper(context);
        File directory = cw.getDir("widget_list_images", Context.MODE_PRIVATE);

        File[] files = directory.listFiles(pathname -> pathname.getName().startsWith(prefix));

        for (File f : Objects.requireNonNull(files)) {
            f.delete();
        }
    }

    public static void storeCollection(ReactApplicationContext context, int widgetId, int collectionId, List<CollectionViewItem> collectionViewItems) {
        deleteCollectionImages(context, widgetId, collectionId);
        for (int i = 0; i < collectionViewItems.size(); i++) {
            CollectionViewItem item = collectionViewItems.get(i);

            writeImage(context, widgetId, collectionId, i, item);
        }
    }

    private static void writeImage(ReactApplicationContext context, int widgetId, int collectionId, int position, CollectionViewItem item) {
        ContextWrapper cw = new ContextWrapper(context);
        File directory = cw.getDir("widget_list_images", Context.MODE_PRIVATE);
        File imagePath = new File(directory, getImageName(widgetId, collectionId, position));

        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(imagePath);
            item.getBitmap().compress(Bitmap.CompressFormat.PNG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    static String getImageName(int widgetId, int collectionId, int position) {
        return "widget_" + widgetId + "_collection_" + collectionId + "_" + position + ".png";
    }

    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new ListRemoteViewsFactory(this.getApplicationContext(), intent);
    }
}

class ListRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
    private final Map<String, Bitmap> mCache = new HashMap<>();
    private final int mCount;
    private final int mCollectionId;
    private final List<Bundle> mCollectionItems;

    private final Context mContext;
    private final int mAppWidgetId;

    public ListRemoteViewsFactory(Context context, Intent intent) {
        mContext = context;
        mAppWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
        mCount = intent.getIntExtra("collectionSize", 0);
        mCollectionId = intent.getIntExtra("collectionId", 0);
        mCollectionItems = intent.getParcelableArrayListExtra("collectionItems");
    }

    public void onCreate() {
    }

    public void onDestroy() {
        mCache.clear();
    }

    public int getCount() {
        return mCount;
    }

    public RemoteViews getViewAt(int position) {
        RemoteViews listItemView = new RemoteViews(mContext.getPackageName(), R.layout.rn_widget_list_item);
        listItemView.setImageViewBitmap(R.id.rn_widget_list_item, getBitmapAt(position));

        Bundle bundle = mCollectionItems.get(position);

        // Set a fill-intent which will be used to fill-in the pending intent template
        // which is set on the collection view in RNWidget.
        if (bundle.getString("clickAction", null) != null) {
            Bundle extras = new Bundle();
            extras.putInt("widgetId", mAppWidgetId);

            extras.putString("clickAction", bundle.getString("clickAction"));
            extras.putBundle("clickActionData", bundle.getBundle("clickActionData"));

            Intent fillInIntent = new Intent();
            fillInIntent.putExtras(extras);
            listItemView.setOnClickFillInIntent(R.id.rn_widget_list_item, fillInIntent);
        }


        return listItemView;
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
        this.mCache.clear();
    }

    private Bitmap getBitmapAt(int position) {
        if (!mCache.containsKey(getImageName(position))) {
            mCache.put(getImageName(position), loadImage(position));
        }

        return mCache.get(getImageName(position));
    }

    private Bitmap loadImage(int position) {
        try {
            ContextWrapper cw = new ContextWrapper(mContext);
            File directory = cw.getDir("widget_list_images", Context.MODE_PRIVATE);
            File imagePath = new File(directory, getImageName(position));
            FileInputStream fileInputStream = new FileInputStream(imagePath);
            Bitmap bitmap = BitmapFactory.decodeStream(fileInputStream);
            fileInputStream.close();
            return bitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getImageName(int position) {
        return RNWidgetCollectionService.getImageName(mAppWidgetId, mCollectionId, position);
    }
}
