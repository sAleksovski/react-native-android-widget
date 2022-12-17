import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { RotatedWidget } from '../../widgets/RotatedWidget';

export function RotatedWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <RotatedWidget />}
        height={322}
        width={201}
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
