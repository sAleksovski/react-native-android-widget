import React from 'react';
import {
  IconWidget,
  ImageWidget,
  LinearLayoutWidget,
  TextWidget,
} from 'react-native-android-widget';

export function MusicWidget() {
  return (
    <LinearLayoutWidget
      gravity={LinearLayoutWidget.Gravity.CENTER_HORIZONTAL}
      orientation="VERTICAL"
      backgroundColor="#FFF4F3"
      padding={24}
      paddingTop={48}
      height="match_parent"
      width="match_parent"
      radius={80}
    >
      <LinearLayoutWidget
        gravity={LinearLayoutWidget.Gravity.CENTER_HORIZONTAL}
        orientation="VERTICAL"
        height={240}
        width={240}
        marginBottom={48}
      >
        <ImageWidget
          image={require('../../assets/james-infinity.jpg')}
          imageWidth={240}
          imageHeight={240}
          radius={120}
        />
      </LinearLayoutWidget>

      <TextWidget
        fontSize={64}
        text="Infinity"
        color="#000000"
        marginBottom={16}
      />
      <TextWidget
        fontSize={40}
        text="Jaymes Young"
        color="#857674"
        marginBottom={128}
      />

      <LinearLayoutWidget
        radius={56}
        paddingHorizontal={32}
        backgroundColor="#E4BDBD"
        gravity={LinearLayoutWidget.Gravity.CENTER_VERTICAL}
        orientation="HORIZONTAL"
        height="match_parent"
        width="match_parent"
      >
        <LinearLayoutWidget
          weight={1}
          gravity={LinearLayoutWidget.Gravity.CENTER}
        >
          <IconWidget font="material" size={96} icon="skip_previous" />
        </LinearLayoutWidget>
        <LinearLayoutWidget
          weight={1}
          gravity={LinearLayoutWidget.Gravity.CENTER}
        >
          <LinearLayoutWidget
            clickAction="play"
            height={128}
            width={128}
            radius={64}
            backgroundColor="#BA666B"
            gravity={LinearLayoutWidget.Gravity.CENTER}
          >
            <IconWidget font="material" size={96} icon="play_arrow" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
        <LinearLayoutWidget
          weight={1}
          gravity={LinearLayoutWidget.Gravity.CENTER}
        >
          <IconWidget font="material" size={96} icon="skip_next" />
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}
