import * as React from 'react';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo, WidgetRepresentation } from './types';

export interface RequestWidgetUpdateByIdProps {
  /**
   * The name of the widget to update
   */
  widgetName: string;
  /**
   * The id of the widget to update
   */
  widgetId: number;
  /**
   * Callback function that will be called with {@link WidgetInfo}
   * It should return the JSX of the updated widget
   */
  renderWidget: (
    props: WidgetInfo
  ) => Promise<WidgetRepresentation> | WidgetRepresentation;
  /**
   * Callback function that will be called if widget does not exist
   * It can be used to clean up background tasks that update the widget periodically
   */
  widgetNotFound?: () => void;
}

/**
 * Request widget update for a given widget name and id
 * A callback will be called for the widget with the given id
 *
 * @param param0 {@link RequestWidgetUpdateByIdProps}
 */
export async function requestWidgetUpdateById({
  widgetName,
  widgetId,
  renderWidget,
  widgetNotFound,
}: RequestWidgetUpdateByIdProps): Promise<void> {
  const widgetsInfo = await AndroidWidget.getWidgetInfo(widgetName);
  const widgetInfo = widgetsInfo.find((widget) => widget.widgetId === widgetId);

  if (!widgetInfo) {
    widgetNotFound?.();
    return;
  }

  const widgetComponent = await renderWidget(widgetInfo);

  const lightWidget =
    'light' in widgetComponent
      ? buildWidgetTree(widgetComponent.light)
      : buildWidgetTree(widgetComponent);
  const darkWidget =
    'dark' in widgetComponent
      ? buildWidgetTree(widgetComponent.dark as React.JSX.Element)
      : null;

  const config = {
    light: lightWidget,
    dark: darkWidget,
  };

  AndroidWidget.drawWidgetById(config, widgetName, widgetInfo.widgetId);
}
