---
sidebar_position: 4
sidebar_label: Update Widget
---

# Update Widget

Scheduling a widget update using `android:updatePeriodMillis` is out of scope for this library.

There are a couple of community libraries that can be used to schedule a background task, within which you can use [`requestWidgetUpdate`](./api/request-widget-update.md) to update a widget.

Example:

- [`expo-background-fetch`](https://docs.expo.dev/versions/latest/sdk/background-fetch/)
- [`react-native-background-actions`](https://github.com/Rapsssito/react-native-background-actions)
- [`HeadlessJS`](https://reactnative.dev/docs/headless-js-android)
