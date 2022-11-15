export type ResourcePath = `./${string}` | `../${string}`;

export interface Widget {
  name: string;
  label?: string;
  description?: string;
  minWidth: `${number}dp`;
  minHeight: `${number}dp`;
  maxResizeWidth?: `${number}dp`;
  maxResizeHeight?: `${number}dp`;
  previewImage?: ResourcePath;
  resizeMode?: 'none' | 'horizontal' | 'vertical' | 'horizontal|vertical';
}

export interface WithAndroidWidgetsParams {
  fonts?: ResourcePath[];
  widgets: Widget[];
}
