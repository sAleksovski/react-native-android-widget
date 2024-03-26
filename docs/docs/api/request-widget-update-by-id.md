---
sidebar_position: 4
---

# requestWidgetUpdateById

`react-native-android-widget` exports a `requestWidgetUpdateById` function that can be used to request a widget update while the application is open (or with some background task) for a single widget with known id.

This is an alternative to [`requestWidgetUpdate`](./request-widget-update.md) and should be used in special cases when the widget id is known, and you don't want to update the other widgets with the same name.

## Usage

Lets assume we have a `CounterWidget` widget that shows a single number, which it gets as a prop.

If the user has added the `CounterWidget` multiple times, `requestWidgetUpdateById` will update only one widget which corresponds with the given `widgetId`.

If a widget with the given `widgetId` does not exist, the optional callback `widgetNotFound` will be called.

### Example

```jsx title="CounterScreen.tsx"
import * as React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { requestWidgetUpdateById } from 'react-native-android-widget';

import { CounterWidget } from './CounterWidget';

export function CounterScreen() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    requestWidgetUpdateById({
      widgetName: 'Counter',
      widgetId: 1,
      renderWidget: () => <CounterWidget count={count} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      },
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

## Types

Check the types in the [Public API](/docs/public-api#requestwidgetupdatebyid) documentation

The `requestWidgetUpdate` function should be called with the properties described with [RequestWidgetUpdateByIdProps](/docs/public-api/interfaces/RequestWidgetUpdateByIdProps)
