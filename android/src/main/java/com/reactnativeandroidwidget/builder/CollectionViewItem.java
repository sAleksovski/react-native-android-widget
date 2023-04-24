package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;

import com.facebook.react.bridge.ReadableMap;

public class CollectionViewItem {
    private final Bitmap bitmap;
    private final String clickAction;
    private final ReadableMap clickActionData;

    public CollectionViewItem(Bitmap bitmap, String clickAction, ReadableMap clickActionData) {
        this.bitmap = bitmap;
        this.clickAction = clickAction;
        this.clickActionData = clickActionData;
    }

    public CollectionViewItem(Bitmap bitmap) {
        this.bitmap = bitmap;
        this.clickAction = null;
        this.clickActionData = null;
    }

    public Bitmap getBitmap() {
        return bitmap;
    }

    public String getClickAction() {
        return clickAction;
    }

    public ReadableMap getClickActionData() {
        return clickActionData;
    }
}
