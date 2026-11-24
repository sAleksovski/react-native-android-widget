import { AndroidWidget } from '../AndroidWidget';

export interface RequestPinWidgetOptions {
  /**
   * The name of the widget provider to add to the home screen.
   */
  widgetName: string;
  /**
   * When set, the new widget receives a `WIDGET_CLICK` with `clickAction`
   * `"WIDGET_PINNED"` and this as `clickActionData` once the user confirms
   * the prompt.
   */
  callbackData?: Record<string, unknown>;
}

/**
 * Whether the launcher supports adding a widget from inside the app.
 *
 * Resolves to `false` on other platforms and below Android 8.
 */
export async function isRequestPinWidgetSupported(): Promise<boolean> {
  return AndroidWidget.isRequestPinWidgetSupported();
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
  callbackData,
}: RequestPinWidgetOptions): Promise<boolean> {
  return AndroidWidget.requestPinWidget(widgetName, callbackData ?? null);
}
