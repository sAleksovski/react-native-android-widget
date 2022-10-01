/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  TextWidget,
} from 'react-native-android-widget';

export function StepsWidget() {
  return (
    <FlexWidget
      style={{
        alignItems: 'center',
        backgroundColor: '#FDF1FE',
        padding: 25,
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 80,
      }}
    >
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 160,
          width: 160,
          borderRadius: 80,
          backgroundColor: '#E1CEE7',
          marginTop: 48,
          marginBottom: 32,
        }}
      >
        <IconWidget
          size={72}
          icon="directions_walk"
          color="#4F3A53"
          font="material_outlined"
        />
      </FlexWidget>

      <TextWidget
        fontSize={48}
        text="Steps Today"
        color="#907E8D"
        marginBottom={8}
      />

      <TextWidget fontSize={64} text="265" color="#1A161C" marginBottom={48} />

      <FlexWidget
        style={{
          backgroundColor: '#E1CEE7',
          borderRadius: 56,
          height: 'match_parent',
          width: 'match_parent',
        }}
        // TODO
        // separator={{
        //   padding: 24,
        //   color: '#ffffff',
        // }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <FlexWidget
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 140,
              width: 140,
              borderRadius: 70,
              backgroundColor: '#FDF1FE',
              marginRight: 48,
            }}
          >
            <IconWidget
              size={72}
              icon="local_fire_department"
              color="#4F3A53"
              font="material_outlined"
            />
          </FlexWidget>
          <FlexWidget
            style={{
              flex: 1,
            }}
          >
            <TextWidget fontSize={40} text="Calories" color="#705B72" />
            <TextWidget fontSize={48} text="33" color="#1A161C" />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <FlexWidget
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 140,
              width: 140,
              borderRadius: 70,
              backgroundColor: '#FDF1FE',
              marginRight: 48,
            }}
          >
            <IconWidget
              size={72}
              icon="map"
              color="#4F3A53"
              font="material_outlined"
            />
          </FlexWidget>
          <FlexWidget
            style={{
              flex: 1,
            }}
          >
            <TextWidget fontSize={40} text="Distance" color="#705B72" />
            <TextWidget fontSize={48} text="0.07km" color="#1A161C" />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
