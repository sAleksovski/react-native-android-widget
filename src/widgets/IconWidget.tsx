import type { CommonInternalProps } from './utils/common-internal.props';
import type {
  ColorProp,
  CommonStyleProps,
  HexColor,
} from './utils/style.props';
import { convertColor, convertCommonStyle } from './utils/style.utils';

export interface IconWidgetInternalProps extends CommonInternalProps {
  icon: string;
  size: number;
  font: 'material' | 'material_outlined';

  color?: HexColor;
}

interface IconWidgetStyle extends CommonStyleProps {
  color?: ColorProp;
}

interface IconWidgetProps {
  style?: IconWidgetStyle;
  clickAction?: string;
  children?: never;

  icon: string;
  size: number;
  font: 'material' | 'material_outlined';
}

export function IconWidget(_: IconWidgetProps) {
  return null;
}
IconWidget.__name__ = 'IconWidget';
IconWidget.convertProps = (props: IconWidgetProps): IconWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...(props.clickAction ? { clickAction: props.clickAction } : {}),
    icon: props.icon,
    size: props.size,
    font: props.font,
    ...(props?.style?.color ? { color: convertColor(props.style.color) } : {}),
  };
};
