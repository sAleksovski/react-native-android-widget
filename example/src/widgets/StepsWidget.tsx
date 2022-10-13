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
          size={28}
          icon="directions_walk"
          style={{ color: '#4F3A53' }}
          font="material_outlined"
        />
      </FlexWidget>

      <TextWidget
        style={{ fontSize: 16, color: '#908E8D', marginBottom: 8 }}
        text="Steps Today"
      />

      <TextWidget
        style={{ fontSize: 24, color: '#1A161C', marginBottom: 48 }}
        text="265"
      />

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
              size={24}
              icon="local_fire_department"
              style={{ color: '#4F3A53' }}
              font="material_outlined"
            />
          </FlexWidget>
          <FlexWidget
            style={{
              flex: 1,
            }}
          >
            <TextWidget
              style={{ fontSize: 16, color: '#705B72' }}
              text="Calories"
            />
            <TextWidget style={{ fontSize: 18, color: '#1A161C' }} text="33" />
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
              size={24}
              icon="map"
              style={{ color: '#4F3A53' }}
              font="material_outlined"
            />
          </FlexWidget>
          <FlexWidget
            style={{
              flex: 1,
            }}
          >
            <TextWidget
              style={{ fontSize: 16, color: '#705B72' }}
              text="Distance"
            />
            <TextWidget
              style={{ fontSize: 18, color: '#1A161C' }}
              text="0.07km"
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
