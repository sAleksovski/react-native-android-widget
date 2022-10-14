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
        padding: 8,
        paddingTop: 16,
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 32,
      }}
    >
      <FlexWidget
        style={{
          alignItems: 'center',
          height: 88,
          width: 88,
          marginBottom: 18,
        }}
      >
        <ImageWidget
          image={require('../../assets/james-infinity.jpg')}
          imageWidth={88}
          imageHeight={88}
          radius={44}
        />
      </FlexWidget>

      <TextWidget
        style={{ fontSize: 24, color: '#000000', marginBottom: 6 }}
        text="Infinity"
      />
      <TextWidget
        style={{ fontSize: 16, color: '#857674', marginBottom: 48 }}
        text="Jaymes Young"
      />

      <FlexWidget
        style={{
          borderRadius: 20,
          paddingHorizontal: 12,
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
              height: 48,
              width: 48,
              borderRadius: 24,
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
