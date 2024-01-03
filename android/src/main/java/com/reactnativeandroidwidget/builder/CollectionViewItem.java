package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;
import android.view.ViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class CollectionViewItem {
    private final ViewGroup view;
    private final Bitmap bitmap;
    private final List<ClickableView> clickableViews;
    private final String clickAction;
    private final ReadableMap clickActionData;

    public CollectionViewItem(ViewGroup view, Bitmap bitmap, List<ClickableView> clickableViews, String clickAction, ReadableMap clickActionData) {
        this.view = view;
        this.bitmap = bitmap;
        this.clickableViews = clickableViews;
        this.clickAction = clickAction;
        if (clickActionData == null) {
            this.clickActionData = Arguments.createMap();
        } else {
            this.clickActionData = clickActionData;
        }
    }

    public CollectionViewItem(ViewGroup view, Bitmap bitmap, List<ClickableView> clickableViews) {
        this(view, bitmap, clickableViews, null, null);
    }

    public ViewGroup getView() {
        return view;
    }

    public Bitmap getBitmap() {
        return bitmap;
    }

    public List<ClickableView> getClickableViews() {
        return clickableViews;
    }

    public String getClickAction() {
        return clickAction;
    }

    public ReadableMap getClickActionData() {
        return clickActionData;
    }
}
