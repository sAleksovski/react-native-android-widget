/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  ListWidget,
  TextWidget,
} from 'react-native-android-widget';

function Events({ events = [] }: DebugEventsWidgetProps) {
  return (
    <ListWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
      }}
    >
      {events.map((event, i) => (
        <FlexWidget
          style={{
            width: 'match_parent',
            padding: 8,
            borderTopWidth: i === 0 ? 0 : 1,
          }}
          key={i}
        >
          <TextWidget
            text={event}
            style={{
              fontSize: 14,
              fontFamily: 'Roboto',
            }}
          />
        </FlexWidget>
      ))}
    </ListWidget>
  );
}

interface DebugEventsWidgetProps {
  events: string[];
}

export function DebugEventsWidget({ events = [] }: DebugEventsWidgetProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 16,
      }}
    >
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'match_parent',
          marginBottom: 16,
        }}
      >
        <TextWidget
          text={`Events (${events.length})`}
          style={{
            fontSize: 16,
            fontWeight: '500',
          }}
        />
        <IconWidget
          clickAction="DELETE"
          icon="delete"
          size={20}
          font="material_outlined"
          style={{
            color: '#ffffff',
            backgroundColor: '#ff4444',
            padding: 8,
            borderRadius: 12,
            borderColor: '#ff4444',
            borderWidth: 1,
          }}
        />
      </FlexWidget>

      {events.length > 0 ? (
        <Events events={events} />
      ) : (
        <TextWidget text="No events yet" />
      )}
    </FlexWidget>
  );
}

export const DEBUG_EVENTS_STORAGE_KEY = 'DEBUG_EVENTS_STORAGE_KEY';
