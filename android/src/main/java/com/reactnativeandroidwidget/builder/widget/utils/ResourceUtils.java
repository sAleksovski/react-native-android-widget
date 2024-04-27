package com.reactnativeandroidwidget.builder.widget.utils;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Typeface;
import android.net.Uri;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.caverock.androidsvg.SVG;
import com.caverock.androidsvg.SVGParseException;
import com.facebook.react.bridge.ReactApplicationContext;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class ResourceUtils {
    public static Map<String, Integer> resourceToIdMap = new HashMap<>();
    public static Map<String, Typeface> fontNameToTypefaceMap = new HashMap<>();

    public static void clear() {
        resourceToIdMap.clear();
        fontNameToTypefaceMap.clear();
    }

    public static Bitmap getBitmap(ReactApplicationContext context, String source) throws IOException {
        if (isResource(source)) {
            int resourceId = getResourceId(context, "drawable", source);
            return BitmapFactory.decodeResource(context.getResources(), resourceId);
        } else if (source.startsWith("data:")) {
            String base64String = source.split("base64,")[1];
            byte[] decodedString = Base64.decode(base64String, Base64.DEFAULT);
            return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        } else if (source.startsWith("file://")) {
            return BitmapFactory.decodeFile(source.replaceFirst("file://", ""));
        } else {
            InputStream input = getInputStreamFromSource(source);
            return BitmapFactory.decodeStream(input);
        }
    }

    public static SVG getSvg(ReactApplicationContext context, String source) throws IOException, SVGParseException {
        if (isResource(source)) {
            int resourceId = getResourceId(context, "raw", source);
            return SVG.getFromResource(context.getResources(), resourceId);
        } else {
            InputStream input = getInputStreamFromSource(source);
            return SVG.getFromInputStream(input);
        }
    }

    public static Typeface getTypeface(ReactApplicationContext context, @Nullable String fontName) {
        if (fontName != null) {
            if (!fontNameToTypefaceMap.containsKey(fontName)) {
                Typeface typeface = loadTypeface(context, fontName);
                fontNameToTypefaceMap.put(fontName, typeface);
            }

            return fontNameToTypefaceMap.get(fontName);
        }

        return Typeface.DEFAULT;
    }

    private static boolean isResource(String source) {
        Uri uri = Uri.parse(source);

        return uri.getScheme() == null;
    }

    private static int getResourceId(Context context, String resourceType, String name) {
        if (name == null || name.isEmpty()) {
            return 0;
        }
        name = name.toLowerCase(Locale.ROOT).replace("-", "_");

        // name could be a resource id.
        try {
            return Integer.parseInt(name);
        } catch (NumberFormatException e) {
            // Do nothing.
        }

        String mapKey = name + "-" + resourceType;
        if (!resourceToIdMap.containsKey(mapKey)) {
            int resourceId = context.getResources().getIdentifier(name, resourceType, context.getPackageName());
            resourceToIdMap.put(mapKey, resourceId);
        }

        return resourceToIdMap.get(mapKey);
    }

    private static InputStream getInputStreamFromSource(String source) throws IOException {
        URL url = new URL(source);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoInput(true);
        connection.connect();
        return connection.getInputStream();
    }

    private static Typeface loadTypeface(ReactApplicationContext context, @NonNull String fontName) {
        try {
            String assetFont = findAssetFont(context.getAssets(), fontName);

            if (assetFont != null) {
                return Typeface.createFromAsset(context.getAssets(), "fonts/" + assetFont);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Typeface.DEFAULT;
    }

    @Nullable
    private static String findAssetFont(AssetManager assetManager, @NonNull String fontName) throws IOException {
        String[] fontFiles = assetManager.list("fonts");

        String assetFont = null;
        for (String file : fontFiles) {
            if (file.startsWith(fontName + ".")) {
                assetFont = file;
            }
        }

        return assetFont;
    }
}
