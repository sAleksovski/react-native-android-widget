package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.Spacing;
import com.facebook.react.views.view.ReactViewBackgroundDrawable;

import java.util.HashMap;
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
        ReadableMap padding = props.getMap("padding");

        ReactViewBackgroundDrawable reactViewBackgroundDrawable = new ReactViewBackgroundDrawable(view.getContext());

        if (props.hasKey("backgroundColor")) {
            reactViewBackgroundDrawable.setColor(Color.parseColor(props.getString("backgroundColor")));
        }

        if (props.hasKey("borderRadius")) {
            ReadableMap borderRadius = props.getMap("borderRadius");
            reactViewBackgroundDrawable.setRadius(borderRadius.getInt("topRight"), 1);
            reactViewBackgroundDrawable.setRadius(borderRadius.getInt("bottomRight"), 2);
            reactViewBackgroundDrawable.setRadius(borderRadius.getInt("bottomLeft"), 3);
            reactViewBackgroundDrawable.setRadius(borderRadius.getInt("topLeft"), 0);
        }

        if (props.hasKey("borderWidth")) {
            ReadableMap borderWidth = props.getMap("borderWidth");
            reactViewBackgroundDrawable.setBorderWidth(Spacing.LEFT, borderWidth.getInt("left"));
            reactViewBackgroundDrawable.setBorderWidth(Spacing.RIGHT, borderWidth.getInt("right"));
            reactViewBackgroundDrawable.setBorderWidth(Spacing.TOP, borderWidth.getInt("top"));
            reactViewBackgroundDrawable.setBorderWidth(Spacing.BOTTOM, borderWidth.getInt("bottom"));

            HashMap<String, Object> paddingMap;
            if (props.hasKey("padding")) {
                paddingMap = props.getMap("padding").toHashMap();
            } else {
                paddingMap = new HashMap<>();
                paddingMap.put("top", 0);
                paddingMap.put("bottom", 0);
                paddingMap.put("left", 0);
                paddingMap.put("right", 0);
            }

            paddingMap.put("top", ((int) paddingMap.get("top")) + borderWidth.getInt("top"));
            paddingMap.put("bottom", ((int) paddingMap.get("bottom")) + borderWidth.getInt("bottom"));
            paddingMap.put("left", ((int) paddingMap.get("left")) + borderWidth.getInt("left"));
            paddingMap.put("right", ((int) paddingMap.get("right")) + borderWidth.getInt("right"));

            padding = Arguments.makeNativeMap(paddingMap);
        }

        if (props.hasKey("borderColor")) {
            ReadableMap borderColor = props.getMap("borderColor");
            reactViewBackgroundDrawable.setBorderColor(Spacing.LEFT, Color.parseColor(borderColor.getString("left")), 255);
            reactViewBackgroundDrawable.setBorderColor(Spacing.RIGHT, Color.parseColor(borderColor.getString("right")), 255);
            reactViewBackgroundDrawable.setBorderColor(Spacing.TOP, Color.parseColor(borderColor.getString("top")), 255);
            reactViewBackgroundDrawable.setBorderColor(Spacing.BOTTOM, Color.parseColor(borderColor.getString("bottom")), 255);
        }

        if (props.hasKey("borderStyle")) {
            reactViewBackgroundDrawable.setBorderStyle(props.getString("borderStyle").toUpperCase());
        }

        view.setBackground(reactViewBackgroundDrawable);

        // This will overwrite border
        if (props.hasKey("backgroundGradient")) {
            ReadableMap backgroundGradient = props.getMap("backgroundGradient");
            GradientDrawable gradientDrawable = new GradientDrawable(
                GradientDrawable.Orientation.valueOf(backgroundGradient.getString("orientation")),
                new int[]{
                    Color.parseColor(backgroundGradient.getString("from")),
                    Color.parseColor(backgroundGradient.getString("to"))
                }
            );

            if (props.hasKey("borderRadius")) {
                ReadableMap borderRadius = props.getMap("borderRadius");

                gradientDrawable.setCornerRadii(
                    new float[]{
                        (float) borderRadius.getDouble("topLeft"),
                        (float) borderRadius.getDouble("topLeft"),
                        (float) borderRadius.getDouble("topRight"),
                        (float) borderRadius.getDouble("topRight"),
                        (float) borderRadius.getDouble("bottomRight"),
                        (float) borderRadius.getDouble("bottomRight"),
                        (float) borderRadius.getDouble("bottomLeft"),
                        (float) borderRadius.getDouble("bottomLeft"),
                    }
                );
            }
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

        if (padding != null) {
            view.setPadding(padding.getInt("left"), padding.getInt("top"), padding.getInt("right"), padding.getInt("bottom"));
        }

        try {
            addChildren();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
