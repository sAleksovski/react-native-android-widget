'use no memo';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  ImageWidget,
  OverlapWidget,
  TextWidget,
  type ImageWidgetResizeMode,
} from 'react-native-android-widget';

interface ImageResizeWidgetProps {
  height?: number;
  width?: number;
  resizeMode?: ImageWidgetResizeMode;
}

export function ImageResizeWidget({
  height = 180,
  width = 320,
  resizeMode = 'cover',
}: ImageResizeWidgetProps) {
  return (
    <OverlapWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <ImageWidget
        image={require('../../assets/music/sinatra.jpg')}
        imageHeight={320}
        imageWidth={320}
        resizeMode={resizeMode}
        style={{
          height,
          width,
        }}
      />

      <FlexWidget
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 'match_parent',
          width: 'match_parent',
          padding: 20,
        }}
      >
        <TextWidget
          text="Image Resize"
          style={{
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        />
        <TextWidget
          text={resizeMode}
          style={{
            color: '#ffffff',
            fontSize: 14,
            marginTop: 6,
          }}
        />
      </FlexWidget>
    </OverlapWidget>
  );
}
