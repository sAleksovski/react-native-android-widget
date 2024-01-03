package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.reactnativeandroidwidget.RNWidgetUtil;

import java.util.ArrayList;
import java.util.HashMap;
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

            WritableMap rootConfig = Arguments.makeNativeMap(childConfig.toHashMap());
            HashMap<String, Object> propsMap = rootConfig.getMap("props").toHashMap();
            propsMap.remove("clickAction");
            propsMap.remove("clickActionData");
            rootConfig.putMap("props", Arguments.makeNativeMap(propsMap));

            WidgetWithViews widgetWithViews = WidgetFactory.buildWidgetFromRoot(
                appContext,
                rootConfig,
                (int) RNWidgetUtil.pxToDp(appContext, widthInPx),
                (int) RNWidgetUtil.pxToDp(appContext, heightInPx)
            );
            FrameLayout rootView = (FrameLayout) widgetWithViews.getRootView();
            List<ClickableView> clickableViews = widgetWithViews.getClickableViews();
            Bitmap bitmap = getBitmap(rootView.getChildAt(0));

            if (configClone.getMap("props").hasKey("clickAction")) {
                renderedViews.add(
                    new CollectionViewItem(
                        rootView,
                        bitmap,
                        clickableViews,
                        configClone.getMap("props").getString("clickAction"),
                        configClone.getMap("props").getMap("clickActionData")
                    )
                );
            } else {
                renderedViews.add(new CollectionViewItem(rootView, bitmap, clickableViews));
            }
        }
    }

    private void measureCollectionView() throws Exception {
        Rect rect = new Rect();
        view.getDrawingRect(rect);
        widthInPx = rect.width();
        heightInPx = rect.height();

        if (widthInPx == 0 || heightInPx == 0) {
            throw new Exception("ListWidget width and height must be > 0");
        }
    }

    private Bitmap getBitmap(View childView) {
        Bitmap bitmap = Bitmap.createBitmap(childView.getMeasuredWidth(), childView.getMeasuredHeight(), Bitmap.Config.ARGB_8888);
        Canvas bitmapHolder = new Canvas(bitmap);
        childView.draw(bitmapHolder);
        return bitmap;
    }
}
