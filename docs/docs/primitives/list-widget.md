---
sidebar_position: 3
---

# ListWidget

Widget container that shows a scrollable list that can contain multiple items.

:::danger List item height

Each list item must have a height of equal or less than the height of the `ListWidget`.

:::

## Usage

```tsx
import {
  ListWidget,
  FlexWidget,
  TextWidget,
} from 'react-native-android-widget';

export function MyWidget() {
  return (
    <ListWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1F3529',
      }}
    >
      {Array.from({ length: 15 }).map((_, i) => (
        <FlexWidget
          key={i}
          style={{
            width: 'match_parent',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 8,
          }}
          clickAction="OPEN_URI"
          clickActionData={{
            uri: `androidwidgetexample://list/list-demo/${i + 1}`,
          }}
        >
          <TextWidget text={`React Native Android Widget Release 0.${i + 1}`} />
        </FlexWidget>
      ))}
    </ListWidget>
  );
}
```

## Props

Check the props in the [Public API](/docs/public-api/interfaces/ListWidgetProps) documentation

## Example

You can see an example widget using `ListWidget` in the examples folder in the repo.

[ListDemoWidget](https://github.com/sAleksovski/react-native-android-widget/blob/master/example/src/widgets/ListDemoWidget.tsx)

![List Widget Preview](../../../example-expo/assets/widget-preview/list.png)
