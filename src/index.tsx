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

export function createPreview(
  config: WidgetTree,
  widgetName: string,
  width: number,
  height: number
): Promise<string> {
  return AndroidWidget.createPreview(config, widgetName, width, height);
}

export * from './build-tree';
export * from './WidgetPreview';
export * from './widgets/v2/FlexWidget';
export * from './widgets/FrameLayoutWidget';
export * from './widgets/IconWidget';
export * from './widgets/ImageWidget';
export * from './widgets/TextWidet';
