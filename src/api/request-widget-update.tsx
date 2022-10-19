import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { WidgetInfo } from './types';

interface RequestWidgetUpdateProps {
  widgetName: string;
  renderWidget: (props: WidgetInfo) => Promise<JSX.Element> | JSX.Element;
}

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
