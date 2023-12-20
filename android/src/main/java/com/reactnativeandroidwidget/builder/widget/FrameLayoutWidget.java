package com.reactnativeandroidwidget.builder.widget;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.graphics.RectF;
import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class FrameLayoutWidget extends BaseLayoutWidget<FrameLayout> {
    private class ClippedFrameLayout extends FrameLayout {
        private Path path;

        public ClippedFrameLayout(Context appContext) {
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

    public FrameLayoutWidget(ReactApplicationContext context, ReadableMap props, List<View> children) {
        super(context, props, children);
    }

    @Override
    protected FrameLayout createView() {
        return new ClippedFrameLayout(appContext);
    }

    @Override
    public void applyProps() {
        addChildren();
    }
}
