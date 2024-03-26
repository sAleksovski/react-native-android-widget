import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

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
  renderWidget: (props: WidgetInfo) => Promise<JSX.Element> | JSX.Element;
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

  AndroidWidget.drawWidgetById(
    buildWidgetTree(widgetComponent),
    widgetName,
    widgetInfo.widgetId
  );
}
