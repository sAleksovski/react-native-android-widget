---
sidebar_position: 3
---

# Register task handler

We designed and previewed our widget. Now we need to register a _task handler_ that will handle the logic of adding/updating a widget to the home screen, as well as handle widget clicks.

## Create task handler function

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
      // Not needed for now
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}
```

We use `nameToWidget` to map from the **name** to the component defining the widget (useful if we have multiple widgets). There are other ways to achieve this.

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

## Next steps

We designed our widget, saw the preview, and registered a handler that will handle adding it to the home screen.

We still need to tell the application that there is a widget called `Hello`.

Continue with:

- [Register widget](./register-widget) if you are using React Native bare
- [Register widget in Expo](./register-widget-expo) if you are using Expo
