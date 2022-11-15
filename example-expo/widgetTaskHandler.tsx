import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { FitnessWidget } from './src/widgets/FitnessWidget';
import { MusicWidget } from './src/widgets/MusicWidget';
import { ResizableMusicWidget } from './src/widgets/ResizableMusicWidget';
import { RotatedWidget } from './src/widgets/RotatedWidget';
import { ShopifyWidget } from './src/widgets/ShopifyWidget';
import { StepsWidget } from './src/widgets/StepsWidget';

const nameToWidget = {
  Fitness: FitnessWidget,
  Music: MusicWidget,
  Resizable: ResizableMusicWidget,
  Rotated: RotatedWidget,
  Steps: StepsWidget,
  Shopify: ShopifyWidget,
};

export default async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_ADDED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_CLICK':
      if (widgetInfo.widgetName === 'Fitness') {
        props.renderWidget(
          <Widget {...widgetInfo} activeView={props.clickAction as any} />
        );
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
