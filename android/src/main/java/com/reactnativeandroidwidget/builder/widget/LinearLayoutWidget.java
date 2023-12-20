package com.reactnativeandroidwidget.builder.widget;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.drawable.ShapeDrawable;
import android.view.View;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class LinearLayoutWidget extends BaseLayoutWidget<LinearLayout> {
    private class ClippedLinearLayout extends LinearLayout {
        private Path path;

        public ClippedLinearLayout(Context appContext) {
            super(appContext);
        }

        @Override
        protected void onSizeChanged(int width, int height, int oldWidth, int oldHeight) {
            super.onSizeChanged(width, height, oldWidth, oldHeight);

            if ("hidden".equals(props.getString("overflow")) && props.hasKey("borderRadius")) {
                ReadableMap borderRadius = props.getMap("borderRadius");
                float[] radii = new float[]{
                    (float) dpToPx(borderRadius.getDouble("topLeft")),
                    (float) dpToPx(borderRadius.getDouble("topLeft")),
                    (float) dpToPx(borderRadius.getDouble("topRight")),
                    (float) dpToPx(borderRadius.getDouble("topRight")),
                    (float) dpToPx(borderRadius.getDouble("bottomRight")),
                    (float) dpToPx(borderRadius.getDouble("bottomRight")),
                    (float) dpToPx(borderRadius.getDouble("bottomLeft")),
                    (float) dpToPx(borderRadius.getDouble("bottomLeft"))
                };

                this.path = new Path();
                this.path.addRoundRect(new RectF(0, 0, width, height), radii, Path.Direction.CW);
            }
        }

        @Override
        protected void dispatchDraw(Canvas canvas) {
            if (this.path != null) {
                canvas.clipPath(this.path);
            }
            super.dispatchDraw(canvas);
        }
    }

    public LinearLayoutWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    @Override
    protected LinearLayout createView() {
        return new ClippedLinearLayout(appContext);
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

            ShapeDrawable divider = new ShapeDrawable();
            divider.getPaint().setColor(Color.parseColor(separator.getString("color")));
            if (("HORIZONTAL").equals(props.getString("orientation"))) {
                divider.setIntrinsicWidth(dpToPx(separator.getDouble("size")));
            } else {
                divider.setIntrinsicHeight(dpToPx(separator.getDouble("size")));
            }
            view.setDividerDrawable(divider);
            view.setShowDividers(LinearLayout.SHOW_DIVIDER_MIDDLE);
        }

        addChildren();
    }
}
