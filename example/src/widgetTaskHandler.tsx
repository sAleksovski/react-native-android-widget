import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ClickDemoWidget } from './widgets/ClickDemoWidget';
import { CounterWidget } from './widgets/CounterWidget';
import {
  DEBUG_EVENTS_STORAGE_KEY,
  DebugEventsWidget,
} from './widgets/DebugEventsWidget';
import { FitnessWidget } from './widgets/FitnessWidget';
import { ListDemoWidget } from './widgets/ListDemoWidget';
import { ResizableMusicWidget } from './widgets/ResizableMusicWidget';
import { RotatedWidget } from './widgets/RotatedWidget';
import { ShopifyWidget } from './widgets/ShopifyWidget';

const nameToWidget = {
  Fitness: FitnessWidget,
  Resizable: ResizableMusicWidget,
  Rotated: RotatedWidget,
  Shopify: ShopifyWidget,
  Counter: CounterWidget,
  ClickDemo: ClickDemoWidget,
  List: ListDemoWidget,
  DebugEvents: DebugEventsWidget,
};

const COUNTER_STORAGE_KEY = 'CounterWidget:count';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

  if (widgetInfo.widgetName === 'DebugEvents') {
    let events = await writeAndGetEvents(
      widgetInfo.widgetId,
      props.widgetAction
    );
    if (props.widgetAction === 'WIDGET_CLICK') {
      AsyncStorage.setItem(DEBUG_EVENTS_STORAGE_KEY, '[]');
      events = [];
    }
    props.renderWidget(<DebugEventsWidget events={events} />);
    return;
  }

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_ADDED':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_UPDATE':
      if (widgetInfo.widgetName === 'Counter') {
        const count = +((await AsyncStorage.getItem(COUNTER_STORAGE_KEY)) ?? 0);
        props.renderWidget(<CounterWidget count={count} />);
      } else {
        props.renderWidget(<Widget {...widgetInfo} />);
      }
      break;

    case 'WIDGET_DELETED':
      // Do nothing
      break;

    case 'WIDGET_CLICK':
      if (widgetInfo.widgetName === 'Fitness') {
        props.renderWidget(
          <Widget {...widgetInfo} activeView={props.clickAction as any} />
        );
      }

      if (widgetInfo.widgetName === 'Counter') {
        const count =
          (props.clickActionData?.value as number) +
          (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<CounterWidget count={count} />);

        AsyncStorage.setItem(COUNTER_STORAGE_KEY, `${count}`);
      }

      if (widgetInfo.widgetName === 'Resizable') {
        props.renderWidget(
          <Widget
            {...widgetInfo}
            status={props.clickAction === 'pause' ? 'stopped' : 'playing'}
            songId={(props.clickActionData?.songId as number) ?? 0}
          />
        );
      }
      break;

    default:
      break;
  }
}

async function writeAndGetEvents(
  widgetId: number,
  action: string
): Promise<string[]> {
  const data = await AsyncStorage.getItem(DEBUG_EVENTS_STORAGE_KEY);
  const items = JSON.parse(data ?? '[]');
  items.push(`Widget #${widgetId} ${action} - ${new Date().toLocaleString()}`);
  AsyncStorage.setItem(DEBUG_EVENTS_STORAGE_KEY, JSON.stringify(items));
  return items;
}
