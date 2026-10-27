package com.reactnativeandroidwidget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetProviderInfo;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Point;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.SizeF;
import android.view.View;
import android.widget.FrameLayout;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.Assert.*;
import static org.robolectric.Shadows.shadowOf;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 34, manifest = Config.NONE, qualifiers = "port-mdpi")
public class RNWidgetSizingTest {
    private Context context;
    private AppWidgetManager manager;
    private int id;

    @Before public void setup() {
        context = RuntimeEnvironment.getApplication();
        manager = AppWidgetManager.getInstance(context);
        id = shadowOf(manager).createWidget(AppWidgetProvider.class, android.R.layout.simple_list_item_1);
        manager.updateAppWidgetOptions(id, options(365, 354));
    }

    private Bundle options(int width, int height) {
        Bundle options = new Bundle();
        options.putInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, width);
        options.putInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH, width + 100);
        options.putInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, height - 100);
        options.putInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT, height);
        return options;
    }

    @Test public void selectsWholePairRatherThanMixingDimensions() {
        Bundle options = options(290, 303);
        options.putParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES,
            new ArrayList<>(Arrays.asList(new SizeF(337.67f, 303), new SizeF(290.67f, 286.67f))));
        assertEquals(new Point(338, 303), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_PORTRAIT, true));
        assertEquals(new Point(290, 303), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_PORTRAIT, false));
    }

    @Test public void selectsOrientationAndAcceptsSingleValidEntry() {
        Bundle options = options(100, 200);
        options.putParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES,
            new ArrayList<>(Arrays.asList(new SizeF(300, 100), new SizeF(100, 300))));
        assertEquals(new Point(300, 100), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_LANDSCAPE, true));
        assertEquals(new Point(100, 300), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_PORTRAIT, true));
        options.putParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES,
            new ArrayList<>(Arrays.asList(new SizeF(222, 111))));
        assertEquals(new Point(222, 111), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_PORTRAIT, true));
        options.putParcelableArrayList(AppWidgetManager.OPTION_APPWIDGET_SIZES,
            new ArrayList<>(Arrays.asList(new SizeF(0, 0), null)));
        assertEquals(new Point(100, 200), RNWidgetSizing.selectSize(options, Configuration.ORIENTATION_PORTRAIT, true));
    }

    @Test public void zeroOptionsUseProviderMinimumsConvertedToDp() {
        RuntimeEnvironment.setQualifiers("port-xhdpi");
        AppWidgetProviderInfo info = new AppWidgetProviderInfo();
        info.minWidth = 400;
        info.minHeight = 300;
        shadowOf(manager).putWidgetInfo(id, info);
        manager.updateAppWidgetOptions(id, options(0, 0));
        assertEquals(new Point(200, 150), RNWidgetSizing.getSize(context, id));
    }

    @Test public void providerFallbackOnlyReplacesInvalidAxis() {
        AppWidgetProviderInfo info = new AppWidgetProviderInfo();
        info.minWidth = 200;
        info.minHeight = 150;
        shadowOf(manager).putWidgetInfo(id, info);
        manager.updateAppWidgetOptions(id, options(365, 0));
        assertEquals(new Point(365, 150), RNWidgetSizing.getSize(context, id));
        manager.updateAppWidgetOptions(id, options(-1, 318));
        assertEquals(new Point(200, 318), RNWidgetSizing.getSize(context, id));
    }

    @Test public void calibrationOverridesProviderFallback() {
        AppWidgetProviderInfo info = new AppWidgetProviderInfo();
        info.minWidth = 200;
        info.minHeight = 150;
        shadowOf(manager).putWidgetInfo(id, info);
        manager.updateAppWidgetOptions(id, options(0, 0));
        assertTrue(RNWidgetSizing.correct(context, id, tap(new Rect(), 365, 318)));
        assertEquals(new Point(365, 318), RNWidgetSizing.getSize(context, id));
    }

    private Intent tap(Rect padding, int width, int height) {
        Intent intent = new Intent();
        RNWidgetSizing.attach(context, id, intent, padding);
        intent.setSourceBounds(new Rect(50, 70, 50 + width, 70 + height));
        return intent;
    }

    @Test public void childTapRecoversBothAxesFromActualFrameLayout() {
        // Rendered at 365x354; host allocates 365x318. Original button is 100x80.
        Rect padding = new Rect(20, 30, 245, 244);
        FrameLayout wrapper = new FrameLayout(context);
        wrapper.setPadding(padding.left, padding.top, padding.right, padding.bottom);
        FrameLayout button = new FrameLayout(context);
        wrapper.addView(button, new FrameLayout.LayoutParams(-1, -1));
        wrapper.measure(View.MeasureSpec.makeMeasureSpec(365, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(318, View.MeasureSpec.EXACTLY));
        wrapper.layout(0, 0, 365, 318);
        assertEquals(44, button.getHeight());
        assertTrue(RNWidgetSizing.correct(context, id, tap(padding, button.getWidth(), button.getHeight())));
        assertEquals(new Point(365, 318), RNWidgetSizing.getSize(context, id));
    }

    @Test public void rootTapPersistsAndRepeatedTapsDoNotTriggerResize() {
        Intent intent = tap(new Rect(), 365, 318);
        assertTrue(RNWidgetSizing.correct(context, id, intent));
        assertFalse(RNWidgetSizing.correct(context, id, intent));
        manager.updateAppWidgetOptions(id, new Bundle());
        assertEquals(new Point(365, 318), RNWidgetSizing.getSize(context, id));
        RNWidgetSizing.clear(context, id);
        assertEquals(new Point(365, 354), RNWidgetSizing.getSize(context, id));
    }

    @Test public void oldOverlayTapsStaySuppressedUntilCorrectedRender() {
        Intent oldTap = tap(new Rect(), 365, 318);
        assertFalse(RNWidgetSizing.hasOutdatedSize(context, id, oldTap));
        assertTrue(RNWidgetSizing.correct(context, id, oldTap));
        assertFalse(RNWidgetSizing.correct(context, id, oldTap));
        assertTrue(RNWidgetSizing.hasOutdatedSize(context, id, oldTap));
        Intent newTap = tap(new Rect(), 365, 318);
        assertFalse(RNWidgetSizing.hasOutdatedSize(context, id, newTap));
        assertFalse(RNWidgetSizing.correct(context, id, newTap));
    }

    @Test public void optionChangeInvalidatesCacheAndRejectsOldTap() {
        Intent oldTap = tap(new Rect(), 365, 318);
        RNWidgetSizing.correct(context, id, oldTap);
        manager.updateAppWidgetOptions(id, options(400, 400));
        assertFalse(RNWidgetSizing.correct(context, id, oldTap));
        assertEquals(new Point(400, 400), RNWidgetSizing.getSize(context, id));
    }

    @Test public void rotationAndDensityChangesRejectOldTap() {
        Intent oldTap = tap(new Rect(), 365, 318);
        RNWidgetSizing.correct(context, id, oldTap);
        RuntimeEnvironment.setQualifiers("land-mdpi");
        assertFalse(RNWidgetSizing.correct(context, id, oldTap));
        assertEquals(new Point(465, 254), RNWidgetSizing.getSize(context, id));
        RuntimeEnvironment.setQualifiers("port-xhdpi");
        assertFalse(RNWidgetSizing.correct(context, id, oldTap));
        assertTrue(RNWidgetSizing.correct(context, id, tap(new Rect(), 730, 636)));
        assertEquals(new Point(365, 318), RNWidgetSizing.getSize(context, id));
    }

    @Test public void storedSizeDeduplicatesLauncherCallbacks() {
        assertTrue(RNWidgetSizing.isWidgetNew(context, id));
        assertTrue(RNWidgetSizing.updateStoredSize(context, id));
        assertFalse(RNWidgetSizing.isWidgetNew(context, id));
        manager.updateAppWidgetOptions(id, options(365, 354));
        assertFalse(RNWidgetSizing.updateStoredSize(context, id));
        manager.updateAppWidgetOptions(id, options(400, 354));
        assertTrue(RNWidgetSizing.updateStoredSize(context, id));
        assertFalse(RNWidgetSizing.updateStoredSize(context, id));
        manager.updateAppWidgetOptions(id, options(400, 400));
        assertTrue(RNWidgetSizing.updateStoredSize(context, id));
        assertFalse(RNWidgetSizing.updateStoredSize(context, id));
    }

    @Test public void storedCorrectionDeduplicatesLaterLauncherCallback() {
        RNWidgetSizing.updateStoredSize(context, id);
        assertTrue(RNWidgetSizing.correct(context, id, tap(new Rect(), 365, 318)));
        assertTrue(RNWidgetSizing.updateStoredSize(context, id));
        manager.updateAppWidgetOptions(id, options(365, 354));
        assertFalse(RNWidgetSizing.updateStoredSize(context, id));
        assertEquals(new Point(365, 318), RNWidgetSizing.getSize(context, id));
    }

    @Test public void clearRemovesReportedAndMeasuredSizesOnlyForDeletedWidget() {
        int otherId = shadowOf(manager).createWidget(AppWidgetProvider.class, android.R.layout.simple_list_item_1);
        manager.updateAppWidgetOptions(otherId, options(200, 150));
        RNWidgetSizing.updateStoredSize(context, otherId);
        RNWidgetSizing.correct(context, id, tap(new Rect(), 365, 318));
        RNWidgetSizing.updateStoredSize(context, id);

        RNWidgetSizing.clear(context, id);

        assertTrue(RNWidgetSizing.isWidgetNew(context, id));
        assertEquals(new Point(365, 354), RNWidgetSizing.getSize(context, id));
        assertTrue(RNWidgetSizing.updateStoredSize(context, id));
        assertFalse(RNWidgetSizing.isWidgetNew(context, otherId));
        assertFalse(RNWidgetSizing.updateStoredSize(context, otherId));
    }

    @Test public void missingAndCollapsedBoundsCannotCalibrate() {
        assertFalse(RNWidgetSizing.correct(context, id, new Intent()));
        assertNull(RNWidgetSizing.inferSize(new Rect(0, 0, 100, 0), new Rect()));
        assertNull(RNWidgetSizing.inferSize(new Rect(0, 0, 100, 100), new Rect(-1, 0, 0, 0)));
        assertEquals(new Point(365, 354), RNWidgetSizing.getSize(context, id));
    }
}
