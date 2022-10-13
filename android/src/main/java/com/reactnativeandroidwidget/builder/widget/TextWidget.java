package com.reactnativeandroidwidget.builder.widget;

import static android.util.TypedValue.COMPLEX_UNIT_SP;

import android.graphics.Color;
import android.text.TextUtils;
import android.widget.TextView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

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
        view.setTextSize(COMPLEX_UNIT_SP, getFontSize());
        view.setTextColor(Color.parseColor(getString("color", "#000000")));

        if (props.hasKey("truncate")) {
            view.setEllipsize(TextUtils.TruncateAt.valueOf(props.getString("truncate")));
        }

        if (props.hasKey("maxLines")) {
            view.setMaxLines(props.getInt("maxLines"));
        }

        setShadow();
    }

    private void setShadow() {
        ReadableMap shadow = props.getMap("shadow");
        if (shadow != null) {
            view.setShadowLayer(
                shadow.getInt("radius"),
                shadow.getInt("dx"),
                shadow.getInt("dy"),
                Color.parseColor(shadow.getString("color")));
        }
    }

    private float getFontSize() {
        float fontSize = 12;
        if (props.hasKey("fontSize")) {
            fontSize = (float) props.getDouble("fontSize");
        }
        return fontSize;
    }
}
