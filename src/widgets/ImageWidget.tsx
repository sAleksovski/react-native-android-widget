import {
  Image,
  ImageRequireSource,
  ImageResolvedAssetSource,
} from 'react-native';
import {
  CommonInternalProps,
  CommonProps,
  convertCommonProps,
} from './common.props';

export interface ImageWidgetInternalProps extends CommonInternalProps {
  imageWidth: number;
  imageHeight: number;
  image: ImageResolvedAssetSource;
}

interface ImageWidgetProps extends CommonProps {
  imageWidth: number;
  imageHeight: number;
  image: ImageRequireSource;
  children?: never;
}

export function ImageWidget(_: ImageWidgetProps) {
  return null;
}
ImageWidget.__name__ = 'ImageWidget';
ImageWidget.convertProps = (
  props: ImageWidgetProps
): ImageWidgetInternalProps => {
  const internalProps: CommonInternalProps = convertCommonProps(props);
  return {
    ...internalProps,
    imageHeight: props.imageHeight,
    imageWidth: props.imageWidth,
    image: Image.resolveAssetSource(props.image),
  };
};
