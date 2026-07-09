package com.reactnativeandroidwidget.builder;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;

public class ClickableView implements Comparable<ClickableView> {
    private final String id;
    private final View view;
    private final String clickAction;
    private final ReadableMap clickActionData;
    private final String accessibilityLabel;
    // Corner radius (dp) of the clickable view, so the press-highlight overlay can be rounded to match
    // it (see RNWidget#addClickableArea). 0 = square corners (the default / previous behavior).
    private final float borderRadius;

    public ClickableView(String id, View view, String clickAction, ReadableMap clickActionData) {
        this(id, view, clickAction, clickActionData, null, 0f);
    }

    public ClickableView(String id, View view, String clickAction, ReadableMap clickActionData, String accessibilityLabel) {
        this(id, view, clickAction, clickActionData, accessibilityLabel, 0f);
    }

    public ClickableView(String id, View view, String clickAction, ReadableMap clickActionData, String accessibilityLabel, float borderRadius) {
        this.id = id;
        this.view = view;
        this.clickAction = clickAction;
        this.clickActionData = clickActionData;
        this.accessibilityLabel = accessibilityLabel;
        this.borderRadius = borderRadius;
    }

    public String getId() {
        return id;
    }

    public View getView() {
        return view;
    }

    public String getClickAction() {
        return clickAction;
    }

    public ReadableMap getClickActionData() {
        return clickActionData;
    }

    public String getAccessibilityLabel() {
        return accessibilityLabel;
    }

    public float getBorderRadius() {
        return borderRadius;
    }

    @Override
    public int compareTo(ClickableView o) {
        return this.id.compareTo(o.getId());
    }
}
