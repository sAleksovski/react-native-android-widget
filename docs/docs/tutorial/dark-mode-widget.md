---
sidebar_position: 7
---

# Dark Mode widget (Optional)

This library supports using different colors for the widget when the system is in dark mode.
It lets you provide separate widget UIs for light and dark system themes so your widget looks correct in both modes.

## How it works

When updating or rendering a widget you provide an object with `light` and/or `dark` React elements. The host system will choose the appropriate one based on the current theme. If only `light` is provided, it will be used for both modes as a fallback.

## registerWidgetTaskHandler

In a widget task handler call `props.renderWidget` and pass `light` and `dark` render trees.

```tsx title="widget-task-handler.tsx"
import React from 'react';
import { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { Widget } from '../../widgets/Widget';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATED':
      // props.renderWidget(<Widget />);
      props.renderWidget({
        light: <Widget theme="light" />,
        dark: <Widget theme="dark" />,
      });
      break;
      // handle other actions
  }
}
```

Provide both variants when colors or images need swapping for readability.

## requestWidgetUpdate

You can also request updates from anywhere in your app. The `renderWidget` callback should return the same `light`/`dark` object.

```tsx title="SomeComponent.tsx"
import React from 'react';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { Widget } from '../widgets/Widget';

function onSomeEvent() {
  requestWidgetUpdate({
    widgetName: 'Counter',
    renderWidget: () => ({
      light: <Widget theme="light" />,
      dark: <Widget theme="dark" />,
    }),
  });
}
```

## Limitations

The light and dark variants must match in structure and interactivity — they should expose the same buttons, lists, and touch targets in the same positions. Only visual styling (colors, images, icons) should differ.

- Structure: Keep layouts and element placement identical between variants so touch targets and spacing stay consistent.
- Images and assets: If you swap images between themes, ensure they use the same intrinsic size and aspect ratio so the layout and touch regions remain unchanged.
- Click handling: The native host uses the light variant for wiring click actions; the dark variant is used only for visual appearance. Make sure interactive elements in the dark variant mirror the light variant so interactions behave correctly.
- Fallback: If you omit the `dark` render tree, the `light` variant will be shown in dark mode as a fallback.
