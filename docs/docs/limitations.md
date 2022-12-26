---
sidebar_position: 6
sidebar_label: Limitations
---

# Limitations

There are some limitations to this library.

In React Native we can call JS code from the native side using [HeadlessJS](https://reactnative.dev/docs/headless-js-android).

HeadlessJS works by starting a `Foreground` service in Android. But foreground services have some [limitations](https://developer.android.com/guide/components/foreground-services#background-start-restrictions) on Android 12+, and cannot be started when the app is in the background.

So, when adding a widget to the home screen, it will be added with a message `Click to update widget`. Clicking the widget will call the JS code and you can then set the widget view.

Resizing a widget works the same, with the `Click to update widget` message.

Clicking on a clickable area of the widget works as expected, without any limitations.
