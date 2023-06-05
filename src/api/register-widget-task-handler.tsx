import { AppRegistry } from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

const HEADLESS_TASK_KEY = 'RNWidgetBackgroundTask';

interface NativeTaskInfo extends WidgetInfo {
  widgetAction:
    | 'WIDGET_ADDED'
    | 'WIDGET_UPDATE'
    | 'WIDGET_RESIZED'
    | 'WIDGET_DELETED'
    | 'WIDGET_CLICK';
  clickAction?: string;
  clickActionData?: Record<string, unknown>;
}

export interface WidgetTaskHandlerProps {
  /**
   * Information about the widget being handled.
   */
  widgetInfo: WidgetInfo;
  /**
   * What kind of action is being handled
   */
  widgetAction:
    | 'WIDGET_ADDED'
    | 'WIDGET_UPDATE'
    | 'WIDGET_RESIZED'
    | 'WIDGET_DELETED'
    | 'WIDGET_CLICK';
  /**
   * Click action if widgetAction was WIDGET_CLICK
   */
  clickAction?: string;
  /**
   * Additional click action data if widgetAction was `WIDGET_CLICK`
   */
  clickActionData?: Record<string, unknown>;
  /**
   * Function that needs to be called with the Widget JSX to render
   */
  renderWidget: (widgetComponent: JSX.Element) => void;
}

export type WidgetTaskHandler = (
  props: WidgetTaskHandlerProps
) => Promise<void>;

/**
 * Register a task handler that will handle widget actions
 *
 * @param handler {@link WidgetTaskHandler}
 */
export function registerWidgetTaskHandler(handler: WidgetTaskHandler): void {
  async function taskProvider({
    widgetAction,
    clickAction,
    clickActionData,
    ...widgetInfo
  }: NativeTaskInfo) {
    function renderWidget(widgetComponent: JSX.Element) {
      if (widgetAction === 'WIDGET_DELETED') return;
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
      clickActionData: clickActionData
        ? JSON.parse(clickActionData as unknown as string)
        : {},
      renderWidget,
    });
  }

  AppRegistry.registerHeadlessTask(HEADLESS_TASK_KEY, () => taskProvider);
}
