package com.reactnativeandroidwidget.builder;

import android.view.View;

import androidx.annotation.Nullable;

import java.util.List;

public class WidgetWithViews {
    private final View rootView;
    private final List<ClickableView> clickableViews;
    private final List<CollectionView> collectionViews;
    private final String rootAccessibilityLabel;

    WidgetWithViews(View rootView, List<ClickableView> clickableViews, List<CollectionView> collectionViews) {
        this(rootView, clickableViews, collectionViews, null);
    }

    WidgetWithViews(View rootView, List<ClickableView> clickableViews, List<CollectionView> collectionViews, @Nullable String rootAccessibilityLabel) {
        this.rootView = rootView;
        this.clickableViews = clickableViews;
        this.collectionViews = collectionViews;
        this.rootAccessibilityLabel = rootAccessibilityLabel;
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

    @Nullable
    public String getRootAccessibilityLabel() {
        return rootAccessibilityLabel;
    }
}
