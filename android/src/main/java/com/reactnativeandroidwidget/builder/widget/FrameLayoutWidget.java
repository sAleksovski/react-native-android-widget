package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

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
        if (props.hasKey("backgroundColor")) {
            view.setBackgroundColor(Color.parseColor(props.getString("backgroundColor")));

            if (props.hasKey("radius")) {
                GradientDrawable shape = new GradientDrawable();
                shape.setCornerRadius(props.getInt("radius"));

                shape.setColor(Color.parseColor(props.getString("backgroundColor")));

                view.setBackground(shape);
            }
        }

        if (props.hasKey("backgroundGradient")) {
            ReadableMap backgroundGradient = props.getMap("backgroundGradient");
            GradientDrawable gradientDrawable = new GradientDrawable(
                GradientDrawable.Orientation.valueOf(backgroundGradient.getString("orientation")),
                new int[]{
                    Color.parseColor(backgroundGradient.getString("from")),
                    Color.parseColor(backgroundGradient.getString("to"))
                }
            );

            gradientDrawable.setCornerRadius(0f);
            view.setBackground(gradientDrawable);
        }

        LinearLayout.LayoutParams marginLayoutParams = new LinearLayout.LayoutParams(view.getLayoutParams());
        if (props.hasKey("margin")) {
            ReadableMap margin = props.getMap("margin");
            marginLayoutParams.setMargins(margin.getInt("left"), margin.getInt("top"), margin.getInt("right"), margin.getInt("bottom"));
        }

        if (props.hasKey("weight")) {
            marginLayoutParams.weight = (float) props.getInt("weight");
        }

        view.setLayoutParams(marginLayoutParams);

        if (props.hasKey("padding")) {
            ReadableMap padding = props.getMap("padding");
            view.setPadding(padding.getInt("left"), padding.getInt("top"), padding.getInt("right"), padding.getInt("bottom"));
        }

        try {
            addChildren();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
