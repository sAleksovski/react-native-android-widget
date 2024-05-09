export type ResourcePath = `./${string}` | `../${string}`;

export interface Widget {
  /**
   * Name of the widget which will be used to reference it in code
   */
  name: string;
  /**
   * Label that will be shown in widget picker
   */
  label?: string;
  /**
   * Description that will be shown in widget picker
   */
  description?: string;
  minWidth: `${number}dp`;
  minHeight: `${number}dp`;
  targetCellWidth?: number;
  targetCellHeight?: number;
  maxResizeWidth?: `${number}dp`;
  maxResizeHeight?: `${number}dp`;
  previewImage?: ResourcePath;
  resizeMode?: 'none' | 'horizontal' | 'vertical' | 'horizontal|vertical';
  /**
   * Whether the widget can be configured.
   * 'configurable' means that the widget is configurable, and a
   * configuration activity will be open when the widget is added on home screen.
   * 'reconfigurable|configuration_optional' will make the widget configurable,
   * but will not open the configuration activity when added on home screen,
   * and the configuration can be changed by holding the widget and selecting configure.
   * The widget will not be configurable if `widgetFeatures` is not provided
   */
  widgetFeatures?: 'reconfigurable' | 'reconfigurable|configuration_optional';
  /**
   * How often the widget should be updated, in milliseconds.
   *
   * Default is 0 (no automatic updates)
   *
   * Minimum is 1.800.000 (30 minutes == 30 * 60 * 1000).
   */
  updatePeriodMillis?: number;
}

export interface WithAndroidWidgetsParams {
  fonts?: ResourcePath[];
  widgets: Widget[];
}
