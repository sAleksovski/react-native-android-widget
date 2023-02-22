import { AndroidWidget } from '../AndroidWidget';

export interface GetWidgetInfoProps {
  /**
   * The name of the widget to update
   */
  widgetName: string;
}

/**
 * Request widget update for a given widget name
 * A callback will be called for each widget with that name that is added to the home screen
 *
 * @param param0 {@link GetWidgetInfoProps}
 */
export async function getWidgetInfo({ widgetName }: GetWidgetInfoProps) {
  return await AndroidWidget.getWidgetInfo(widgetName);
}
