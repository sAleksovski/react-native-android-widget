package com.reactnativeandroidwidget.builder;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.reactnativeandroidwidget.builder.widget.BaseWidget;
import com.reactnativeandroidwidget.builder.widget.FrameLayoutWidget;
import com.reactnativeandroidwidget.builder.widget.IconWidget;
import com.reactnativeandroidwidget.builder.widget.ImageWidget;
import com.reactnativeandroidwidget.builder.widget.LinearLayoutWidget;
import com.reactnativeandroidwidget.builder.widget.RootWidget;
import com.reactnativeandroidwidget.builder.widget.SvgWidget;
import com.reactnativeandroidwidget.builder.widget.TextWidget;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class WidgetFactory {
    private static List<ClickableView> clickableViews = new ArrayList<>();

    public static WidgetWithViews buildWidgetFromRoot(ReactApplicationContext context, ReadableMap config, int width, int height) throws Exception {
        clickableViews = new ArrayList<>();

        View view = buildWidget(context, getRootConfig(config, width, height));

        WidgetWithViews widgetWithViews = new WidgetWithViews(view, clickableViews);

        clickableViews = new ArrayList<>();
        ResourceUtils.clear();

        return widgetWithViews;
    }

    @NonNull
    private static WritableMap getRootConfig(ReadableMap config, int width, int height) {
        WritableMap rootConfig = Arguments.createMap();

        WritableMap rootProps = Arguments.createMap();
        rootProps.putInt("widgetWidth", width);
        rootProps.putInt("widgetHeight", height);

        WritableArray rootChildren = Arguments.createArray();
        rootChildren.pushMap(config);

        rootConfig.putString("type", "RootWidget");
        rootConfig.putMap("props", rootProps);
        rootConfig.putArray("children", rootChildren);
        return rootConfig;
    }

    static View buildWidget(ReactApplicationContext context, ReadableMap config) throws Exception {
        BaseWidget<? extends View> baseWidget = getBaseWidget(context, config);
        View view = baseWidget.getView();
        ReadableMap props = config.getMap("props");

        if (props.hasKey("clickAction") || props.hasKey("openApp")) {
            clickableViews.add(
                new ClickableView(
                    view,
                    props.getString("clickAction"),
                    props.getMap("clickActionData"),
                    props.hasKey("openApp") && props.getBoolean("openApp")
                )
            );
        }

        return view;
    }

    @NonNull
    private static BaseWidget<? extends View> getBaseWidget(ReactApplicationContext context, ReadableMap config) throws Exception {
        switch (Objects.requireNonNull(config.getString("type"))) {
            case "TextWidget":
                return new TextWidget(context, config.getMap("props"));
            case "IconWidget":
                return new IconWidget(context, config.getMap("props"));
            case "ImageWidget":
                return new ImageWidget(context, config.getMap("props"));
            case "SvgWidget":
                return new SvgWidget(context, config.getMap("props"));
            case "LinearLayoutWidget":
                return new LinearLayoutWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children")));
            case "FrameLayoutWidget":
                return new FrameLayoutWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children")));
            case "RootWidget":
                return new RootWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children")));
        }

        throw new Exception("Invalid widget " + config.getString("type"));
    }

    private static List<View> buildChildren(ReactApplicationContext appContext, ReadableArray children) throws Exception {
        List<View> childWidgets = new ArrayList<>();

        for (int i = 0; i < children.size(); i++) {
            ReadableMap childConfig = children.getMap(i);
            View childView = buildWidget(appContext, childConfig);
            childWidgets.add(childView);
        }

        return childWidgets;
    }
}
