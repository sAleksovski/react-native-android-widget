package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.Spacing;
import com.facebook.react.views.view.ReactViewBackgroundDrawable;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseWidget<T extends View> {
    protected final ReactApplicationContext appContext;
    protected final ReadableMap props;
    protected final List<View> children;

    protected T view;

    private ReactViewBackgroundDrawable mReactViewBackground;

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
        setHeightAndWidth();
        setBorder();
        setBackground();
        setMarginAndFlex();
        setPadding();
        setRotation();
    }

    private void setHeightAndWidth() {
        int width = ViewGroup.LayoutParams.WRAP_CONTENT;
        if (props.hasKey("width")) {
            if (props.getType("width").toString().equals("Number")) {
                width = props.getInt("width");
            } else {
                width = "wrap_content".equals(props.getString("width"))
                    ? ViewGroup.LayoutParams.WRAP_CONTENT
                    : ViewGroup.LayoutParams.MATCH_PARENT;
            }
        }

        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        if (props.hasKey("height")) {
            if (props.getType("height").toString().equals("Number")) {
                height = props.getInt("height");
            } else {
                height = "wrap_content".equals(props.getString("height"))
                    ? ViewGroup.LayoutParams.WRAP_CONTENT
                    : ViewGroup.LayoutParams.MATCH_PARENT;
            }
        }

        view.setLayoutParams(new ViewGroup.LayoutParams(width, height));
    }

    private void setBackground() {
        if (props.hasKey("backgroundColor")) {
            getReactViewBackground().setColor(Color.parseColor(props.getString("backgroundColor")));
        }

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
    }

    private void setBorder() {
        if (props.hasKey("borderColor")) {
            ReadableMap borderColor = props.getMap("borderColor");
            getReactViewBackground().setBorderColor(Spacing.LEFT, Color.parseColor(borderColor.getString("left")), 255);
            getReactViewBackground().setBorderColor(Spacing.RIGHT, Color.parseColor(borderColor.getString("right")), 255);
            getReactViewBackground().setBorderColor(Spacing.TOP, Color.parseColor(borderColor.getString("top")), 255);
            getReactViewBackground().setBorderColor(Spacing.BOTTOM, Color.parseColor(borderColor.getString("bottom")), 255);
        }

        if (props.hasKey("borderWidth")) {
            ReadableMap borderWidth = props.getMap("borderWidth");
            getReactViewBackground().setBorderWidth(Spacing.LEFT, borderWidth.getInt("left"));
            getReactViewBackground().setBorderWidth(Spacing.RIGHT, borderWidth.getInt("right"));
            getReactViewBackground().setBorderWidth(Spacing.TOP, borderWidth.getInt("top"));
            getReactViewBackground().setBorderWidth(Spacing.BOTTOM, borderWidth.getInt("bottom"));
        }

        if (props.hasKey("borderRadius")) {
            ReadableMap borderRadius = props.getMap("borderRadius");
            getReactViewBackground().setRadius(borderRadius.getInt("topRight"), 1);
            getReactViewBackground().setRadius(borderRadius.getInt("bottomRight"), 2);
            getReactViewBackground().setRadius(borderRadius.getInt("bottomLeft"), 3);
            getReactViewBackground().setRadius(borderRadius.getInt("topLeft"), 0);
        }

        if (props.hasKey("borderStyle")) {
            getReactViewBackground().setBorderStyle(props.getString("borderStyle").toUpperCase());
        }
    }

    private void setMarginAndFlex() {
        LinearLayout.LayoutParams marginLayoutParams = new LinearLayout.LayoutParams(view.getLayoutParams());
        if (props.hasKey("margin")) {
            ReadableMap margin = props.getMap("margin");
            marginLayoutParams.setMargins(
                margin.getInt("left"),
                margin.getInt("top"),
                margin.getInt("right"),
                margin.getInt("bottom")
            );
        }

        if (props.hasKey("weight")) {
            marginLayoutParams.weight = (float) props.getInt("weight");
        }

        view.setLayoutParams(marginLayoutParams);
    }

    private void setPadding() {
        if (props.hasKey("padding") || props.hasKey("borderWidth")) {
            Map<String, Object> padding = getObjectOrEmptyMap(props.getMap("padding"));
            Map<String, Object> borderWidth = getObjectOrEmptyMap(props.getMap("borderWidth"));
            view.setPadding(
                ((Double) padding.get("left")).intValue() + ((Double) borderWidth.get("left")).intValue(),
                ((Double) padding.get("top")).intValue() + ((Double) borderWidth.get("top")).intValue(),
                ((Double) padding.get("right")).intValue() + ((Double) borderWidth.get("right")).intValue(),
                ((Double) padding.get("bottom")).intValue() + ((Double) borderWidth.get("bottom")).intValue()
            );
        }
    }

    private void setRotation() {
        if (props.hasKey("rotation")) {
            view.setRotation(props.getInt("rotation"));
        }
    }

    private ReactViewBackgroundDrawable getReactViewBackground() {
        if (mReactViewBackground == null) {
            mReactViewBackground = new ReactViewBackgroundDrawable(view.getContext());
            view.setBackground(null);
            view.setBackground(mReactViewBackground);
        }
        return mReactViewBackground;
    }

    private Map<String, Object> getObjectOrEmptyMap(ReadableMap propMap) {
        HashMap<String, Object> objectMap;
        if (propMap != null) {
            objectMap = propMap.toHashMap();
        } else {
            objectMap = new HashMap<>();
            objectMap.put("top", 0d);
            objectMap.put("bottom", 0d);
            objectMap.put("left", 0d);
            objectMap.put("right", 0d);
        }
        return objectMap;
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
