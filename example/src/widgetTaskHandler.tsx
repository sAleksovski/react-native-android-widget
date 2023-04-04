import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ClickDemoWidget } from './widgets/ClickDemoWidget';
import { CounterWidget } from './widgets/CounterWidget';
import { FitnessWidget } from './widgets/FitnessWidget';
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
};

const COUNTER_STORAGE_KEY = 'CounterWidget:count';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;

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
