import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import {
  WidgetPreview,
  type ImageWidgetResizeMode,
} from 'react-native-android-widget';

import { ImageResizeWidget } from '../../widgets/ImageResizeWidget';

const resizeModes: ImageWidgetResizeMode[] = [
  'cover',
  'contain',
  'stretch',
  'center',
];

export function ImageResizeWidgetPreviewScreen() {
  const [resizeMode, setResizeMode] =
    React.useState<ImageWidgetResizeMode>('cover');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {resizeModes.map((mode) => (
          <View key={mode} style={styles.button}>
            <Button
              title={mode}
              onPress={() => setResizeMode(mode)}
              color={resizeMode === mode ? '#1f6feb' : undefined}
            />
          </View>
        ))}
      </View>

      <WidgetPreview
        renderWidget={({ width, height }) => (
          <ImageResizeWidget
            height={height}
            width={width}
            resizeMode={resizeMode}
          />
        )}
        height={180}
        width={320}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    margin: 4,
  },
});
