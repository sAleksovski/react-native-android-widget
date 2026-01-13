package com.reactnativeandroidwidget.builder;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;

public class ClickableView implements Comparable<ClickableView> {
    private final String id;
    private final View view;
    private final String clickAction;
    private final ReadableMap clickActionData;
    private final String accessibilityLabel;

    public ClickableView(String id, View view, String clickAction, ReadableMap clickActionData) {
        this(id, view, clickAction, clickActionData, null);
    }

    public ClickableView(String id, View view, String clickAction, ReadableMap clickActionData, String accessibilityLabel) {
        this.id = id;
        this.view = view;
        this.clickAction = clickAction;
        this.clickActionData = clickActionData;
        this.accessibilityLabel = accessibilityLabel;
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

    @Override
    public int compareTo(ClickableView o) {
        return this.id.compareTo(o.getId());
    }
}
