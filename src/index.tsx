import { AndroidWidget } from './AndroidWidget';

export function drawWidget(config: any, widgetName: string): void {
  AndroidWidget.drawWidget(config, widgetName);
}

export function drawWidgetById(
  config: any,
  widgetName: string,
  widgetId: number
): void {
  AndroidWidget.drawWidgetById(config, widgetName, widgetId);
}

export function createPreview(
  config: any,
  widgetName: string,
  width: number,
  height: number
): Promise<string> {
  return AndroidWidget.createPreview(config, widgetName, width, height);
}

export * from './build-tree';
export * from './WidgetPreview';
export * from './widgets/FrameLayoutWidget';
export * from './widgets/IconWidget';
export * from './widgets/ImageWidget';
export * from './widgets/LinearLayoutWidget';
export * from './widgets/TextWidet';
