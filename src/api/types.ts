export interface ScreenInfo {
  /**
   * Height of the screen in DP
   */
  screenHeightDp: number;
  /**
   * Width of the screen in DP
   */
  screenWidthDp: number;
  /**
   * Density of the screen
   */
  density: number;
  /**
   * Density of the screen in Dpi
   */
  densityDpi: number;
}

export interface WidgetInfo {
  /**
   * Name of the widget
   */
  widgetName: string;
  /**
   * Internal id of the widget
   */
  widgetId: number;
  /**
   * Height of the widget
   */
  height: number;
  /**
   * Width of the widget
   */
  width: number;
  /**
   * Information about the device
   */
  screenInfo: ScreenInfo;
}
