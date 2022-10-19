import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';

interface WidgetPreviewProps {
  renderWidget: (props: { width: number; height: number }) => JSX.Element;
  height: number;
  width: number;
  showBorder?: boolean;
}

export function WidgetPreview({
  renderWidget,
  width,
  height,
  showBorder,
}: WidgetPreviewProps) {
  const [image, setImage] = useState('');
  useEffect(() => {
    async function init() {
      const base64Image = await AndroidWidget.createPreview(
        buildWidgetTree(renderWidget({ width, height })),
        width,
        height
      );

      setImage(base64Image);
    }
    init();
    return () => setImage('');
  }, [renderWidget, width, height]);

  return (
    <View
      style={
        showBorder
          ? // eslint-disable-next-line react-native/no-inline-styles
            {
              height: height + 2,
              width: width + 2,
              borderColor: '#0000ff40',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
          : {}
      }
    >
      {image ? (
        <Image
          source={{
            uri: `data:image/png;base64,${image}`,
          }}
          style={{
            height,
            width,
          }}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}
