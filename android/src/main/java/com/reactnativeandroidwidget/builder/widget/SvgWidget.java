package com.reactnativeandroidwidget.builder.widget;

import android.graphics.drawable.PictureDrawable;
import android.widget.ImageView;

import com.caverock.androidsvg.SVG;
import com.caverock.androidsvg.SVGParseException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SvgWidget extends BaseWidget<ImageView> {
    public SvgWidget(ReactApplicationContext context, ReadableMap props) {
        super(context, props);
    }

    @Override
    protected ImageView createView() {
        return new ImageView(appContext);
    }

    @Override
    protected void applyProps() {
        try {
            SVG svg;
            if (props.hasKey("svgString")) {
                svg = SVG.getFromString(props.getString("svgString"));
            } else {
                svg = getSvgFromURL(props.getString("svgUrl"));
            }
            PictureDrawable pd = new PictureDrawable(svg.renderToPicture());
            view.setImageDrawable(pd);
        } catch (SVGParseException e) {
            e.printStackTrace();
        }
    }

    private SVG getSvgFromURL(String src) throws SVGParseException {
        try {
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return SVG.getFromInputStream(input);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
