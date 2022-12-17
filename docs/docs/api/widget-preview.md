---
sidebar_position: 1
---

# WidgetPreview

`react-native-android-widget` exports a `WidgetPreview` component that can be used to preview a widget in any screen in our React Native application.

## Usage

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

## Types

Check the types in the [Public API](public-api/interfaces/WidgetPreviewProps.md) documentation
