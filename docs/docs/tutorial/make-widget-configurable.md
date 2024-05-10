---
sidebar_position: 6
---

# Make Widget configurable (Optional)

In order to some of the widgets configurable, we need to create a widget configuration activity.

:::info Note
`WIDGET_ADDED` event will be fired as soon as the widget is added on the home screen, regardless of whether it is configurable or not. We will need to have a fallback configuration.

If the configuration is cancelled when adding the widget, `WIDGET_DELETED` will be fired.
:::

## Add a widget configuration activity class

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Java" label="Java" default>

```java title="android/app/src/main/java/com/yourapppackage/WidgetConfigurationActivity.java"
package com.yourapppackage;

import com.reactnativeandroidwidget.RNWidgetConfigurationActivity;

public class WidgetConfigurationActivity extends RNWidgetConfigurationActivity {
}
```

  </TabItem>
  <TabItem value="Kotlin" label="Kotlin">

```kotlin title="android/app/src/main/java/com/yourapppackage/WidgetConfigurationActivity.kt"
package com.yourapppackage

import com.reactnativeandroidwidget.RNWidgetConfigurationActivity

class WidgetConfigurationActivity : RNWidgetConfigurationActivity() {
}
```

  </TabItem>
</Tabs>

## Update the widget provider xml file for the widget

In the widget provider we created, add `configure` and `widgetFeatures` properties.

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


    android:configure="com.yourapppackage.WidgetConfigurationActivity"
    android:widgetFeatures="reconfigurable"


    android:widgetCategory="home_screen">
</appwidget-provider>
```

- `android:configure` should reference the configuration activity we created
- `android:widgetFeatures` can be `reconfigurable` or `reconfigurable|configuration_optional`
  - `reconfigurable` means that the widget will be configurable and the configuration activity will open as soon as the widget is added to the home screen. Its configuration can also be changed later by long-pressing the widget.
  - `reconfigurable|configuration_optional` means that the widget configuration can only be changed by long-pressing the widget, and the configuration activity will not open when the widget is added

## Add widget configuration activity in AndroidManifest.xml

Finally, we need to add the widget configuration activity in `AndroidManifest.xml`

In `AndroidManifest.xml`, add a activity

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

      <activity android:name=".WidgetConfigurationActivity"
          android:exported="true">
          <intent-filter>
              <action android:name="android.appwidget.action.APPWIDGET_CONFIGURE"/>
          </intent-filter>
      </activity>
  </application>
</manifest>
```

For the activity

- `android:name` myst be `.WidgetConfigurationActivity` (same as the Java class extending `RNWidgetConfigurationActivity`)

## Make Widget configurable in Expo using config plugin

If using Expo, the configuration is much simpler. We will only need to set the `widgetFeatures` property in the config plugin to `reconfigurable` or `reconfigurable|configuration_optional`.

```js title="app.config.ts"
import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
  widgets: [
    {
      name: 'Hello',
      label: 'My Hello Widget',
      minWidth: '320dp',
      minHeight: '120dp',
      targetCellWidth: 5,
      targetCellHeight: 2,
      description: 'This is my first widget',
      previewImage: './assets/widget-preview/hello.png',
      updatePeriodMillis: 1800000,

      // This
      widgetFeatures: 'reconfigurable',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Expo App Name',
  plugins: [['react-native-android-widget', widgetConfig]],
});
```

## Create the Widget Configuration Screen

For the UI of the Widget Configuration Screen in both bare React Native and Expo, see the [`registerWidgetConfigurationScreen`](../api/register-widget-configuration-screen.md)
