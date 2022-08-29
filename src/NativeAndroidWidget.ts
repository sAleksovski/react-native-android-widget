import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  drawWidget(config: Object, widgetName: string): void;
  drawWidgetById(config: Object, widgetName: string, widgetId: number): void;
  createPreview(
    config: Object,
    widgetName: string,
    width: number,
    height: number
  ): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AndroidWidget');
