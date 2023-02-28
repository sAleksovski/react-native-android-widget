---
sidebar_position: 3
---

# requestWidgetUpdate

`react-native-android-widget` exports a `requestWidgetUpdate` function that can be used to request a widget update while the application is open (or with some background task).

Since the user can add the same widget multiple times, with different sizes, `requestWidgetUpdate` will cycle all widgets and allow us to redraw them.

## Usage

Lets assume we have a `CounterWidget` widget that shows a single number, which it gets as a prop.

If the user has added a `CounterWidget` to the home screen, then when the `CounterWidgetScreen` is opened we can update the number shown on the widget on the home screen using `requestWidgetUpdate`.

If the user has added the `CounterWidget` multiple times, `renderWidget` will be called multiple times, once for each widget.

If the user has not added the `CounterWidget` on the Android home screen, the optional callback `widgetNotFound` will be called.

### Example

```jsx title="CounterScreen.tsx"
import * as React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { requestWidgetUpdate } from 'react-native-android-widget';

import { CounterWidget } from './CounterWidget';

export function CounterScreen() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    requestWidgetUpdate({
      widgetName: 'Counter',
      renderWidget: () => <CounterWidget count={count} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      }
    });
  }, [count]);

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### Demo

Check the full code in the [Counter Screen](https://github.com/sAleksovski/react-native-android-widget/blob/master/example/src/screens/CounterScreen.tsx)

## Types

Check the types in the [Public API](/docs/public-api#requestwidgetupdate) documentation

The `requestWidgetUpdate` function should be called with the properties described with [RequestWidgetUpdateProps](/docs/public-api/interfaces/RequestWidgetUpdateProps)
