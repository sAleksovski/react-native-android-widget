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
