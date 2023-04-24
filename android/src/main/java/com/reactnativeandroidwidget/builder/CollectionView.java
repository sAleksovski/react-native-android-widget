package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.view.View;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.reactnativeandroidwidget.RNWidgetUtil;

import java.util.ArrayList;
import java.util.List;

public class CollectionView {
    private final View view;
    private final ReadableArray children;
    private final List<CollectionViewItem> renderedViews = new ArrayList<>();

    private int widthInPx = 0;
    private int heightInPx = 0;

    public CollectionView(View view, ReadableArray children) {
        this.view = view;
        this.children = children;
    }

    public View getView() {
        return view;
    }

    public List<CollectionViewItem> getRenderedViews() {
        return renderedViews;
    }

    public void buildChildren(ReactApplicationContext appContext) throws Exception {
        measureCollectionView();

        for (int i = 0; i < children.size(); i++) {
            ReadableMap childConfig = children.getMap(i);
            ReadableMap configClone = Arguments.makeNativeMap(childConfig.toHashMap());
            FrameLayout rootView = (FrameLayout) WidgetFactory.buildWidgetFromRoot(
                appContext,
                childConfig,
                (int) RNWidgetUtil.pxToDp(appContext, widthInPx),
                (int) RNWidgetUtil.pxToDp(appContext, heightInPx)
            ).getRootView();
            Bitmap bitmap = getBitmap(rootView.getChildAt(0));

            if (configClone.getMap("props").hasKey("clickAction")) {
                renderedViews.add(
                    new CollectionViewItem(
                        bitmap,
                        configClone.getMap("props").getString("clickAction"),
                        configClone.getMap("props").getMap("clickActionData")
                    )
                );
            } else {
                renderedViews.add(new CollectionViewItem(bitmap));
            }
        }
    }

    private void measureCollectionView() {
        Rect rect = new Rect();
        view.getDrawingRect(rect);
        widthInPx = rect.width();
        heightInPx = rect.height();
    }

    private Bitmap getBitmap(View childView) {
        Bitmap bitmap = Bitmap.createBitmap(childView.getMeasuredWidth(), childView.getMeasuredHeight(), Bitmap.Config.ARGB_8888);
        Canvas bitmapHolder = new Canvas(bitmap);
        childView.draw(bitmapHolder);
        return bitmap;
    }
}
