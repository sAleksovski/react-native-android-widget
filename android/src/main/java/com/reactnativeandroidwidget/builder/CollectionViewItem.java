package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class CollectionViewItem {
    private final ViewGroup view;
    private final Bitmap bitmap;
    private final List<ClickableView> clickableViews;
    private final String clickAction;
    private final ReadableMap clickActionData;
    private final String itemAccessibilityLabel;

    public CollectionViewItem(ViewGroup view, Bitmap bitmap, List<ClickableView> clickableViews, String clickAction, ReadableMap clickActionData) {
        this(view, bitmap, clickableViews, clickAction, clickActionData, null);
    }

    public CollectionViewItem(ViewGroup view, Bitmap bitmap, List<ClickableView> clickableViews, String clickAction, ReadableMap clickActionData, @Nullable String itemAccessibilityLabel) {
        this.view = view;
        this.bitmap = bitmap;
        this.clickableViews = clickableViews;
        this.clickAction = clickAction;
        if (clickActionData == null) {
            this.clickActionData = Arguments.createMap();
        } else {
            this.clickActionData = clickActionData;
        }
        this.itemAccessibilityLabel = itemAccessibilityLabel;
    }

    public CollectionViewItem(ViewGroup view, Bitmap bitmap, List<ClickableView> clickableViews) {
        this(view, bitmap, clickableViews, null, null, null);
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

    @Nullable
    public String getItemAccessibilityLabel() {
        return itemAccessibilityLabel;
    }
}
