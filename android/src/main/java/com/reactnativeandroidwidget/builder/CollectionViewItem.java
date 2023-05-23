package com.reactnativeandroidwidget.builder;

import android.graphics.Bitmap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;

public class CollectionViewItem {
    private final Bitmap bitmap;
    private final String clickAction;
    private final ReadableMap clickActionData;

    public CollectionViewItem(Bitmap bitmap, String clickAction, ReadableMap clickActionData) {
        this.bitmap = bitmap;
        this.clickAction = clickAction;
        if (clickActionData == null) {
            this.clickActionData = Arguments.createMap();
        } else {
            this.clickActionData = clickActionData;
        }
    }

    public CollectionViewItem(Bitmap bitmap) {
        this(bitmap, null, null);
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
