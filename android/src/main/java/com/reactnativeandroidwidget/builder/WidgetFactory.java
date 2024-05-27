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
import com.reactnativeandroidwidget.builder.widget.ListWidget;
import com.reactnativeandroidwidget.builder.widget.RootWidget;
import com.reactnativeandroidwidget.builder.widget.SvgWidget;
import com.reactnativeandroidwidget.builder.widget.TextWidget;
import com.reactnativeandroidwidget.builder.widget.utils.ResourceUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public class WidgetFactory {
    private final List<ClickableView> clickableViews;
    private final List<CollectionView> collectionViews;

    private WidgetFactory() {
        this.clickableViews = new ArrayList<>();
        this.collectionViews = new ArrayList<>();
    }

    public static WidgetWithViews buildWidgetFromRoot(ReactApplicationContext context, ReadableMap config, int width, int height) throws Exception {
        WidgetFactory widgetFactory = new WidgetFactory();

        View view = widgetFactory.buildWidget(context, widgetFactory.getRootConfig(config, width, height), "0");

        for (int i = 0; i < widgetFactory.collectionViews.size(); i++) {
            widgetFactory.collectionViews.get(i).buildChildren(context);
        }

        ResourceUtils.clear();

        widgetFactory.clickableViews.sort(Comparator.comparing(ClickableView::getId));
        return new WidgetWithViews(view, widgetFactory.clickableViews, widgetFactory.collectionViews);
    }

    @NonNull
    private WritableMap getRootConfig(ReadableMap config, int width, int height) {
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

    private View buildWidget(ReactApplicationContext context, ReadableMap config, String id) throws Exception {
        BaseWidget<? extends View> baseWidget = getBaseWidget(context, config, id);
        View view = baseWidget.getView();

        if (baseWidget.isCollection()) {
            collectionViews.add(
                new CollectionView(
                    view,
                    config.getArray("children")
                )
            );
        }

        if (config.getMap("props").hasKey("clickAction")) {
            clickableViews.add(
                new ClickableView(
                    id,
                    view,
                    config.getMap("props").getString("clickAction"),
                    config.getMap("props").getMap("clickActionData")
                )
            );
        }

        return view;
    }

    @NonNull
    private BaseWidget<? extends View> getBaseWidget(ReactApplicationContext context, ReadableMap config, String id) throws Exception {
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
                return new LinearLayoutWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children"), id));
            case "FrameLayoutWidget":
                return new FrameLayoutWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children"), id));
            case "ListWidget":
                return new ListWidget(context, config.getMap("props"));
            case "RootWidget":
                return new RootWidget(context, config.getMap("props"), buildChildren(context, config.getArray("children"), id));
        }

        throw new Exception("Invalid widget " + config.getString("type"));
    }

    private List<View> buildChildren(ReactApplicationContext appContext, ReadableArray children, String id) throws Exception {
        List<View> childWidgets = new ArrayList<>();

        for (int i = 0; i < children.size(); i++) {
            ReadableMap childConfig = children.getMap(i);
            View childView = buildWidget(appContext, childConfig, id + "-" + i);
            childWidgets.add(childView);
        }

        return childWidgets;
    }
}
