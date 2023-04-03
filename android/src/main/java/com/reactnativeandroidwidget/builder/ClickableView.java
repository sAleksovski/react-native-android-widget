package com.reactnativeandroidwidget.builder;

import android.view.View;

import com.facebook.react.bridge.ReadableMap;

public class ClickableView {
    private final View view;
    private final String clickAction;
    private final ReadableMap clickActionData;
    private final boolean openApp;

    public ClickableView(View view, String clickAction, ReadableMap clickActionData, boolean openApp) {
        this.view = view;
        this.clickAction = clickAction;
        this.clickActionData = clickActionData;
        this.openApp = openApp;
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

    public boolean getOpenApp() {
        return openApp;
    }
}
