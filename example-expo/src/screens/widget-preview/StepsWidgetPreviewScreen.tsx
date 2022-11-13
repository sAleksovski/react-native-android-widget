import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { StepsWidget } from '../../widgets/StepsWidget';

export function StepsWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <StepsWidget />}
        height={322}
        width={201}
        showBorder
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
