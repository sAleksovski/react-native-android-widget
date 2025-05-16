---
sidebar_position: 4
sidebar_label: Update Widget
---

# Update Widget

There are three ways to update a widget once it is added on the home screen.

## updatePeriodMillis

Schedule updates using `android:updatePeriodMillis` (or `updatePeriodMillis` with Expo)

When using this option, the `widgetTaskHandler` function will be called with `widgetAction = 'WIDGET_UPDATE'`, and you can use it to update the widget.

```js title="widget-task-handler.tsx"
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {

  switch (props.widgetAction) {
    ...

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget />);
      break;

    ...
  }
}
```

:::info Note
Updates requested with updatePeriodMillis will not be delivered more than once every 30 minutes.
:::

More details about `updatePeriodMillis` on the [official documentation](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo.html#updatePeriodMillis).

## requestWidgetUpdate

You can call [`requestWidgetUpdate`](./api/request-widget-update.md) any time when your app is open as a result of some user action, and request a widget update.

## Native RNWidgetJsCommunication#requestWidgetUpdate

You can request a widget update from native code (using BroadcastReceiver, AlarmManager, received push notification...).

You can call `com.reactnativeandroidwidget.RNWidgetJsCommunication#requestWidgetUpdate` static method with a context and the name of the widget you want to update, and it will call the javascript `widgetTaskHandler` function with `widgetAction = 'WIDGET_UPDATE'`
