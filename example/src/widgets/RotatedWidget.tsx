import React from 'react';
import { LinearLayoutWidget, TextWidget } from 'react-native-android-widget';

export function RotatedWidget() {
  return (
    <LinearLayoutWidget
      gravity={LinearLayoutWidget.Gravity.CENTER}
      orientation="VERTICAL"
      backgroundColor="#FDF1FE"
      height="match_parent"
      width="match_parent"
      radius={80}
      weight={1}
    >
      <TextWidget
        weight={1}
        rotation={-90}
        fontSize={96}
        text="Wednesday"
        color="#907E8D"
      />
    </LinearLayoutWidget>
  );
}
