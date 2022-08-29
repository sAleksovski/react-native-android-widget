package com.reactnativeandroidwidget.builder;

import android.view.View;

import java.util.List;

public class WidgetWithViews {
    private final View rootView;
    private final List<ClickableView> clickableViews;

    WidgetWithViews(View rootView, List<ClickableView> clickableViews) {
        this.rootView = rootView;
        this.clickableViews = clickableViews;
    }

    public View getRootView() {
        return rootView;
    }

    public List<ClickableView> getClickableViews() {
        return clickableViews;
    }
}
