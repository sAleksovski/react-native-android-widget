import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';
import { ClickDemoWidget } from '../../widgets/ClickDemoWidget';

export function ClickDemoWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <ClickDemoWidget />}
        height={209}
        width={320}
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
