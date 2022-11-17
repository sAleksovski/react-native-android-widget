package com.reactnativeandroidwidget.builder.widget.utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;

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

    public static void clear() {
        resourceToIdMap.clear();
    }

    public static Bitmap getBitmap(ReactApplicationContext context, String source) throws IOException {
        System.out.println(source);
        if (isResource(source)) {
            int resourceId = getResourceId(context, "drawable", source);
            return BitmapFactory.decodeResource(context.getResources(), resourceId);
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
}
