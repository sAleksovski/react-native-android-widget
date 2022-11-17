import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { ResizableMusicWidget } from '../../widgets/ResizableMusicWidget';

const WIDGET_SIZES = [
  { width: 202, height: 210 },
  { width: 276, height: 210 },
  { width: 350, height: 210 },

  { width: 202, height: 322 },
  { width: 276, height: 322 },
  { width: 350, height: 322 },

  { width: 202, height: 434 },
  { width: 276, height: 434 },
  { width: 350, height: 434 },
];

export function ResizableMusicWidgetPreviewScreen() {
  const [sizeIndex, setSizeIndex] = React.useState(0);
  const [songId, setSongId] = React.useState(0);
  const [status, setStatus] = React.useState<'playing' | 'stopped'>('playing');

  const size = WIDGET_SIZES[sizeIndex % WIDGET_SIZES.length];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Resize" onPress={() => setSizeIndex(sizeIndex + 1)} />
      </View>
      <WidgetPreview
        renderWidget={({ width, height }) => (
          <ResizableMusicWidget
            width={width}
            height={height}
            songId={songId}
            status={status}
          />
        )}
        onClick={({ clickAction, clickActionData }) => {
          setStatus(clickAction === 'pause' ? 'stopped' : 'playing');
          setSongId((clickActionData?.songId as number) ?? 0);
        }}
        height={size!.height}
        width={size!.width}
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
