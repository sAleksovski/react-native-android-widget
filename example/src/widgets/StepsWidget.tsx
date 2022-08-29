import React from 'react';
import {
  IconWidget,
  LinearLayoutWidget,
  TextWidget,
} from 'react-native-android-widget';

export function StepsWidget() {
  return (
    <LinearLayoutWidget
      gravity={LinearLayoutWidget.Gravity.CENTER_HORIZONTAL}
      orientation="VERTICAL"
      backgroundColor="#FDF1FE"
      padding={24}
      height="match_parent"
      width="match_parent"
      radius={80}
    >
      <LinearLayoutWidget
        gravity={LinearLayoutWidget.Gravity.CENTER}
        orientation="HORIZONTAL"
        height={160}
        width={160}
        backgroundColor="#E1CEE7"
        radius={80}
        marginTop={48}
        marginBottom={32}
      >
        <IconWidget
          size={72}
          icon="directions_walk"
          color="#4F3A53"
          font="material_outlined"
        />
      </LinearLayoutWidget>

      <TextWidget
        fontSize={48}
        text="Steps Today"
        color="#907E8D"
        marginBottom={8}
      />

      <TextWidget fontSize={64} text="265" color="#1A161C" marginBottom={48} />

      <LinearLayoutWidget
        orientation="VERTICAL"
        backgroundColor="#E1CEE7"
        separator={{
          padding: 24,
          color: '#ffffff',
        }}
        radius={56}
        height="match_parent"
        width="match_parent"
      >
        <LinearLayoutWidget
          gravity={LinearLayoutWidget.Gravity.CENTER_VERTICAL}
          weight={1}
          orientation="HORIZONTAL"
          height="wrap_content"
          width="wrap_content"
          padding={24}
        >
          <LinearLayoutWidget
            gravity={LinearLayoutWidget.Gravity.CENTER}
            orientation="HORIZONTAL"
            height={140}
            width={140}
            backgroundColor="#FDF1FE"
            radius={70}
            marginRight={48}
          >
            <IconWidget
              size={72}
              icon="local_fire_department"
              color="#4F3A53"
              font="material_outlined"
            />
          </LinearLayoutWidget>
          <LinearLayoutWidget
            gravity={LinearLayoutWidget.Gravity.START}
            weight={1}
            orientation="VERTICAL"
            height="wrap_content"
            width="wrap_content"
          >
            <TextWidget fontSize={40} text="Calories" color="#705B72" />
            <TextWidget fontSize={48} text="33" color="#1A161C" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>

        <LinearLayoutWidget
          gravity={LinearLayoutWidget.Gravity.CENTER_VERTICAL}
          weight={1}
          orientation="HORIZONTAL"
          height="wrap_content"
          width="wrap_content"
          padding={24}
        >
          <LinearLayoutWidget
            gravity={LinearLayoutWidget.Gravity.CENTER}
            orientation="HORIZONTAL"
            height={140}
            width={140}
            backgroundColor="#FDF1FE"
            radius={70}
            marginRight={48}
          >
            <IconWidget
              size={72}
              icon="map"
              color="#4F3A53"
              font="material_outlined"
            />
          </LinearLayoutWidget>
          <LinearLayoutWidget
            gravity={LinearLayoutWidget.Gravity.START}
            weight={1}
            orientation="VERTICAL"
            height="wrap_content"
            width="wrap_content"
          >
            <TextWidget fontSize={40} text="Distance" color="#705B72" />
            <TextWidget fontSize={48} text="0.07km" color="#1A161C" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}
