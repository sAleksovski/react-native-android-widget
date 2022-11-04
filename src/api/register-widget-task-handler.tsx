import { AppRegistry } from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

const HEADLESS_TASK_KEY = 'RNWidgetBackgroundTaskService';

interface NativeTaskInfo extends WidgetInfo {
  widgetAction: 'WIDGET_ADDED' | 'WIDGET_RESIZED' | 'WIDGET_CLICK';
  clickAction?: string;
  clickActionData?: Record<string, unknown>;
}

export interface WidgetTaskHandlerProps {
  widgetInfo: WidgetInfo;
  widgetAction: 'WIDGET_ADDED' | 'WIDGET_RESIZED' | 'WIDGET_CLICK';
  clickAction?: string;
  clickActionData?: Record<string, unknown>;
  renderWidget: (widgetComponent: JSX.Element) => void;
}

export type WidgetTaskHandler = (
  props: WidgetTaskHandlerProps
) => Promise<void>;

export function registerWidgetTaskHandler(handler: WidgetTaskHandler) {
  async function taskProvider({
    widgetAction,
    clickAction,
    clickActionData,
    ...widgetInfo
  }: NativeTaskInfo) {
    function renderWidget(widgetComponent: JSX.Element) {
      AndroidWidget.drawWidgetById(
        buildWidgetTree(widgetComponent),
        widgetInfo.widgetName,
        widgetInfo.widgetId
      );
    }

    await handler({
      widgetInfo,
      widgetAction,
      clickAction,
      clickActionData,
      renderWidget,
    });
  }

  AppRegistry.registerHeadlessTask(HEADLESS_TASK_KEY, () => taskProvider);
}
