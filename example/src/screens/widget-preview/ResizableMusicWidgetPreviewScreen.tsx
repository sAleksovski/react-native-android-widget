import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { ResizableMusicWidget } from '../../widgets/ResizableMusicWidget';

const PIXEL_5_SCALE = 2.75;

const WIDGET_SIZES = [
  { width: 558, height: 575 },
  { width: 759, height: 575 },
  { width: 960, height: 575 },

  { width: 558, height: 886 },
  { width: 759, height: 886 },
  { width: 960, height: 886 },

  { width: 558, height: 1194 },
  { width: 759, height: 1194 },
  { width: 960, height: 1194 },
];

export function ResizableMusicWidgetPreviewScreen() {
  const [sizeIndex, setSizeIndex] = React.useState(0);

  const size = WIDGET_SIZES[sizeIndex % WIDGET_SIZES.length];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Resize" onPress={() => setSizeIndex(sizeIndex + 1)} />
      </View>
      <WidgetPreview
        renderWidget={({ width, height }) => (
          <ResizableMusicWidget
            width={Math.round(width * PIXEL_5_SCALE)}
            height={Math.round(height * PIXEL_5_SCALE)}
          />
        )}
        height={Math.round(size!.height / PIXEL_5_SCALE)}
        width={Math.round(size!.width / PIXEL_5_SCALE)}
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
  buttonContainer: {
    marginBottom: 16,
  },
});
