package com.reactnativeandroidwidget.builder.widget;

import static android.util.TypedValue.COMPLEX_UNIT_SP;

import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.widget.TextView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.IOException;

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
            try {
                AssetManager assets = appContext.getAssets();
                String[] list = assets.list("fonts/");
                String assetFont = list[0];
                String propFont = props.getString("font");
                for (String s : list) {
                    if (s.startsWith(propFont + ".")) {
                        assetFont = s;
                    }
                }
                Typeface typeface = Typeface.createFromAsset(assets, "fonts/" + assetFont);
                view.setTypeface(typeface);
            } catch (IOException e) {
                e.printStackTrace();
            }
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
