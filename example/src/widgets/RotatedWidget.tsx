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
        borderRadius: 80,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <TextWidget
        style={{
          // flex: 1,
          fontSize: 96,
          color: '#908E8D',
          rotation: -90,
        }}
        text="Wednesday"
      />
    </FlexWidget>
  );
}
