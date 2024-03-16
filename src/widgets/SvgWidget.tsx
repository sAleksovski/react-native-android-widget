import { Image, type ImageRequireSource } from 'react-native';
import {
  convertClickAction,
  type ClickActionProps,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

interface SvgWidgetInternalProps extends CommonInternalProps {
  svgString?: string;
  svgUrl?: string;
}

export type SvgWidgetStyle = CommonStyleProps;

export interface SvgWidgetProps extends ClickActionProps {
  style?: SvgWidgetStyle;

  /**
   * SVG file loaded with `require('./path/to/svg/file')`,
   * SVG string, or a path to svg starting with "http:" or "https:"
   */
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
    ...(typeof props.svg === 'string' && !props.svg.startsWith('http')
      ? { svgString: svg }
      : {}),
    ...(typeof props.svg === 'string' && props.svg.startsWith('http')
      ? { svgUrl: svg }
      : {}),
    ...(typeof props.svg !== 'string' ? { svgUrl: svg } : {}),
  };
};
