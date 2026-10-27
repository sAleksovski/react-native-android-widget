package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProviderInfo;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Point;
import android.graphics.Rect;
import android.os.Build;
import android.os.Bundle;
import android.util.SizeF;

import java.util.ArrayList;

public final class RNWidgetSizing {
    private static final String PADDING = "rnwidget.size.padding";
    private static final String PROFILE = "rnwidget.size.profile";
    private static final String RENDERED_SIZE = "rnwidget.size.rendered";

    private RNWidgetSizing() {}

    static Point getSize(Context context, int id) {
        String profile = profile(context, id);
        SharedPreferences prefs = preferences(context);
        if (profile.equals(prefs.getString(id + ":profile", null))) {
            int width = prefs.getInt(id + ":width", 0);
            int height = prefs.getInt(id + ":height", 0);
            if (width > 0 && height > 0) return new Point(width, height);
        }
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        Point size = selectSize(manager.getAppWidgetOptions(id),
            context.getResources().getConfiguration().orientation, Build.VERSION.SDK_INT >= 31);
        if (size.x <= 0 || size.y <= 0) {
            AppWidgetProviderInfo info = manager.getAppWidgetInfo(id);
            if (info != null) {
                // Provider dimensions are pixels; launcher options and our layout API use dp.
                float density = context.getResources().getDisplayMetrics().density;
                if (size.x <= 0) size.x = Math.max(1, Math.round(info.minWidth / density));
                if (size.y <= 0) size.y = Math.max(1, Math.round(info.minHeight / density));
            }
        }
        return size;
    }

    static boolean updateStoredSize(Context context, int widgetId) {
        SharedPreferences prefs = storedSizes(context);
        Point size = getSize(context, widgetId);
        boolean changed = prefs.getInt(widgetId + "-width", 0) != size.x
            || prefs.getInt(widgetId + "-height", 0) != size.y;
        prefs.edit()
            .putInt(widgetId + "-width", size.x)
            .putInt(widgetId + "-height", size.y)
            .apply();
        return changed;
    }

    static boolean isWidgetNew(Context context, int widgetId) {
        return storedSizes(context).getInt(widgetId + "-width", -1) == -1;
    }

    private static SharedPreferences storedSizes(Context context) {
        // Last size reported to JS; separate from host measurements used for calibration.
        return context.getSharedPreferences(context.getPackageName() + ".WIDGET_SIZES", Context.MODE_PRIVATE);
    }

    static Point selectSize(Bundle options, int orientation, boolean supportsSizes) {
        boolean landscape = orientation == Configuration.ORIENTATION_LANDSCAPE;
        if (supportsSizes) {
            ArrayList<SizeF> sizes = options.getParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES);
            SizeF selected = null;
            if (sizes != null) {
                for (SizeF size : sizes) {
                    if (size == null || !valid(size.getWidth()) || !valid(size.getHeight())) continue;
                    if (selected == null || (landscape
                        ? size.getWidth() > selected.getWidth()
                        : size.getHeight() > selected.getHeight())) selected = size;
                }
            }
            // Keep the pair together, including launchers that provide only one size.
            if (selected != null) return new Point(Math.max(1, Math.round(selected.getWidth())),
                Math.max(1, Math.round(selected.getHeight())));
        }
        return new Point(options.getInt(landscape ? AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH
                : AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH),
            options.getInt(landscape ? AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT
                : AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT));
    }

    private static boolean valid(float value) {
        return value > 0 && !Float.isInfinite(value) && !Float.isNaN(value);
    }

    static void attach(Context context, int id, Intent intent, Rect padding) {
        intent.putExtra(PADDING, padding);
        intent.putExtra(PROFILE, profile(context, id));
        intent.putExtra(RENDERED_SIZE, getSize(context, id));
    }

    static boolean hasOutdatedSize(Context context, int id, Intent intent) {
        Point renderedSize = intent.getParcelableExtra(RENDERED_SIZE);
        return renderedSize != null && (!profile(context, id).equals(intent.getStringExtra(PROFILE))
            || !renderedSize.equals(getSize(context, id)));
    }

    static boolean correct(Context context, int id, Intent intent) {
        if (id <= 0 || !profile(context, id).equals(intent.getStringExtra(PROFILE))) return false;
        Rect padding = intent.getParcelableExtra(PADDING);
        Point pixels = inferSize(intent.getSourceBounds(), padding);
        if (pixels == null) return false;
        float density = context.getResources().getDisplayMetrics().density;
        Point size = new Point(Math.max(1, Math.round(pixels.x / density)),
            Math.max(1, Math.round(pixels.y / density)));
        Point previous = getSize(context, id);
        preferences(context).edit().putString(id + ":profile", profile(context, id))
            .putInt(id + ":width", size.x).putInt(id + ":height", size.y).apply();
        return !size.equals(previous);
    }

    static Point inferSize(Rect source, Rect padding) {
        if (source == null || padding == null || source.width() <= 0 || source.height() <= 0
            || padding.left < 0 || padding.top < 0 || padding.right < 0 || padding.bottom < 0) return null;
        long width = (long) source.width() + padding.left + padding.right;
        long height = (long) source.height() + padding.top + padding.bottom;
        if (width > Integer.MAX_VALUE || height > Integer.MAX_VALUE) return null;
        return new Point((int) width, (int) height);
    }

    static void clear(Context context, int id) {
        storedSizes(context).edit().remove(id + "-width").remove(id + "-height").apply();
        preferences(context).edit().remove(id + ":profile").remove(id + ":width")
            .remove(id + ":height").apply();
    }

    private static SharedPreferences preferences(Context context) {
        return context.getSharedPreferences("rnwidget.measured_sizes", Context.MODE_PRIVATE);
    }

    private static String profile(Context context, int id) {
        Bundle options = AppWidgetManager.getInstance(context).getAppWidgetOptions(id);
        Configuration config = context.getResources().getConfiguration();
        // Invalidate measurements on size-option, orientation or density changes, but keep
        // them across ordinary updates and process restarts. Ignore unrelated option keys.
        return config.orientation + ":" + context.getResources().getDisplayMetrics().densityDpi
            + ":" + options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)
            + ":" + options.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH)
            + ":" + options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT)
            + ":" + options.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT)
            + ":" + (Build.VERSION.SDK_INT >= 31 ? options.getParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES) : "");
    }
}
