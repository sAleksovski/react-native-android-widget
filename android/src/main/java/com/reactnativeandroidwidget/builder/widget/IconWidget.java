package com.reactnativeandroidwidget.builder.widget;

import static android.util.TypedValue.COMPLEX_UNIT_SP;

import android.graphics.Color;
import android.widget.TextView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

public class IconWidget extends BaseWidget<TextView> {
    public IconWidget(ReactApplicationContext context, ReadableMap props) {
        super(context, props);
    }

    @Override
    protected TextView createView() {
        return new TextView(appContext);
    }

    @Override
    protected void applyProps() {
        view.setText(getString("icon", ""));
        view.setTextSize(COMPLEX_UNIT_SP, getTextSize());
        view.setTextColor(Color.parseColor(getString("color", "#000000")));

        if (props.hasKey("font")) {
            view.setTypeface(ResourceUtils.getTypeface(appContext, props.getString("font")));
        }
    }

    private float getTextSize() {
        float textSize = 12;
        if (props.hasKey("size")) {
            textSize = (float) props.getDouble("size");
        }
        return textSize;
    }
}
