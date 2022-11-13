import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { ShopifyWidget } from '../../widgets/ShopifyWidget';

export function ShopifyWidgetPreviewScreen() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <ShopifyWidget />}
        height={400}
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
