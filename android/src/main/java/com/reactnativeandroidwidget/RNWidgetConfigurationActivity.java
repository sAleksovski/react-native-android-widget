package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProviderInfo;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class RNWidgetConfigurationActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the result to CANCELED.  This will cause the widget host to cancel
        // out of the widget placement if the user presses the back button.
        setResult(RESULT_CANCELED);
    }

    /**
     * Returns the name of the widget configuration component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNWidgetConfigurationScreen";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we create a {@link
     * ReactActivityDelegate} instead of {@link DefaultReactActivityDelegate} which is in the default
     * MainActivity since we need to override `getLaunchOptions` to provide initial props containing
     * the widget info.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            DefaultNewArchitectureEntryPoint.getFabricEnabled(),
            // TODO: Remove when React Native 73 is released
            DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()) {

            @Override
            protected Bundle getLaunchOptions() {
                Bundle initialProps = new Bundle();
                initialProps.putBundle("widgetInfo", getWidgetInfo());
                return initialProps;
            }
        };
    }

    private Bundle getWidgetInfo() {
        Bundle widgetInfo = new Bundle();
        int widgetId = getWidgetId();
        String widgetName = getWidgetName(widgetId);

        widgetInfo.putInt("widgetId", widgetId);
        widgetInfo.putString("widgetName", widgetName);
        widgetInfo.putInt("height", RNWidgetUtil.getWidgetHeight(getApplicationContext(), widgetId));
        widgetInfo.putInt("width", RNWidgetUtil.getWidgetWidth(getApplicationContext(), widgetId));
        widgetInfo.putBundle("screenInfo", Arguments.toBundle(RNWidgetUtil.getScreenInfo(getApplicationContext())));
        return widgetInfo;
    }

    private int getWidgetId() {
        int widgetId = getIntent()
            .getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);

        if (widgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
        }

        return widgetId;
    }

    private String getWidgetName(int widgetId) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(getApplicationContext());
        AppWidgetProviderInfo providerInfo = appWidgetManager.getAppWidgetInfo(widgetId);
        String className = providerInfo.provider.getClassName();
        String[] classNameParts = className.split("\\.");
        return classNameParts[classNameParts.length - 1];
    }
}
