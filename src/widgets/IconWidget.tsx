import { ClickActionProps, convertClickAction } from './utils/click-action';
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
  font: string;

  color?: HexColor;
}

interface IconWidgetStyle extends CommonStyleProps {
  color?: ColorProp;
}

interface IconWidgetProps extends ClickActionProps {
  style?: IconWidgetStyle;
  children?: never;

  icon: string;
  size: number;
  font: string;
}

export function IconWidget(_: IconWidgetProps) {
  return null;
}
IconWidget.__name__ = 'IconWidget';
IconWidget.convertProps = (props: IconWidgetProps): IconWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertClickAction(props),
    icon: props.icon,
    size: props.size,
    font: props.font,
    ...(props?.style?.color ? { color: convertColor(props.style.color) } : {}),
  };
};
