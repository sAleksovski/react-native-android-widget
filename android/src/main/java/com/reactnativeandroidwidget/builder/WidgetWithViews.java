package com.reactnativeandroidwidget.builder;

import android.view.View;

import java.util.List;

public class WidgetWithViews {
    private final View rootView;
    private final List<ClickableView> clickableViews;
    private final List<CollectionView> collectionViews;

    WidgetWithViews(View rootView, List<ClickableView> clickableViews, List<CollectionView> collectionViews) {
        this.rootView = rootView;
        this.clickableViews = clickableViews;
        this.collectionViews = collectionViews;
    }

    public View getRootView() {
        return rootView;
    }

    public List<ClickableView> getClickableViews() {
        return clickableViews;
    }

    public List<CollectionView> getCollectionViews() {
        return collectionViews;
    }
}
