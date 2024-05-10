---
sidebar_position: 5
---

# Register widget in Expo

If we are using Expo for our app, we might not have access to the native android directory, so we cannot create/update the required files.

Expo provides [Config Plugins](https://docs.expo.dev/guides/config-plugins/) that can be used to configure the native android project.

`react-native-android-widget` exports a config plugin.

## Create widget preview image

When the android launcher shows the widget select popup, we can show a screenshot of our widget to give the user an idea what the widget looks like.

Take a screenshot of the widget, and place it inside `assets/widget-preview/hello.png`

<pre>assets/widget-preview/hello.png</pre>

![Hello Widget Preview](/img/hello_preview.png)

## Add custom fonts used in widgets

If we need custom fonts for our widgets, we can add them in the assets directory

For example, `assets/fonts/Inter.ttf`

## Use config plugin in [app.(json|config.js|config.ts)](https://docs.expo.dev/workflow/configuration/)

In this example we are using `app.config.ts` but the changes are similar for all configuration types.

```js title="app.config.ts"
import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
  // Paths to all custom fonts used in all widgets
  fonts: ['./assets/fonts/Inter.ttf'],
  widgets: [
    {
      name: 'Hello', // This name will be the **name** with which we will reference our widget.
      label: 'My Hello Widget', // Label shown in the widget picker
      minWidth: '320dp',
      minHeight: '120dp',
      // This means the widget's default size is 5x2 cells, as specified by the targetCellWidth and targetCellHeight attributes.
      // Or 320×120dp, as specified by minWidth and minHeight for devices running Android 11 or lower.
      // If defined, targetCellWidth,targetCellHeight attributes are used instead of minWidth or minHeight.
      targetCellWidth: 5,
      targetCellHeight: 2,
      description: 'This is my first widget', // Description shown in the widget picker
      previewImage: './assets/widget-preview/hello.png', // Path to widget preview image

      // How often, in milliseconds, that this AppWidget wants to be updated.
      // The task handler will be called with widgetAction = 'UPDATE_WIDGET'.
      // Default is 0 (no automatic updates)
      // Minimum is 1800000 (30 minutes == 30 * 60 * 1000).
      updatePeriodMillis: 1800000,
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Expo App Name',
  plugins: [['react-native-android-widget', widgetConfig]],
});
```

## Build Dev Client

Build an [Expo Dev Client](https://docs.expo.dev/development/create-development-builds/) that will include `react-native-android-widget` and the new widget
