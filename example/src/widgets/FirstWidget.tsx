import React from 'react';
import {
  ImageWidget,
  LinearLayoutWidget,
  TextWidget,
} from 'react-native-android-widget';

export function FirstWidget() {
  return (
    <LinearLayoutWidget>
      <TextWidget
        fontSize={64}
        text="Hello world 1"
        color="#ff0000"
        clickAction="true"
      />
      <LinearLayoutWidget orientation="HORIZONTAL">
        <TextWidget fontSize={32} text={'Hello world 2'} color="#00ff00" />
        <TextWidget
          fontSize={48}
          text="Hello world 3"
          color="#0000ff"
          shadow={{
            dx: 5,
            dy: 5,
            radius: 2,
            color: '#ffff00',
          }}
          clickAction="true"
        />
      </LinearLayoutWidget>
      <ImageWidget
        image={require('../../assets/icon.png')}
        imageWidth={64}
        imageHeight={64}
      />
    </LinearLayoutWidget>
  );
}
