package com.reactnativeandroidwidget.builder.widget;

import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public abstract class BaseLayoutWidget<T extends ViewGroup> extends BaseWidget<T> {
    public BaseLayoutWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    protected void addChildren() {
        for (int i = 0; i < children.size(); i++) {
            View childView = children.get(i);
            view.addView(childView);
        }
    }
}
