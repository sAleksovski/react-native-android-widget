package com.reactnativeandroidwidget;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

public class RNWidgetImageProvider extends ContentProvider {
    public static final String AUTHORITY_SUFFIX = ".rnwidget.imageprovider";

    @Override
    public boolean onCreate() {
        return true;
    }

    @Override
    public ParcelFileDescriptor openFile(@NonNull Uri uri, @NonNull String mode) throws FileNotFoundException {
        if (!"r".equals(mode)) {
            throw new FileNotFoundException("Write access denied. This provider is Read-Only.");
        }

        String fileName = uri.getLastPathSegment();
        if (fileName == null) {
            throw new FileNotFoundException("Invalid URI: " + uri);
        }

        File folder = getFolderWithImages(getContext());
        File file = new File(folder, fileName.replaceAll("\\?.*", ""));

        // Verify the file exists and is actually inside our folder (Path Traversal check)
        try {
            if (!file.getCanonicalPath().startsWith(folder.getCanonicalPath())) {
                throw new FileNotFoundException("Access denied: File is outside widget directory.");
            }
        } catch (Exception e) {
            throw new FileNotFoundException("Path security check failed.");
        }

        if (!file.exists()) {
            throw new FileNotFoundException("File not found: " + file.getPath());
        }

        return ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
    }

    // --- Boilerplate required for ContentProvider ---
    @Nullable @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) { return null; }
    @Nullable @Override
    public String getType(@NonNull Uri uri) { return "image/png"; } // Assume PNGs
    @Nullable @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) { return null; }
    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) { return 0; }
    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) { return 0; }

    static void deleteWidgetImages(Context context, int widgetId) {
        deleteImages(context, "widget_" + widgetId);
    }

    static void deleteCollectionImages(Context context, int widgetId, int collectionId, String mode) {
        deleteImages(context, "widget_" + widgetId + "_mode_" + mode + "_collection_" + collectionId);
    }

    private static void deleteImages(Context context, String prefix) {
        File folder = getFolderWithImages(context);
        File[] files = folder.listFiles(pathname -> pathname.getName().startsWith(prefix));

        for (File f : Objects.requireNonNull(files)) {
            f.delete();
        }
    }

    static void writeImage(Context context, String imageName, Bitmap bitmap) {
        File folder = getFolderWithImages(context);
        if (!folder.exists()) folder.mkdirs();
        File file = new File(folder, imageName);

        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    static Uri getImageUri(Context context, String fileName) {
        String authority = context.getPackageName() + AUTHORITY_SUFFIX;

        return new Uri.Builder()
            .scheme("content")
            .authority(authority)
            // Add cacheKey since the uri is cached and returns old images
            .appendPath(fileName + "?cacheKey=" + System.currentTimeMillis())
            .build();
    }

    private static File getFolderWithImages(Context context) {
        return new File(context.getFilesDir(), "widget_images");
    }
}
