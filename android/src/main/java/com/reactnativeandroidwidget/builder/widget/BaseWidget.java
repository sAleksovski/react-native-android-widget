package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.annotations.UnstableReactNativeAPI;
import com.facebook.react.uimanager.LengthPercentage;
import com.facebook.react.uimanager.LengthPercentageType;
import com.facebook.react.uimanager.Spacing;
import com.facebook.react.uimanager.drawable.CSSBackgroundDrawable;
import com.facebook.react.uimanager.style.BorderRadiusProp;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@UnstableReactNativeAPI
public abstract class BaseWidget<T extends View> {
    protected final ReactApplicationContext appContext;
    protected final ReadableMap props;
    protected final List<View> children;

    protected T view;

    private CSSBackgroundDrawable mReactViewBackground;

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

    public boolean isCollection() {
        return false;
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
                width = dpToPx(props.getDouble("width"));
            } else {
                width = "wrap_content".equals(props.getString("width"))
                    ? ViewGroup.LayoutParams.WRAP_CONTENT
                    : ViewGroup.LayoutParams.MATCH_PARENT;
            }
        }

        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        if (props.hasKey("height")) {
            if (props.getType("height").toString().equals("Number")) {
                height = dpToPx(props.getDouble("height"));
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
                        dpToPx(borderRadius.getDouble("topLeft")),
                        dpToPx(borderRadius.getDouble("topLeft")),
                        dpToPx(borderRadius.getDouble("topRight")),
                        dpToPx(borderRadius.getDouble("topRight")),
                        dpToPx(borderRadius.getDouble("bottomRight")),
                        dpToPx(borderRadius.getDouble("bottomRight")),
                        dpToPx(borderRadius.getDouble("bottomLeft")),
                        dpToPx(borderRadius.getDouble("bottomLeft")),
                    }
                );
            }
            view.setBackground(gradientDrawable);
        }
    }

    private void setBorder() {
        if (props.hasKey("borderColor")) {
            ReadableMap borderColor = props.getMap("borderColor");
            getReactViewBackground().setBorderColor(
                Spacing.LEFT,
                Color.parseColor(borderColor.getString("left"))
            );
            getReactViewBackground().setBorderColor(
                Spacing.RIGHT,
                Color.parseColor(borderColor.getString("right"))
            );
            getReactViewBackground().setBorderColor(
                Spacing.TOP,
                Color.parseColor(borderColor.getString("top"))
            );
            getReactViewBackground().setBorderColor(
                Spacing.BOTTOM,
                Color.parseColor(borderColor.getString("bottom"))
            );
        }

        if (props.hasKey("borderWidth")) {
            ReadableMap borderWidth = props.getMap("borderWidth");
            getReactViewBackground().setBorderWidth(Spacing.LEFT, dpToPx(borderWidth.getDouble("left")));
            getReactViewBackground().setBorderWidth(Spacing.RIGHT, dpToPx(borderWidth.getDouble("right")));
            getReactViewBackground().setBorderWidth(Spacing.TOP, dpToPx(borderWidth.getDouble("top")));
            getReactViewBackground().setBorderWidth(Spacing.BOTTOM, dpToPx(borderWidth.getDouble("bottom")));
        }

        if (props.hasKey("borderRadius")) {
            ReadableMap borderRadius = props.getMap("borderRadius");
            getReactViewBackground().setBorderRadius(BorderRadiusProp.BORDER_TOP_RIGHT_RADIUS, new LengthPercentage((float) borderRadius.getDouble("topRight"), LengthPercentageType.POINT));
            getReactViewBackground().setBorderRadius(BorderRadiusProp.BORDER_BOTTOM_RIGHT_RADIUS, new LengthPercentage((float) borderRadius.getDouble("bottomRight"), LengthPercentageType.POINT));
            getReactViewBackground().setBorderRadius(BorderRadiusProp.BORDER_BOTTOM_LEFT_RADIUS, new LengthPercentage((float) borderRadius.getDouble("bottomLeft"), LengthPercentageType.POINT));
            getReactViewBackground().setBorderRadius(BorderRadiusProp.BORDER_TOP_LEFT_RADIUS, new LengthPercentage((float) borderRadius.getDouble("topLeft"), LengthPercentageType.POINT));
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
                dpToPx(margin.getDouble("left")),
                dpToPx(margin.getDouble("top")),
                dpToPx(margin.getDouble("right")),
                dpToPx(margin.getDouble("bottom"))
            );
        }

        if (props.hasKey("weight")) {
            marginLayoutParams.weight = props.getInt("weight");
        }

        view.setLayoutParams(marginLayoutParams);
    }

    private void setPadding() {
        if (props.hasKey("padding") || props.hasKey("borderWidth")) {
            Map<String, Object> padding = getObjectOrEmptyMap(props.getMap("padding"));
            Map<String, Object> borderWidth = getObjectOrEmptyMap(props.getMap("borderWidth"));
            view.setPadding(
                dpToPx(((Double) padding.get("left")) + ((Double) borderWidth.get("left"))),
                dpToPx(((Double) padding.get("top")) + ((Double) borderWidth.get("top"))),
                dpToPx(((Double) padding.get("right")) + ((Double) borderWidth.get("right"))),
                dpToPx(((Double) padding.get("bottom")) + ((Double) borderWidth.get("bottom")))
            );
        }
    }

    private void setRotation() {
        if (props.hasKey("rotation")) {
            view.setRotation(props.getInt("rotation"));
        }
    }

    private CSSBackgroundDrawable getReactViewBackground() {
        if (mReactViewBackground == null) {
            mReactViewBackground = new CSSBackgroundDrawable(view.getContext());
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

    protected String getString(String key, String fallback) {
        if (props.hasKey(key)) {
            return props.getString(key);
        }

        return fallback;
    }

    protected int dpToPx(double dpValue) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, (float) dpValue, appContext.getResources().getDisplayMetrics()));
    }
}
