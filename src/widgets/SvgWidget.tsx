import { Image, ImageRequireSource } from 'react-native';
import { ClickActionProps, convertClickAction } from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

export interface SvgWidgetInternalProps extends CommonInternalProps {
  svgString?: string;
  svgUrl?: string;
}

type SvgWidgetStyle = CommonStyleProps;

interface SvgWidgetProps extends ClickActionProps {
  style?: SvgWidgetStyle;
  children?: never;

  svg: string | ImageRequireSource;
}

export function SvgWidget(_: SvgWidgetProps) {
  return null;
}
SvgWidget.__name__ = 'SvgWidget';
SvgWidget.convertProps = (props: SvgWidgetProps): SvgWidgetInternalProps => {
  const svg =
    typeof props.svg === 'string'
      ? props.svg
      : Image.resolveAssetSource(props.svg as ImageRequireSource).uri;

  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertClickAction(props),
    ...(typeof props.svg === 'string' ? { svgString: svg } : {}),
    ...(typeof props.svg !== 'string' ? { svgUrl: svg } : {}),
  };
};
