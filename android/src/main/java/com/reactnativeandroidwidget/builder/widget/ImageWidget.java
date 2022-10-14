package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.widget.ImageView;

import androidx.core.graphics.drawable.RoundedBitmapDrawable;
import androidx.core.graphics.drawable.RoundedBitmapDrawableFactory;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

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
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return Bitmap.createScaledBitmap(myBitmap, width, height, true);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
