---
sidebar_position: 4
---

# Register widget

In order to register our widget so that it can be selected from the launchers widget picker, we need to tell the android app some information about widget.

## Add a widget provider class

Create a new package `widget` in the native android app. Inside it create a class `Hello.java`

```java title="android/app/src/main/java/com/yourapppackage/widget/Hello.java"
package com.yourapppackage.widget;

import com.reactnativeandroidwidget.RNWidgetProvider;

public class Hello extends RNWidgetProvider {
}
```

The class name will be the **name** with which we will reference our widget.

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
    <string name="widget_hello_description" translatable="false">This is our first widget</string>
</resources>
```

## Add a widget provider xml file

Create a new xml file in the resources directory containing the details about the widget.

```xml title="android/app/src/main/res/xml/widgetprovider_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="320dp"
    android:minHeight="200dp"

    android:updatePeriodMillis="0"

    android:initialLayout="@layout/rn_widget"

    android:previewImage="@drawable/hello_preview"
    android:description="@string/widget_hello_description"`

    android:resizeMode="none"

    android:widgetCategory="home_screen">
</appwidget-provider>
```

- `android:updatePeriodMillis` must be 0
- `android:previewImage` should reference the preview image we added previously
- `android:description` can be added or not, depending on if we added a description in the previous step

## Add widget in AndroidManifest.xml

Then we need to register the new widget in `AndroidManifest.xml`

First, for the library to function we need to add `FOREGROUND_SERVICE` permission to our app. In the permissions add

```xml title="android/app/src/main/AndroidManifest.xml"
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

<!-- TODO Do we need WAKE_LOCK? -->

Under the application section in the manifest, add a new `RNWidgetBackgroundTaskService` service. This service will be shared between all widgets, so it needs to be added only once.

```xml title="android/app/src/main/AndroidManifest.xml"
<manifest ...>
  ...
  <uses-permission ... />
  ...
  <application
      android:name=".MainApplication"
      ...>

      <activity
          android:name=".MainActivity"
          ...>
      </activity>

      <service
          android:name="com.reactnativeandroidwidget.RNWidgetBackgroundTaskService"
          android:enabled="true"
          android:label="RNWidgetBackgroundTaskService" />
  </application>
</manifest>
```

Finally, we need to add a receiver for our widget, that will receive system events (like widget added, widget resized...)

In `AndroidManifest.xml`, add a receiver for the widget

```xml title="android/app/src/main/AndroidManifest.xml"
<manifest ...>
  ...
  <uses-permission ... />
  ...
  <application
      android:name=".MainApplication"
      ...>

      <activity
          android:name=".MainActivity"
          ...>
      </activity>

      <service
          android:name="com.reactnativeandroidwidget.RNWidgetBackgroundTaskService"
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
