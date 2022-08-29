import React from 'react';
import {
  IconWidget,
  LinearLayoutWidget,
  TextWidget,
} from 'react-native-android-widget';

interface ActionSelectorProps {
  isActive: boolean;
  iconName: string;
}

function ActionSelector({ isActive, iconName }: ActionSelectorProps) {
  return (
    <LinearLayoutWidget weight={1} gravity={LinearLayoutWidget.Gravity.CENTER}>
      <LinearLayoutWidget
        clickAction={iconName}
        height={128}
        width={128}
        radius={32}
        backgroundColor={isActive ? '#254B58' : '#5CC6E2'}
        gravity={LinearLayoutWidget.Gravity.CENTER}
      >
        <IconWidget
          color={isActive ? '#5CC6E2' : '#254B58'}
          font="material"
          size={96}
          icon={iconName}
        />
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}

function StepsWalked() {
  return (
    <LinearLayoutWidget
      orientation="VERTICAL"
      height="match_parent"
      width="match_parent"
      padding={32}
    >
      <TextWidget fontSize={48} color="#277E99" text="Steps Walked Today" />
      <TextWidget fontSize={192} color="#2C6475" text="428" />

      <LinearLayoutWidget
        backgroundColor="#54B4CE"
        orientation="HORIZONTAL"
        width="match_parent"
        height="wrap_content"
        radius={16}
        marginBottom={32}
      >
        <LinearLayoutWidget
          backgroundColor="#306374"
          orientation="HORIZONTAL"
          height={32}
          radius={16}
          width={128}
        >
          <TextWidget fontSize={0} text="0" />
        </LinearLayoutWidget>
      </LinearLayoutWidget>

      <LinearLayoutWidget orientation="HORIZONTAL" width="match_parent">
        <LinearLayoutWidget orientation="VERTICAL" weight={1}>
          <TextWidget fontSize={40} color="#277E99" text="Week Avg" />
          <TextWidget fontSize={48} color="#2C6475" text="2769.25" />
        </LinearLayoutWidget>

        <LinearLayoutWidget orientation="VERTICAL" weight={1}>
          <TextWidget fontSize={40} color="#277E99" text="Distance" />
          <TextWidget fontSize={48} color="#2C6475" text="0.14mi" />
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}

function Activity() {
  return (
    <LinearLayoutWidget
      orientation="VERTICAL"
      height="match_parent"
      width="match_parent"
      gravity={LinearLayoutWidget.Gravity.CENTER_VERTICAL}
      padding={32}
    >
      <TextWidget fontSize={48} color="#277E99" text="Last Activity" />
      <TextWidget fontSize={96} color="#2C6475" text="13 Hours Ago" />

      <LinearLayoutWidget
        orientation="HORIZONTAL"
        width="match_parent"
        marginTop={32}
      >
        <LinearLayoutWidget orientation="VERTICAL" weight={1}>
          <TextWidget fontSize={40} color="#277E99" text="Segments" />
          <TextWidget fontSize={48} color="#2C6475" text="21" />
        </LinearLayoutWidget>

        <LinearLayoutWidget orientation="VERTICAL" weight={1}>
          <TextWidget fontSize={40} color="#277E99" text="Lasted For" />
          <TextWidget fontSize={48} color="#2C6475" text="1 Hour" />
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}

function StepsHistory() {
  return (
    <LinearLayoutWidget
      orientation="VERTICAL"
      height="match_parent"
      width="match_parent"
      padding={32}
    >
      <LinearLayoutWidget
        orientation="VERTICAL"
        width="match_parent"
        height="match_parent"
        weight={1}
      >
        <LinearLayoutWidget
          orientation="HORIZONTAL"
          marginBottom={16}
          weight={1}
        >
          <TextWidget fontSize={48} color="#2C6475" text="3155 Steps" />
          <TextWidget fontSize={40} color="#277E99" text=" ● 21 Jul ● Thu" />
        </LinearLayoutWidget>
        <LinearLayoutWidget
          backgroundColor="#54B4CE"
          orientation="HORIZONTAL"
          width="match_parent"
          height="wrap_content"
          weight={2}
          radius={32}
          marginBottom={32}
        >
          <LinearLayoutWidget
            backgroundColor="#306374"
            orientation="HORIZONTAL"
            height="match_parent"
            weight={1}
            radius={32}
            width={256}
          >
            <TextWidget fontSize={0} text="0" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>

      <LinearLayoutWidget
        orientation="VERTICAL"
        width="match_parent"
        height="match_parent"
        weight={1}
      >
        <LinearLayoutWidget
          orientation="HORIZONTAL"
          marginBottom={16}
          weight={1}
        >
          <TextWidget fontSize={48} color="#2C6475" text="3655 Steps" />
          <TextWidget fontSize={40} color="#277E99" text=" ● 22 Jul ● Thu" />
        </LinearLayoutWidget>
        <LinearLayoutWidget
          backgroundColor="#54B4CE"
          orientation="HORIZONTAL"
          width="match_parent"
          height="wrap_content"
          weight={2}
          radius={32}
          marginBottom={32}
        >
          <LinearLayoutWidget
            backgroundColor="#306374"
            orientation="HORIZONTAL"
            height="match_parent"
            radius={32}
            width={300}
          >
            <TextWidget fontSize={0} text="0" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>

      <LinearLayoutWidget
        orientation="VERTICAL"
        width="match_parent"
        height="match_parent"
        weight={1}
      >
        <LinearLayoutWidget
          orientation="HORIZONTAL"
          marginBottom={16}
          weight={1}
        >
          <TextWidget fontSize={48} color="#2C6475" text="428 Steps" />
          <TextWidget fontSize={40} color="#277E99" text=" ● 23 Jul ● Thu" />
        </LinearLayoutWidget>
        <LinearLayoutWidget
          backgroundColor="#54B4CE"
          orientation="HORIZONTAL"
          width="match_parent"
          height="wrap_content"
          weight={2}
          radius={32}
          marginBottom={32}
        >
          <LinearLayoutWidget
            backgroundColor="#306374"
            orientation="HORIZONTAL"
            height="match_parent"
            radius={32}
            width={64}
          >
            <TextWidget fontSize={0} text="0" />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}

interface FitnessWidgetProps {
  activeView?: 'directions_walk' | 'schedule' | 'bar_chart';
}

export function FitnessWidget({ activeView }: FitnessWidgetProps) {
  const active = activeView ?? 'directions_walk';
  return (
    <LinearLayoutWidget
      orientation="HORIZONTAL"
      backgroundColor="#5CC6E2"
      height="match_parent"
      width="match_parent"
      radius={48}
    >
      <LinearLayoutWidget
        padding={32}
        orientation="VERTICAL"
        height="match_parent"
        width="wrap_content"
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
      </LinearLayoutWidget>

      {active === 'directions_walk' ? <StepsWalked /> : null}
      {active === 'schedule' ? <Activity /> : null}
      {active === 'bar_chart' ? <StepsHistory /> : null}
    </LinearLayoutWidget>
  );
}
