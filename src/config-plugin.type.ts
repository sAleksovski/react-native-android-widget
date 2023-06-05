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
  maxResizeWidth?: `${number}dp`;
  maxResizeHeight?: `${number}dp`;
  previewImage?: ResourcePath;
  resizeMode?: 'none' | 'horizontal' | 'vertical' | 'horizontal|vertical';
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
