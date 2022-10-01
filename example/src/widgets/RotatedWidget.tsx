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
      }}
    >
      <TextWidget
        weight={1}
        rotation={-90}
        fontSize={96}
        text="Wednesday"
        color="#907E8D"
      />
    </FlexWidget>
  );
}
