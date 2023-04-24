package com.reactnativeandroidwidget.builder.widget;

import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

public class ListWidget extends BaseWidget<FrameLayout> {
    public ListWidget(ReactApplicationContext context, ReadableMap props) {
        super(context, props);
    }

    @Override
    protected FrameLayout createView() {
        return new FrameLayout(appContext);
    }

    @Override
    public void applyProps() {
    }

    @Override
    public boolean isCollection() {
        return true;
    }
}
