# react-native-android-widget-example

## Changes

- Add icon font files in `android/app/src/main/assets/fonts`
- Extend `com.reactnativeandroidwidget.WidgetProvider` for every widget
- Add `appwidget-provider` xml in `android/app/src/main/res/xml` for every widget
- Add permissions to `AndroidManifest.xml`

```
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

- Add `BackgroundTask` service to `AndroidManifest.xml`

```
<service
  android:name="com.reactnativeandroidwidget.BackgroundTask"
  android:enabled="true"
  android:label="BackgroundAdd" />
```

- Register every widget in `AndroidManifest.xml`

```
<receiver
  android:name=".WidgetProviderFitness"
  android:exported="false"
  android:label="Fitness">
  <intent-filter>
    <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    <action android:name="com.reactnativeandroidwidget.WIDGET_CLICK" />
  </intent-filter>
  <meta-data
    android:name="android.appwidget.provider"
    android:resource="@xml/widgetprovider_fitness" />
</receiver>
```
