package com.reactnativeandroidwidget.builder.widget;

import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class RootWidget extends BaseLayoutWidget<FrameLayout> {
    public RootWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    @Override
    protected FrameLayout createView() {
        return new FrameLayout(appContext);
    }

    @Override
    protected void applyProps() {
        addChildren();

        int specWidth = View.MeasureSpec.makeMeasureSpec(dpToPx(props.getInt("widgetWidth")), View.MeasureSpec.EXACTLY);
        int specHeight = View.MeasureSpec.makeMeasureSpec(dpToPx(props.getInt("widgetHeight")), View.MeasureSpec.EXACTLY);

        view.measure(specWidth, specHeight);
        view.layout(0, 0, view.getMeasuredWidth(), view.getMeasuredHeight());
    }
}
