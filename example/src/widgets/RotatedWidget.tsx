/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

const WEEKDAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function RotatedWidget() {
  return (
    <FlexWidget
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 32,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <TextWidget
        style={{
          fontFamily: 'Ndot-55',
          fontSize: 42,
          color: '#000000',
          rotation: -90,
        }}
        text={WEEKDAY[new Date().getDay()] ?? ''}
      />
    </FlexWidget>
  );
}
