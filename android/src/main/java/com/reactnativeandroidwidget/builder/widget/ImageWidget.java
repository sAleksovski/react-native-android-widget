package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Bitmap;
import android.widget.ImageView;

import androidx.core.graphics.drawable.RoundedBitmapDrawable;
import androidx.core.graphics.drawable.RoundedBitmapDrawableFactory;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

import java.io.IOException;

public class ImageWidget extends BaseWidget<ImageView> {
    public ImageWidget(ReactApplicationContext context, ReadableMap props) {
        super(context, props);
    }

    @Override
    protected ImageView createView() {
        return new ImageView(appContext);
    }

    @Override
    protected void applyProps() {
        Bitmap bitmapFromURL = getBitmapFromURL(props.getMap("image").getString("uri"),
            dpToPx(props.getDouble("imageWidth")),
            dpToPx(props.getDouble("imageHeight"))
        );

        RoundedBitmapDrawable bitmapDrawable =
            RoundedBitmapDrawableFactory.create(appContext.getResources(), bitmapFromURL);

        if (props.hasKey("radius")) {
            bitmapDrawable.setCornerRadius(dpToPx(props.getDouble("radius")));
        }

        view.setImageDrawable(bitmapDrawable);
    }

    private Bitmap getBitmapFromURL(String src, int width, int height) {
        try {
            Bitmap bitmap = ResourceUtils.getBitmap(appContext, src);
            return Bitmap.createScaledBitmap(bitmap, width, height, true);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
