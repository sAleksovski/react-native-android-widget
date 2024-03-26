---
sidebar_position: 5
---

# registerWidgetConfigurationScreen

`react-native-android-widget` exports a `registerWidgetConfigurationScreen` function that can be used to register a widget configuration screen. When a configurable widget is added on the home screen, or reconfigured once on the home screen, the registered configuration screen will be opened.

The user can cancel the configuration (by calling `setResult('cancel')`).
If the widget was just added it will be removed from the home screen, otherwise just the conifuguration will be canceled and the widget will remain as is.

If the user changes some configuration and wants to add the widget, we will need to:

- Call `renderWidget` to update the widget with the new configuration
- Call `setResult('ok')` to indicate that the configuration is done and the screen can be closed

## Multiple configurable widgets

If we have multiple configurable widgets, they will share the same configuration screen,
but we can check which widget is configured by the `widgetInfo` prop and show different UI depending on the widget.

## Usage

First, create a widget configuration component, containing:

```js title="WidgetConfigurationScreen.tsx"
import React from 'react';
import type { WidgetConfigurationScreenProps } from 'react-native-android-widget';
import { ConfigurableWidget } from './ConfigurableWidget';

export function WidgetConfigurationScreen({
  widgetInfo,
  setResult,
  renderWidget,
}: WidgetConfigurationScreenProps) {
  // Here we can define the UI for configuring the widget
}
```

## Register the widget configuration screen

In the main `index.js` (or `index.ts`, `index.tsx`) file for our app, when we register the main component, register the widget configuration screen.

```js title="index.ts"
import { AppRegistry } from 'react-native';
import {
  registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
} from 'react-native-android-widget';
import { name as appName } from './app.json';
import App from './App';
import { widgetTaskHandler } from './widget-task-handler';
import { WidgetConfigurationScreen } from './WidgetConfigurationScreen';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);
```

## Register widget task handler (Expo)

If we are using Expo, there is no `index.js` (or `index.ts`, `index.tsx`), but we can create it.

First, update `package.json` main field to point to `index.ts` (or `.js`) instead of `node_modules/expo/AppEntry.js`

```js title="package.json"
{
  "name": "my-expo-app",
  "main": "index.ts",
  ...
}
```

Create the file, using `node_modules/expo/AppEntry.js` as a template.
Then import `widgetTaskHandler` and register it.

```js title="index.ts"
import { registerRootComponent } from 'expo';
import {
  registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
} from 'react-native-android-widget';

import App from './App';
import { widgetTaskHandler } from './widget-task-handler';
import { WidgetConfigurationScreen } from './WidgetConfigurationScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);
```

## Types

Check the types in the [Public API](/docs/public-api#registerwidgetconfigurationscreen) documentation

The widget configuration screen has some properties, described with [WidgetConfigurationScreenProps](/docs/public-api/interfaces/WidgetConfigurationScreenProps)
