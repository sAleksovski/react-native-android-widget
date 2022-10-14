/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function RotatedWidget() {
  return (
    <FlexWidget
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF1FE',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 32,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <TextWidget
        style={{
          fontSize: 36,
          color: '#908E8D',
          rotation: -90,
        }}
        text="Wednesday"
      />
    </FlexWidget>
  );
}
