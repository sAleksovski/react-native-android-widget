---
sidebar_position: 2
---

# registerWidgetTaskHandler

`react-native-android-widget` exports a `registerWidgetTaskHandler` function that can be used to register a task handler that can handle widget click events, widget resize events, widget added events...

## Usage

First, create a task handler function, containing:

```js title="widget-task-handler.tsx"
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { HelloWidget } from './HelloWidget';

const nameToWidget = {
  // Hello will be the **name** with which we will reference our widget.
  Hello: HelloWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_DELETED':
      // Handle widget deleted (remove widget data if you stored it somewhere)
      break;

    case 'WIDGET_CLICK':
      if (props.clickAction === 'play') {
        props.renderWidget(<Widget status="playing" />);
      } else {
        props.renderWidget(<Widget status="stopped" />);
      }
      break;

    default:
      break;
  }
}
```

We use `nameToWidget` to map from the **name** to the component defining the widget (useful if we have multiple widgets). There are other ways to achieve this.

This file is also where you can execute regular JS code, include asynchronous operations, such as fetching data from API:

```js title="widget-task-handler.tsx"
// ...
case 'WIDGET_CLICK':
  if (props.clickAction === 'refresh') {
    const data = await fetch('https://example.com/api').then((response) => response.json());
    props.renderWidget(<Widget title={data.title} />);
  }
  break;
```

## Register widget task handler

In the main `index.js` (or `index.ts`, `index.tsx`) file for our app, when we register the main component, register the widget task handler.

```js title="index.ts"
import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { name as appName } from './app.json';
import App from './App';
import { widgetTaskHandler } from './widget-task-handler';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
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
import { registerWidgetTaskHandler } from 'react-native-android-widget';

import App from './App';
import { widgetTaskHandler } from './widget-task-handler';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);
```

## Types

Check the types in the [Public API](/docs/public-api#registerwidgettaskhandler) documentation

The widget task handler will be called with some properties, described with [WidgetTaskHandlerProps](/docs/public-api/interfaces/WidgetTaskHandlerProps)
