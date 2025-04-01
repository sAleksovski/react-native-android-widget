package com.reactnativeandroidwidget.builder.widget;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.PictureDrawable;
import android.widget.ImageView;

import androidx.core.graphics.drawable.RoundedBitmapDrawable;
import androidx.core.graphics.drawable.RoundedBitmapDrawableFactory;

import com.caverock.androidsvg.SVG;
import com.caverock.androidsvg.SVGParseException;
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
        try {
            if (!props.hasKey("image") || !props.getMap("image").hasKey("uri")) {
                return;
            }
            
            String uri = props.getMap("image").getString("uri");
            int width = dpToPx(props.getDouble("imageWidth"));
            int height = dpToPx(props.getDouble("imageHeight"));
            
            // Check if the image is an SVG
            if (uri.toLowerCase().endsWith(".svg") || uri.toLowerCase().contains("image/svg+xml")) {
                handleSvgImage(uri, width, height);
            } else {
                handleBitmapImage(uri, width, height);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void handleSvgImage(String src, int width, int height) {
        try {
            SVG svg = ResourceUtils.getSvg(appContext, src);
            if (svg != null) {
                svg.setDocumentWidth(width);
                svg.setDocumentHeight(height);
                PictureDrawable drawable = new PictureDrawable(svg.renderToPicture());
                view.setImageDrawable(drawable);
                
                // Apply corner radius if needed
                if (props.hasKey("radius")) {
                    // For SVGs, we need to draw to a bitmap for rounded corners
                    Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
                    Canvas canvas = new Canvas(bitmap);
                    drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
                    drawable.draw(canvas);
                    
                    RoundedBitmapDrawable roundedDrawable = 
                        RoundedBitmapDrawableFactory.create(appContext.getResources(), bitmap);
                    roundedDrawable.setCornerRadius(dpToPx(props.getDouble("radius")));
                    view.setImageDrawable(roundedDrawable);
                }
            }
        } catch (IOException | SVGParseException e) {
            e.printStackTrace();
            // Fallback to default image or leave blank
            view.setImageDrawable(null);
        }
    }
    
    private void handleBitmapImage(String src, int width, int height) {
        Bitmap bitmapFromURL = getBitmapFromURL(src, width, height);
        
        if (bitmapFromURL != null) {
            RoundedBitmapDrawable bitmapDrawable =
                RoundedBitmapDrawableFactory.create(appContext.getResources(), bitmapFromURL);

            if (props.hasKey("radius")) {
                bitmapDrawable.setCornerRadius(dpToPx(props.getDouble("radius")));
            }

            view.setImageDrawable(bitmapDrawable);
        } else {
            // Handle null bitmap case
            view.setImageDrawable(null);
        }
    }

    private Bitmap getBitmapFromURL(String src, int width, int height) {
        try {
            Bitmap bitmap = ResourceUtils.getBitmap(appContext, src);
            if (bitmap != null) {
                return Bitmap.createScaledBitmap(bitmap, width, height, true);
            }
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
