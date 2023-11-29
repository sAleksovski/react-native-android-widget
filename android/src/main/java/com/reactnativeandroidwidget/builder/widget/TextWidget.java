package com.reactnativeandroidwidget.builder.widget;

import static android.util.TypedValue.COMPLEX_UNIT_DIP;
import static android.util.TypedValue.COMPLEX_UNIT_SP;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.text.TextUtils;
import android.view.Gravity;
import android.widget.TextView;

import androidx.core.widget.TextViewCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

public class TextWidget extends BaseWidget<TextView> {
    public TextWidget(ReactApplicationContext context, ReadableMap props) {
        super(context, props);
    }

    @Override
    protected TextView createView() {
        return new TextView(appContext);
    }

    @Override
    public void applyProps() {
        view.setText(getString("text", ""));
        view.setTextSize(getFontSizeUnit(), getFontSize());
        view.setTextColor(Color.parseColor(getString("color", "#000000")));

        if (props.hasKey("adjustsFontSizeToFit") && props.getBoolean("adjustsFontSizeToFit")) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                view.setAutoSizeTextTypeUniformWithConfiguration(1, Math.round(getFontSize()), 1, getFontSizeUnit());
            } else {
                TextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(view, 1, Math.round(getFontSize()), 1, getFontSizeUnit());
            }
        }

        if (props.hasKey("textAlign")) {
            if ("left".equals(props.getString("textAlign"))) {
                view.setGravity(Gravity.LEFT);
            } else if ("right".equals(props.getString("textAlign"))) {
                view.setGravity(Gravity.RIGHT);
            } else {
                view.setGravity(Gravity.CENTER);
            }
        }

        if (props.hasKey("letterSpacing")) {
            view.setLetterSpacing((float) (props.getDouble("letterSpacing") / getFontSize()));
        }

        if (props.hasKey("truncate")) {
            view.setEllipsize(TextUtils.TruncateAt.valueOf(props.getString("truncate")));
        }

        if (props.hasKey("maxLines")) {
            view.setMaxLines(props.getInt("maxLines"));
        }

        setFont();
        setShadow();
    }

    private void setFont() {
        Typeface typeface = ResourceUtils.getTypeface(appContext, props.getString("fontFamily"));
        boolean isItalic = "italic".equals(props.getString("fontStyle"));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {

            int fontWeight = 400;
            if (props.hasKey("fontWeight")) {
                String fontWeightStyle = getString("fontWeight", "400");
                if ("normal".equals(fontWeightStyle)) {
                    fontWeight = 400;
                } else if ("bold".equals(fontWeightStyle)) {
                    fontWeight = 700;
                } else {
                    fontWeight = Integer.parseInt(fontWeightStyle);
                }
            }

            typeface = Typeface.create(typeface, fontWeight, isItalic);
            view.setTypeface(typeface);
        } else {
            int typefaceStyle = Typeface.NORMAL;

            if (isItalic) {
                typefaceStyle |= Typeface.ITALIC;
            }

            if (props.hasKey("fontWeight") && !"normal".equals(props.getString("fontWeight"))) {
                String fontWeight = getString("fontWeight", "0");
                if ("bold".equals(fontWeight) || "500".compareTo(fontWeight) <= 0) {
                    typefaceStyle |= Typeface.BOLD;
                }
            }

            view.setTypeface(typeface, typefaceStyle);
        }
    }

    private void setShadow() {
        ReadableMap shadow = props.getMap("shadow");
        if (shadow != null) {
            view.setShadowLayer(
                dpToPx(shadow.getDouble("radius")),
                dpToPx(shadow.getDouble("dx")),
                dpToPx(shadow.getDouble("dy")),
                Color.parseColor(shadow.getString("color"))
            );
        }
    }

    private float getFontSize() {
        float fontSize = 12;
        if (props.hasKey("fontSize")) {
            fontSize = (float) props.getDouble("fontSize");
        }
        return fontSize;
    }

    private int getFontSizeUnit() {
        if (props.hasKey("allowFontScaling") && Boolean.FALSE.equals(props.getBoolean("allowFontScaling"))) {
            return COMPLEX_UNIT_DIP;
        }
        return COMPLEX_UNIT_SP;
    }
}
