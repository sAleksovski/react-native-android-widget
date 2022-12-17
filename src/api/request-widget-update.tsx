import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

export interface RequestWidgetUpdateProps {
  /**
   * The name of the widget to update
   */
  widgetName: string;
  /**
   * Callback function that will be called with {@link WidgetInfo}
   * It should return the JSX of the updated widget
   */
  renderWidget: (props: WidgetInfo) => Promise<JSX.Element> | JSX.Element;
}

/**
 * Request widget update for a given widget name
 * A callback will be called for each widget with that name that is added to the home screen
 *
 * @param param0 {@link RequestWidgetUpdateProps}
 */
export async function requestWidgetUpdate({
  widgetName,
  renderWidget,
}: RequestWidgetUpdateProps) {
  const widgetsInfo = await AndroidWidget.getWidgetInfo(widgetName);

  widgetsInfo.forEach(async (info: WidgetInfo) => {
    const widgetComponent = await renderWidget(info);

    AndroidWidget.drawWidgetById(
      buildWidgetTree(widgetComponent),
      widgetName,
      info.widgetId
    );
  });
}
