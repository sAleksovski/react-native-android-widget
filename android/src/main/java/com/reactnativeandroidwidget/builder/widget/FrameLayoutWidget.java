package com.reactnativeandroidwidget.builder.widget;

import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class FrameLayoutWidget extends BaseLayoutWidget<FrameLayout> {
    public FrameLayoutWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    @Override
    protected FrameLayout createView() {
        return new FrameLayout(appContext);
    }

    @Override
    public void applyProps() {
        addChildren();
    }
}
