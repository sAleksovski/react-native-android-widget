import { AndroidWidget } from './AndroidWidget';
import type { WidgetTree } from './build-tree';

export function drawWidget(config: WidgetTree, widgetName: string): void {
  AndroidWidget.drawWidget(config, widgetName);
}

export function drawWidgetById(
  config: WidgetTree,
  widgetName: string,
  widgetId: number
): void {
  AndroidWidget.drawWidgetById(config, widgetName, widgetId);
}

export * from './build-tree';
export * from './WidgetPreview';
export * from './widgets/FlexWidget';
export * from './widgets/IconWidget';
export * from './widgets/ImageWidget';
export * from './widgets/OverlapWidget';
export * from './widgets/SvgWidget';
export * from './widgets/TextWidet';
export * from './widgets/utils/style.props';

export const HEADLESS_TASK_KEY = 'RNWidgetBackgroundTaskService';
