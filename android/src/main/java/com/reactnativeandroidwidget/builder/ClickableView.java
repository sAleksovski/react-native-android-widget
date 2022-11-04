package com.reactnativeandroidwidget.builder;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;

public class ClickableView {
    private final View view;
    private final String clickAction;
    private final ReadableMap clickActionData;

    public ClickableView(View view, String clickAction, ReadableMap clickActionData) {
        this.view = view;
        this.clickAction = clickAction;
        this.clickActionData = clickActionData;
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
}
