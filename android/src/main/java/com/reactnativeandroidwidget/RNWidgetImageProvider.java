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
import java.security.SecureRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RNWidgetImageProvider extends ContentProvider {
    public static final String AUTHORITY_SUFFIX = ".rnwidget.imageprovider";

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Pattern IMAGE_NAME = Pattern.compile(
        "widget_[0-9]+_mode_(?:light|dark)_(?:collection_[0-9]+_[0-9]+_)?[0-9a-f]{64}\\.png"
    );
    private static final Pattern LEGACY_IMAGE_NAME = Pattern.compile(
        "(widget_[0-9]+_mode_(?:light|dark)(?:_collection_[0-9]+_[0-9]+)?\\.png)(?:\\?cacheKey=[0-9]+)?"
    );

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
        if (!"content".equals(uri.getScheme())
            || !(getContext().getPackageName() + AUTHORITY_SUFFIX).equals(uri.getAuthority())
            || uri.getPathSegments().size() != 1
            || uri.getQuery() != null || uri.getFragment() != null
            || fileName == null
            || !("/" + Uri.encode(fileName)).equals(uri.getEncodedPath())) {
            throw new FileNotFoundException("Image not found");
        }
        if (!IMAGE_NAME.matcher(fileName).matches()) {
            // Older versions embedded the cache key in the encoded path segment.
            Matcher legacyName = LEGACY_IMAGE_NAME.matcher(fileName);
            if (!legacyName.matches()) {
                throw new FileNotFoundException("Image not found");
            }
            fileName = legacyName.group(1);
        }

        try {
            File folder = getFolderWithImages(getContext()).getCanonicalFile();
            File file = new File(folder, fileName).getCanonicalFile();
            if (!folder.equals(file.getParentFile()) || !file.isFile()) {
                throw new FileNotFoundException("Image not found");
            }
            return ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY);
        } catch (IOException e) {
            // A filename is a bearer credential; never include it in errors or logs.
            throw new FileNotFoundException("Image not found");
        }
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
        deleteImages(context, "widget_" + widgetId + "_");
    }

    static void deleteCollectionImages(Context context, int widgetId, int collectionId, String mode) {
        deleteImages(context, "widget_" + widgetId + "_mode_" + mode + "_collection_" + collectionId + "_");
    }

    static void deleteMainImage(Context context, int widgetId, String mode) {
        String prefix = "widget_" + widgetId + "_mode_" + mode;
        File[] files = getFolderWithImages(context).listFiles(file ->
            file.getName().equals(prefix + ".png")
                || (file.getName().startsWith(prefix + "_")
                    && !file.getName().startsWith(prefix + "_collection_"))
        );
        if (files != null) {
            for (File file : files) {
                file.delete();
            }
        }
    }

    private static void deleteImages(Context context, String prefix) {
        File folder = getFolderWithImages(context);
        File[] files = folder.listFiles(pathname -> pathname.getName().startsWith(prefix));

        if (files == null) {
            return;
        }

        for (File f : files) {
            f.delete();
        }
    }

    static String writeImage(Context context, String imagePrefix, Bitmap bitmap) {
        byte[] randomBytes = new byte[32];
        RANDOM.nextBytes(randomBytes);
        StringBuilder token = new StringBuilder(64);
        for (byte value : randomBytes) {
            token.append(Character.forDigit((value & 0xff) >>> 4, 16));
            token.append(Character.forDigit(value & 0xf, 16));
        }
        String fileName = imagePrefix + "_" + token + ".png";
        if (!IMAGE_NAME.matcher(fileName).matches()) {
            throw new IllegalArgumentException("Invalid widget image name");
        }

        File folder = getFolderWithImages(context);
        if (!folder.isDirectory() && !folder.mkdirs() && !folder.isDirectory()) {
            throw new IllegalStateException("Unable to create widget image directory");
        }
        File file = new File(folder, fileName);
        try (FileOutputStream stream = new FileOutputStream(file)) {
            if (!bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)) {
                throw new IOException("Unable to encode widget image");
            }
        } catch (IOException e) {
            file.delete();
            // Do not attach the exception: it may contain the secret filename.
            throw new IllegalStateException("Unable to write widget image");
        }
        return fileName;
    }

    static Uri getImageUri(Context context, String fileName) {
        String authority = context.getPackageName() + AUTHORITY_SUFFIX;

        return new Uri.Builder()
            .scheme("content")
            .authority(authority)
            .appendPath(fileName)
            .build();
    }

    private static File getFolderWithImages(Context context) {
        return new File(context.getFilesDir(), "widget_images");
    }
}
