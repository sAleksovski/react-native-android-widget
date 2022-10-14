/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  TextWidget,
} from 'react-native-android-widget';

interface ActionSelectorProps {
  isActive: boolean;
  iconName: string;
}

function ActionSelector({ isActive, iconName }: ActionSelectorProps) {
  return (
    <FlexWidget
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FlexWidget
        clickAction={iconName}
        style={{
          height: 46,
          width: 46,
          borderRadius: 12,
          backgroundColor: isActive ? '#254B58' : '#5CC6E2',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconWidget
          style={{ color: isActive ? '#5CC6E2' : '#254B58' }}
          font="material"
          size={32}
          icon={iconName}
        />
      </FlexWidget>
    </FlexWidget>
  );
}

function StepsWalked() {
  return (
    <FlexWidget
      style={{
        flexDirection: 'column',
        height: 'match_parent',
        width: 'match_parent',
        padding: 12,
      }}
    >
      <TextWidget
        style={{ fontSize: 18, color: '#277E99' }}
        text="Steps Walked Today"
      />
      <TextWidget style={{ fontSize: 70, color: '#2C6475' }} text="428" />

      <FlexWidget
        style={{
          backgroundColor: '#54B4CE',
          width: 'match_parent',
          height: 'wrap_content',
          borderRadius: 6,
          marginBottom: 12,
        }}
      >
        <FlexWidget
          style={{
            backgroundColor: '#306374',
            height: 12,
            width: 46,
            borderRadius: 6,
          }}
        >
          <TextWidget style={{ fontSize: 0 }} text="0" />
        </FlexWidget>
      </FlexWidget>

      <FlexWidget style={{ width: 'match_parent', flexDirection: 'row' }}>
        <FlexWidget style={{ flex: 1 }}>
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text="Week Avg"
          />
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="2769.25"
          />
        </FlexWidget>

        <FlexWidget style={{ flex: 1 }}>
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text="Distance"
          />
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="0.14mi"
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}

function Activity() {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        padding: 12,
      }}
    >
      <TextWidget
        style={{ fontSize: 18, color: '#277E99' }}
        text="Last Activity"
      />
      <TextWidget
        style={{ fontSize: 34, color: '#2C6475' }}
        text="13 Hours Ago"
      />

      <FlexWidget
        style={{
          flexDirection: 'row',
          width: 'match_parent',
          marginTop: 12,
        }}
      >
        <FlexWidget style={{ flex: 1 }}>
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text="Segments"
          />
          <TextWidget style={{ fontSize: 18, color: '#2C6475' }} text="21" />
        </FlexWidget>

        <FlexWidget style={{ flex: 1 }}>
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text="Lasted For"
          />
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="1 Hour"
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}

function StepsHistory() {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        padding: 12,
      }}
    >
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'match_parent',
          flex: 1,
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            marginBottom: 6,
            flex: 1,
          }}
        >
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="3155 Steps"
          />
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text=" ● 21 Jul ● Thu"
          />
        </FlexWidget>
        <FlexWidget
          style={{
            backgroundColor: '#54B4CE',
            flexDirection: 'row',
            width: 'match_parent',
            height: 'wrap_content',
            flex: 2,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <FlexWidget
            style={{
              backgroundColor: '#306374',
              flexDirection: 'row',
              height: 'match_parent',
              flex: 1,
              borderRadius: 12,
              width: 92,
            }}
          >
            <TextWidget style={{ fontSize: 0 }} text="0" />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'match_parent',
          flex: 1,
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            marginBottom: 6,
            flex: 1,
          }}
        >
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="3655 Steps"
          />
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text=" ● 22 Jul ● Thu"
          />
        </FlexWidget>
        <FlexWidget
          style={{
            backgroundColor: '#54B4CE',
            flexDirection: 'row',
            width: 'match_parent',
            height: 'wrap_content',
            flex: 2,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <FlexWidget
            style={{
              backgroundColor: '#306374',
              flexDirection: 'row',
              height: 'match_parent',
              borderRadius: 12,
              width: 110,
            }}
          >
            <TextWidget style={{ fontSize: 0 }} text="0" />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'match_parent',
          flex: 1,
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            marginBottom: 6,
            flex: 1,
          }}
        >
          <TextWidget
            style={{ fontSize: 18, color: '#2C6475' }}
            text="428 Steps"
          />
          <TextWidget
            style={{ fontSize: 16, color: '#277E99' }}
            text=" ● 23 Jul ● Thu"
          />
        </FlexWidget>
        <FlexWidget
          style={{
            backgroundColor: '#54B4CE',
            flexDirection: 'row',
            width: 'match_parent',
            height: 'wrap_content',
            flex: 2,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <FlexWidget
            style={{
              backgroundColor: '#306374',
              flexDirection: 'row',
              height: 'match_parent',
              borderRadius: 12,
              width: 24,
            }}
          >
            <TextWidget style={{ fontSize: 0 }} text="0" />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}

interface FitnessWidgetProps {
  activeView?: 'directions_walk' | 'schedule' | 'bar_chart';
}

export function FitnessWidget({ activeView }: FitnessWidgetProps) {
  const active = activeView ?? 'directions_walk';
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        backgroundColor: '#5CC6E2',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 16,
      }}
    >
      <FlexWidget
        style={{
          padding: 12,
          height: 'match_parent',
          width: 'wrap_content',
        }}
      >
        <ActionSelector
          iconName="directions_walk"
          isActive={active === 'directions_walk'}
        />
        <ActionSelector iconName="schedule" isActive={active === 'schedule'} />
        <ActionSelector
          iconName="bar_chart"
          isActive={active === 'bar_chart'}
        />
      </FlexWidget>

      {active === 'directions_walk' ? <StepsWalked /> : null}
      {active === 'schedule' ? <Activity /> : null}
      {active === 'bar_chart' ? <StepsHistory /> : null}
    </FlexWidget>
  );
}
