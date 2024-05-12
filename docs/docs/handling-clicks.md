---
sidebar_position: 5
sidebar_label: Handling Clicks
---

# Handling Clicks

All widget [primitives](./primitives/index) can be clicked, and execute some code.

To add a click action to `FlexWidget`, we need to pass a `clickAction` prop, and an optional `clickActionData` prop. `clickActionData` can be used to add additional data that we need.

:::warning

`clickAction` only works on Android 7 and up

:::

```tsx
import { FlexWidget } from 'react-native-android-widget';

export function MyWidget() {
  return (
    <FlexWidget clickAction="MY_ACTION" clickActionData={{ id: 0 }}>
      ...
    </FlexWidget>
  );
}
```

Inside our [registerWidgetTaskHandler](./api/register-widget-task-handler.md) handler we can check for the `widgetAction`, and if the `widgetAction` is `WIDGET_CLICK`, `props.clickAction` will be the `clickAction` we set to the View.

```ts
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      // ...;
      break;

    case 'WIDGET_UPDATE':
      // ...;
      break;

    case 'WIDGET_RESIZED':
      // ...;
      break;

    case 'WIDGET_DELETED':
      // ...;
      break;

    case 'WIDGET_CLICK':
      if (props.clickAction === 'MY_ACTION') {
        // Do stuff when primitive with `clickAction="MY_ACTION"` is clicked
        // props.clickActionData === { id: 0 }
      }
      break;

    default:
      break;
  }
}
```

## Special cases

There are a few special values for `clickAction` that will not emit the action,
but will execute the action in the background.

Those are:

- `"OPEN_APP"`

  This `clickAction` does not required `clickActionData`, and if set on a section of
  the widget it will open the application when clicked

- `"OPEN_URI"`

  This `clickAction` requires a `clickActionData` that contains `{ uri: 'some-uri' }`.
  The `uri` can be a web uri (`https://google.com`), or an app deep link (`androidwidgetexample://deep-link`)

  For the deep link to open a screen in the app deep linking must be set up using:

  - [Linking](https://reactnative.dev/docs/linking)
  - [Expo Linking](https://docs.expo.dev/guides/linking/)
  - [Expo Router](https://expo.github.io/router/docs/features/linking)

## Demo

All click action types are presend in the [Click Demo](./demo.md#click-demo-widget-preview) widget in the demo app.
