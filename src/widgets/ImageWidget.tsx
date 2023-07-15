import {
  Image,
  type ImageRequireSource,
  type ImageResolvedAssetSource,
} from 'react-native';
import {
  type ClickActionProps,
  convertClickAction,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

interface ImageWidgetInternalProps extends CommonInternalProps {
  imageWidth: number;
  imageHeight: number;
  image: Pick<ImageResolvedAssetSource, 'uri'>;
}

type ImageWidgetStyle = CommonStyleProps;

export type ImageWidgetSource =
  | ImageRequireSource
  | `http:${string}`
  | `https:${string}`
  | `data:image${string}`;

export interface ImageWidgetProps extends ClickActionProps {
  style?: ImageWidgetStyle;

  /**
   * Width of the image
   */
  imageWidth: number;
  /**
   * Height of the image
   */
  imageHeight: number;
  /**
   * Image loaded using `require('./path/to/image')`,
   * or a path to image starting with "http:", "https:", or "data:/image"
   */
  image: ImageWidgetSource;
  /**
   * Image radius
   */
  radius?: number;
}

export function ImageWidget(_: ImageWidgetProps) {
  return null;
}
ImageWidget.__name__ = 'ImageWidget';
ImageWidget.convertProps = (
  props: ImageWidgetProps
): ImageWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertClickAction(props),
    imageHeight: props.imageHeight,
    imageWidth: props.imageWidth,
    image:
      typeof props.image === 'number'
        ? Image.resolveAssetSource(props.image)
        : { uri: props.image },
    ...(props.radius ? { radius: props.radius } : {}),
  };
};
