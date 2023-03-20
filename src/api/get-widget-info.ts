import { AndroidWidget } from '../AndroidWidget';
import type { WidgetInfo } from './types';

/**
 * Returns a list of `widgetName` widgets added on the home screen
 */
export async function getWidgetInfo(widgetName: string): Promise<WidgetInfo[]> {
  return await AndroidWidget.getWidgetInfo(widgetName);
}
