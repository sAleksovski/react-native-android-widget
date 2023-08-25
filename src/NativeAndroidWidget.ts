import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WidgetPreviewData } from './api/private.types';
import type { WidgetInfo } from './api/types';

export interface Spec extends TurboModule {
  drawWidget(config: Object, widgetName: string): void;
  drawWidgetById(config: Object, widgetName: string, widgetId: number): void;
  createPreview(
    config: Object,
    width: number,
    height: number
  ): Promise<WidgetPreviewData>;
  getWidgetInfo(widgetName: string): Promise<WidgetInfo[]>;
  finishWidgetConfiguration(widgetId: number, result: 'ok' | 'cancel'): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AndroidWidget');
