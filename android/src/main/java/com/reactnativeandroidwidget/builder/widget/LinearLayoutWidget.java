package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.View;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class LinearLayoutWidget extends BaseLayoutWidget<LinearLayout> {
    public LinearLayoutWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    @Override
    protected LinearLayout createView() {
        return new LinearLayout(appContext);
    }

    @Override
    public void applyProps() {
        view.setOrientation(("HORIZONTAL").equals(props.getString("orientation"))
            ? LinearLayout.HORIZONTAL : LinearLayout.VERTICAL);

        if (props.hasKey("gravity")) {
            view.setGravity(props.getInt("gravity"));
        }

        if (props.hasKey("separator")) {
            ReadableMap separator = props.getMap("separator");
            view.setDividerPadding(separator.getInt("padding"));

            ColorDrawable divider = new ColorDrawable(Color.parseColor(separator.getString("color")));
            view.setDividerDrawable(divider);
            view.setShowDividers(LinearLayout.SHOW_DIVIDER_MIDDLE);
        }

        try {
            addChildren();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
