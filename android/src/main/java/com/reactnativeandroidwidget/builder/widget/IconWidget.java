package com.reactnativeandroidwidget.builder.widget;

import static android.util.TypedValue.COMPLEX_UNIT_PX;

import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
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
        view.setTextSize(COMPLEX_UNIT_PX, getInt("size", 12));
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
                    new int[] {
                            Color.parseColor(backgroundGradient.getString("from")),
                            Color.parseColor(backgroundGradient.getString("to"))
                    }
            );

            gradientDrawable.setCornerRadius(0f);
            view.setBackground(gradientDrawable);
        }
    }
}
