package com.reactnativeandroidwidget.builder.widget;

import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.Collections;
import java.util.List;

public abstract class BaseWidget<T extends View> {
    protected final ReactApplicationContext appContext;
    protected final ReadableMap props;
    protected final List<View> children;

    protected T view;

    public BaseWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        this.appContext = context;
        this.props = props;
        this.children = children;

        this.view = createView();
        assignCommonProps();
        applyProps();
    }

    public BaseWidget(ReactApplicationContext context, ReadableMap props) {
        this(context, props, Collections.emptyList());
    }

    public View getView() {
        return view;
    }

    protected abstract T createView();

    protected abstract void applyProps();

    private void assignCommonProps() {
        int width = ViewGroup.LayoutParams.WRAP_CONTENT;
        if (props.hasKey("width")) {
            if (props.getType("width").toString().equals("Number")) {
                width = props.getInt("width");
            } else {
                width = getString("width", "wrap_content").equals("wrap_content")
                        ? ViewGroup.LayoutParams.WRAP_CONTENT
                        : ViewGroup.LayoutParams.MATCH_PARENT;
            }
        }

        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        if (props.hasKey("height")) {
            if (props.getType("height").toString().equals("Number")) {
                height = props.getInt("height");
            } else {
                height = getString("height", "wrap_content").equals("wrap_content")
                        ? ViewGroup.LayoutParams.WRAP_CONTENT
                        : ViewGroup.LayoutParams.MATCH_PARENT;
            }
        }

        view.setLayoutParams(new ViewGroup.LayoutParams(width, height));

        if (props.hasKey("rotation")) {
            view.setRotation(props.getInt("rotation"));
        }
    }

    protected int getInt(String key, int fallback) {
        if (props.hasKey(key)) {
            return props.getInt(key);
        }

        return fallback;
    }

    protected String getString(String key, String fallback) {
        if (props.hasKey(key)) {
            return props.getString(key);
        }

        return fallback;
    }
}
