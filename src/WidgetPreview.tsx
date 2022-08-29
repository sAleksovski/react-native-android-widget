import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { AndroidWidget } from './AndroidWidget';

export function WidgetPreview({ tree, width, height, widgetName }: any) {
  const [image, setImage] = useState('');
  useEffect(() => {
    async function init() {
      const base64Image = await AndroidWidget.createPreview(
        tree,
        widgetName,
        width,
        height
      );

      setImage(base64Image);
    }
    init();
  }, [tree, widgetName, width, height]);

  return (
    <View
      style={{
        height: height + 2,
        width: width + 2,
        borderColor: '#0000ff40',
        borderWidth: 1,
      }}
    >
      <Image
        source={{
          uri: `data:image/png;base64,${image}`,
        }}
        style={{
          height,
          width,
        }}
      />
    </View>
  );
}
