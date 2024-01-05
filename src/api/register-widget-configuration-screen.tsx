import * as React from 'react';
import { AppRegistry } from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

const WIDGET_CONFIGURATION_SCREEN_KEY = 'RNWidgetConfigurationScreen';

export interface WidgetConfigurationScreenProps {
  /**
   * Information about the widget being configured.
   */
  widgetInfo: WidgetInfo;
  /**
   * Function that can be called with the Widget JSX to render
   */
  renderWidget: (widgetComponent: JSX.Element) => void;

  /**
   * This must be called after finishing with configuration.
   * 'ok' means the widget is configured and can be added,
   * 'cancel' means the configuration process is canceled and the widget will be removed if this is the first time configuring it
   */
  setResult: (result: 'ok' | 'cancel') => void;
}

export type WidgetConfigurationScreen = (
  props: WidgetConfigurationScreenProps
) => JSX.Element;

/**
 * Register a screen that will handle widget configuration
 *
 * @param WidgetConfigurationScreenComponent {@link WidgetConfigurationScreen}
 */
export function registerWidgetConfigurationScreen(
  WidgetConfigurationScreenComponent: WidgetConfigurationScreen
): void {
  AppRegistry.registerComponent(WIDGET_CONFIGURATION_SCREEN_KEY, () =>
    widgetConfigurationScreenProvider(WidgetConfigurationScreenComponent)
  );
}

function widgetConfigurationScreenProvider(
  WidgetConfigurationScreen: WidgetConfigurationScreen
) {
  return ({ widgetInfo }: { widgetInfo: WidgetInfo }) => {
    function renderWidget(widgetComponent: JSX.Element) {
      AndroidWidget.drawWidgetById(
        buildWidgetTree(widgetComponent),
        widgetInfo.widgetName,
        widgetInfo.widgetId
      );
    }

    function setResult(result: 'ok' | 'cancel') {
      AndroidWidget.finishWidgetConfiguration(widgetInfo.widgetId, result);
    }

    return (
      <WidgetConfigurationScreen
        widgetInfo={widgetInfo}
        renderWidget={renderWidget}
        setResult={setResult}
      />
    );
  };
}
