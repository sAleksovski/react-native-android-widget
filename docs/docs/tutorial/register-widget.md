---
sidebar_position: 4
---

# Register widget

In order to register our widget so that it can be selected from the launchers widget picker, we need to tell the android app some information about the widget.

## Add a widget provider class

Create a new package `widget` in the native android app.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Java" label="Java" default>
Inside it create a class `Hello.java`

```java title="android/app/src/main/java/com/yourapppackage/widget/Hello.java"
package com.yourapppackage.widget;

import com.reactnativeandroidwidget.RNWidgetProvider;

public class Hello extends RNWidgetProvider {
}
```

  </TabItem>
  <TabItem value="Kotlin" label="Kotlin">
Inside it create a class `Hello.kt`

```kotlin title="android/app/src/main/java/com/yourapppackage/widget/Hello.kt"
package com.yourapppackage.widget

import com.reactnativeandroidwidget.RNWidgetProvider

class Hello : RNWidgetProvider() {
}
```

  </TabItem>
</Tabs>

The class **name** will be used to reference our widget.

## Create widget preview image

When the android launcher shows the widget select popup, we can show a screenshot of our widget to give the user an idea what the widget looks like.

Take a screenshot of the widget, and place it inside `android/app/src/main/res/drawable/hello_preview.png`

<pre>android/app/src/main/res/drawable/hello_preview.png</pre>

![Hello Widget Preview](/img/hello_preview.png)

## Add widget description string (Optional)

When the android launcher shows the widget select popup, under the name of the widget it can show an optional description about the widget. If we want to show a description for our widget, we need to add a description string in `strings.xml`

```xml title="android/app/src/main/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">My App Name</string>
    <string name="widget_hello_description" translatable="false">This is my first widget</string>
</resources>
```

## Add a widget provider xml file

Create a new xml file in the resources directory containing the details about the widget.

```xml title="android/app/src/main/res/xml/widgetprovider_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="320dp"
    android:minHeight="120dp"

    android:targetCellWidth="5"
    android:targetCellHeight="2"

    android:updatePeriodMillis="0"

    android:initialLayout="@layout/rn_widget"

    android:previewImage="@drawable/hello_preview"
    android:description="@string/widget_hello_description"

    android:resizeMode="none"

    android:widgetCategory="home_screen">
</appwidget-provider>
```

- `android:updatePeriodMillis` How often, in milliseconds, that this AppWidget wants to be updated. The task handler will be called with `widgetAction = 'UPDATE_WIDGET'`. See the official docs [here](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo.html#updatePeriodMillis)
- `android:previewImage` should reference the preview image we added previously
- `android:description` can be added or not, depending on if we added a description in the previous step

## Add services in AndroidManifest.xml

In order to use the [ListWidget](../primitives/list-widget.md) we need to add a `RNWidgetCollectionService` service.

Under the application section in the manifest, add a new `RNWidgetCollectionService` service. This service will be shared between all widgets, so it needs to be added only once.

```xml title="android/app/src/main/AndroidManifest.xml"
<manifest ...>
  ...
  <application
      android:name=".MainApplication"
      ...>

      <activity
          android:name=".MainActivity"
          ...>
      </activity>

      <service
          android:name="com.reactnativeandroidwidget.RNWidgetCollectionService"
          android:permission="android.permission.BIND_REMOTEVIEWS" />
  </application>
</manifest>
```

## Add widget receiver in AndroidManifest.xml

Finally, we need to add a receiver for our widget, that will receive system events (like widget added, widget resized...)

In `AndroidManifest.xml`, add a receiver for the widget

```xml title="android/app/src/main/AndroidManifest.xml"
<manifest ...>
  ...
  <application
      android:name=".MainApplication"
      ...>

      <activity
          android:name=".MainActivity"
          ...>
      </activity>

      <service
          android:name="com.reactnativeandroidwidget.RNWidgetCollectionService"
          ... />

      <receiver
          android:name=".widget.Hello"
          android:exported="false"
          android:label="My Hello Widget">
          <intent-filter>
              <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
              <action android:name="com.yourapppackage.WIDGET_CLICK" />
          </intent-filter>
          <meta-data
              android:name="android.appwidget.provider"
              android:resource="@xml/widgetprovider_hello" />
      </receiver>
  </application>
</manifest>
```

For the receiver

- `android:name` myst be `.widget.WidgetName` (same as the Java class extending `RNWidgetProvider`)
- `android:label` will be shown in the widget picker

## Add custom fonts used in widgets

If we used a custom font in our widget, we must copy the font file(s) to `android/app/src/main/assets/fonts`. The `fontFamily` style prop will match the file by name.

For example, `android/app/src/main/assets/fonts/Inter.ttf`
