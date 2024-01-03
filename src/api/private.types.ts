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

export interface CollectionItem extends OnClick {
  base64Image: string;
  height: number;
  width: number;
  clickableAreas: ClickableArea[];
}

export interface CollectionArea {
  left: number;
  top: number;
  width: number;
  height: number;
  items: CollectionItem[];
}

export interface WidgetPreviewData {
  base64Image: string;
  clickableAreas: ClickableArea[];
  collectionAreas: CollectionArea[];
}
