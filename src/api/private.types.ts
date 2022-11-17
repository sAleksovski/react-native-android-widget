export interface OnClick {
  clickAction: string;
  clickActionData?: Record<string, unknown>;
}

export interface ClickableArea extends OnClick {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WidgetPreviewData {
  base64Image: string;
  clickableAreas: ClickableArea[];
}
