import { AndroidWidget } from '../AndroidWidget';

export interface RequestPinWidgetOptions {
  /**
   * The name of the widget provider to add to the home screen.
   */
  widgetName: string;
}

/**
 * Opens the launcher's native prompt to add a widget to the home screen.
 *
 * Resolves to `false` when the platform or launcher does not support pinning.
 * A `true` result means that the request was accepted by the launcher, not that
 * the user confirmed it.
 */
export async function requestPinWidget({
  widgetName,
}: RequestPinWidgetOptions): Promise<boolean> {
  return AndroidWidget.requestPinWidget(widgetName);
}
