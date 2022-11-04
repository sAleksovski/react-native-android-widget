import {
  Image,
  ImageRequireSource,
  ImageResolvedAssetSource,
} from 'react-native';
import { ClickActionProps, convertClickAction } from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

export interface ImageWidgetInternalProps extends CommonInternalProps {
  imageWidth: number;
  imageHeight: number;
  image: ImageResolvedAssetSource;
}

type ImageWidgetStyle = CommonStyleProps;

interface ImageWidgetProps extends ClickActionProps {
  style?: ImageWidgetStyle;
  children?: never;

  imageWidth: number;
  imageHeight: number;
  image: ImageRequireSource;
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
    image: Image.resolveAssetSource(props.image),
    ...(props.radius ? { radius: props.radius } : {}),
  };
};
