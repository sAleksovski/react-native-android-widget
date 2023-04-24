---
sidebar_position: 1
---

# Widget Design

This library provides a few primitives that we can use to create widgets.

- [FlexWidget](../primitives/flex-widget.md)
- [OverlapWidget](../primitives//overlap-widget.md)
- [ListWidget](../primitives/list-widget.md)
- [TextWidget](../primitives/text-widget.md)
- [ImageWidget](../primitives/image-widget.md)
- [IconWidget](../primitives//icon-widget.md)
- [SvgWidget](../primitives/svg-widget.md)

You can read more about them and their props in their respective pages.

:::danger Hooks

Widgets **must not** use any hooks. They **must** be functions that return some of the primitives.

We can create custom components, but at the end they must use only the primitives, not `View`, `Text`, or any other React Native component.

We can also use conditions, for/map, standard jsx. They cannot be async.

:::

We'll start with a Basic widget that says "Hello".

```jsx title="HelloWidget.tsx"
import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function HelloWidget() {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
    >
      <TextWidget
        text="Hello"
        style={{
          fontSize: 32,
          fontFamily: 'Inter',
          color: '#000000',
        }}
      />
    </FlexWidget>
  );
}
```
