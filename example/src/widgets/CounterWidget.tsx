/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

interface CounterWidgetProps {
  count: number;
}

export function CounterWidget({ count = 0 }: CounterWidgetProps) {
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
        flexGap: 48,
      }}
    >
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        clickAction="DECREMENT"
        clickActionData={{ value: count }}
      >
        <TextWidget style={{ fontSize: 48 }} text="-" />
      </FlexWidget>
      <TextWidget style={{ fontSize: 48 }} text={`${count}`} />
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        clickAction="INCREMENT"
        clickActionData={{ value: count }}
      >
        <TextWidget style={{ fontSize: 48 }} text="+" />
      </FlexWidget>
    </FlexWidget>
  );
}
