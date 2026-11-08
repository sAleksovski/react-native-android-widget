---
sidebar_position: 6
---

# requestPinWidget

`requestPinWidget` opens the Android launcher's native prompt for adding one of
your application's widgets to the home screen. Android supports this flow from
API 26, but launcher support varies.

```tsx
import { requestPinWidget } from 'react-native-android-widget';

const requested = await requestPinWidget({ widgetName: 'Fitness' });

if (!requested) {
  // Show manual instructions for launchers that do not support pin requests.
}
```

The promise resolves to `false` on unsupported platforms and launchers. A
`true` result means the launcher accepted the request and displayed its flow;
the user may still cancel the confirmation dialog.

The promise rejects if `widgetName` does not match a widget provider registered
by the application.

## Checking support up front

Use `isRequestPinWidgetSupported` to decide whether to show an "Add widget"
button at all.

```tsx
import { isRequestPinWidgetSupported } from 'react-native-android-widget';

const supported = await isRequestPinWidgetSupported();
```

## Knowing which widget was added

Pass `callbackData` to be told when the user confirms. The new widget receives
a `WIDGET_CLICK` in your [task handler](./register-widget-task-handler.md),
with `clickAction` set to `"WIDGET_PINNED"` and `callbackData` as
`clickActionData`. This is a separate event from the widget's `WIDGET_ADDED`.

```tsx
await requestPinWidget({
  widgetName: 'Fitness',
  callbackData: { goal: 'steps' },
});
```

```ts
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  if (
    props.widgetAction === 'WIDGET_CLICK' &&
    props.clickAction === 'WIDGET_PINNED'
  ) {
    // props.widgetInfo.widgetId is the widget that was just added
    // props.clickActionData === { goal: 'steps' }
  }
}
```

Launchers that open the widget's configuration screen after the prompt may not
send the callback.
