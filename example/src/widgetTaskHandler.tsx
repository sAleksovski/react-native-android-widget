import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ClickDemoWidget } from './widgets/ClickDemoWidget';
import { ConfigurableWidget } from './widgets/ConfigurableWidget';
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
  Configurable: ConfigurableWidget,
};

const COUNTER_STORAGE_KEY = 'CounterWidget:count';
const CONFIGURABLE_WIDGET_STORAGE_KEY = 'ConfigurableWidget:config';

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

  if (widgetInfo.widgetName === 'Configurable') {
    const configStr = await AsyncStorage.getItem(
      CONFIGURABLE_WIDGET_STORAGE_KEY
    );

    const config = JSON.parse(configStr ?? '{}');

    const widgetConfig = config[widgetInfo.widgetId] ?? {
      value: 1,
      increment: 1,
    };

    switch (props.widgetAction) {
      case 'WIDGET_RESIZED':
      case 'WIDGET_ADDED':
      case 'WIDGET_UPDATE':
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value} />);
        break;

      case 'WIDGET_DELETED':
        delete config[widgetInfo.widgetId];
        AsyncStorage.setItem(
          CONFIGURABLE_WIDGET_STORAGE_KEY,
          JSON.stringify(config)
        );
        break;

      case 'WIDGET_CLICK':
        widgetConfig.value =
          widgetConfig.value +
          widgetConfig.incrementBy *
            (props.clickAction === 'INCREMENT' ? 1 : -1);
        props.renderWidget(<ConfigurableWidget value={widgetConfig.value} />);
        config[widgetInfo.widgetId] = widgetConfig;
        AsyncStorage.setItem(
          CONFIGURABLE_WIDGET_STORAGE_KEY,
          JSON.stringify(config)
        );
        break;
    }
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

      if (widgetInfo.widgetName === 'List' && props.clickAction === 'ARCHIVE') {
        props.renderWidget(
          <Widget archivedIndex={props.clickActionData?.listItemId} />
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
