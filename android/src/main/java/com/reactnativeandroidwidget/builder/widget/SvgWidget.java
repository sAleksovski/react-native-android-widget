package com.reactnativeandroidwidget.builder.widget;

import android.graphics.drawable.PictureDrawable;
import android.widget.ImageView;

import com.caverock.androidsvg.SVG;
import com.caverock.androidsvg.SVGParseException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

import java.io.IOException;

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
            SVG svg = getSvg();
            PictureDrawable pd = new PictureDrawable(svg.renderToPicture());
            view.setImageDrawable(pd);
        } catch (SVGParseException | IOException e) {
            e.printStackTrace();
        }
    }

    private SVG getSvg() throws SVGParseException, IOException {
        if (props.hasKey("svgString")) {
            return SVG.getFromString(props.getString("svgString"));
        } else {
            return ResourceUtils.getSvg(appContext, props.getString("svgUrl"));
        }
    }
}
