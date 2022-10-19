import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WidgetInfo } from './api/types';

export interface Spec extends TurboModule {
  drawWidget(config: Object, widgetName: string): void;
  drawWidgetById(config: Object, widgetName: string, widgetId: number): void;
  createPreview(config: Object, width: number, height: number): Promise<string>;
  getWidgetInfo(widgetName: string): Promise<WidgetInfo[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AndroidWidget');
