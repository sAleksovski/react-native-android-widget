package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProviderInfo;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class RNWidgetConfigurationActivity extends ReactActivity {

    private Bundle widgetInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        widgetInfo = getWidgetInfo();

        super.onCreate(savedInstanceState);

        // Set the result to CANCELED.  This will cause the widget host to cancel
        // out of the widget placement if the user presses the back button.
        setResult(RESULT_CANCELED);

        if (widgetInfo == null) {
            finish();
        }
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
            DefaultNewArchitectureEntryPoint.getFabricEnabled()) {

            @Override
            public String getMainComponentName() {
                return widgetInfo != null ? super.getMainComponentName() : null;
            }

            @Override
            protected Bundle getLaunchOptions() {
                if (widgetInfo == null) {
                    return null;
                }

                Bundle initialProps = new Bundle();
                initialProps.putBundle("widgetInfo", widgetInfo);
                return initialProps;
            }
        };
    }

    private Bundle getWidgetInfo() {
        int widgetId = getIntent()
            .getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);

        if (widgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            return null;
        }

        AppWidgetProviderInfo providerInfo = AppWidgetManager.getInstance(getApplicationContext())
            .getAppWidgetInfo(widgetId);

        if (providerInfo == null || providerInfo.provider == null) {
            return null;
        }

        // Reuse this provider information instead of looking it up again: the
        // widget could be removed between validation and preparing launch props.
        String className = providerInfo.provider.getClassName();
        String[] classNameParts = className.split("\\.");
        String widgetName = classNameParts[classNameParts.length - 1];

        Bundle widgetInfo = new Bundle();
        widgetInfo.putInt("widgetId", widgetId);
        widgetInfo.putString("widgetName", widgetName);
        widgetInfo.putInt("height", RNWidgetUtil.getWidgetHeight(getApplicationContext(), widgetId));
        widgetInfo.putInt("width", RNWidgetUtil.getWidgetWidth(getApplicationContext(), widgetId));
        widgetInfo.putBundle("screenInfo", Arguments.toBundle(RNWidgetUtil.getScreenInfo(getApplicationContext())));
        return widgetInfo;
    }
}
