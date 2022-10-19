export interface ScreenInfo {
  screenHeightDp: number;
  screenWidthDp: number;
  density: number;
  densityDpi: number;
}

export interface WidgetInfo {
  widgetName: string;
  widgetId: number;
  height: number;
  width: number;
  screenInfo: ScreenInfo;
}
