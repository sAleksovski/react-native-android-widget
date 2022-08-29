package com.reactnativeandroidwidget.builder;

import android.view.View;

public class ClickableView {
    private final View view;
    private final String clickAction;

    public ClickableView(View view, String clickAction) {
        this.view = view;
        this.clickAction = clickAction;
    }

    public View getView() {
        return view;
    }

    public String getClickAction() {
        return clickAction;
    }
}
