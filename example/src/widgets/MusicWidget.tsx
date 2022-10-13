/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  ImageWidget,
  TextWidget,
} from 'react-native-android-widget';

export function MusicWidget() {
  return (
    <FlexWidget
      style={{
        alignItems: 'center',
        backgroundColor: '#FFF4F3',
        padding: 24,
        paddingTop: 48,
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 80,
      }}
    >
      <FlexWidget
        style={{
          alignItems: 'center',
          height: 240,
          width: 240,
          marginBottom: 48,
        }}
      >
        <ImageWidget
          image={require('../../assets/james-infinity.jpg')}
          imageWidth={240}
          imageHeight={240}
          radius={120}
        />
      </FlexWidget>

      <TextWidget
        style={{ fontSize: 24, color: '#000000', marginBottom: 16 }}
        text="Infinity"
      />
      <TextWidget
        style={{ fontSize: 16, color: '#857674', marginBottom: 128 }}
        text="Jaymes Young"
      />

      <FlexWidget
        style={{
          borderRadius: 56,
          paddingHorizontal: 32,
          backgroundColor: '#E4BDBD',
          flexDirection: 'row',
          alignItems: 'center',
          height: 'match_parent',
          width: 'match_parent',
        }}
      >
        <FlexWidget
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <IconWidget font="material" size={36} icon="skip_previous" />
        </FlexWidget>
        <FlexWidget
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <FlexWidget
            clickAction="play"
            style={{
              height: 128,
              width: 128,
              borderRadius: 64,
              backgroundColor: '#BA666B',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconWidget font="material" size={36} icon="play_arrow" />
          </FlexWidget>
        </FlexWidget>
        <FlexWidget
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <IconWidget font="material" size={36} icon="skip_next" />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
