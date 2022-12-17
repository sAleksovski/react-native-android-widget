---
sidebar_position: 2
---

# Widget Preview

Designing a widget can be cumbersome if you have to add the widget to a homescreen everytime you make a change.

`react-native-android-widget` exports a `WidgetPreview` component that can be used to preview a widget in any screen in our React Native application.

```jsx title="HelloWidgetPreviewScreen.tsx"
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { HelloWidget } from './HelloWidget';

export function HelloWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <HelloWidget />}
        width={320}
        height={200}
      />
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

![Widget Preview](/img//HelloWidgetPreview.png)
