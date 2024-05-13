---
sidebar_position: 2
---

# OverlapWidget

Widget container that lays out child widgets one on top of the other.

The child widgets can be positioned using margins.

## Usage

```tsx
import { OverlapWidget, FlexWidget } from 'react-native-android-widget';

export function MyWidget() {
  return (
    <OverlapWidget>
      <FlexWidget style={{ marginTop: 10, marginLeft: 10 }}>...</FlexWidget>
      <FlexWidget style={{ marginTop: 20, marginLeft: 10 }}>...</FlexWidget>
    </OverlapWidget>
  );
}
```

## Props

Check the props in the [Public API](/docs/public-api/interfaces/OverlapWidgetProps) documentation
