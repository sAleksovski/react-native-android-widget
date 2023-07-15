import {
  type ClickActionProps,
  convertClickAction,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type {
  ColorProp,
  CommonStyleProps,
  HexColor,
} from './utils/style.props';
import { convertColor, convertCommonStyle } from './utils/style.utils';

interface IconWidgetInternalProps extends CommonInternalProps {
  icon: string;
  size: number;
  font: string;
  adjustsFontSizeToFit?: boolean;

  color?: HexColor;
}

export interface IconWidgetStyle extends CommonStyleProps {
  color?: ColorProp;
  adjustsFontSizeToFit?: boolean;
}

export interface IconWidgetProps extends ClickActionProps {
  style?: IconWidgetStyle;

  /**
   * Icon from the specified font
   */
  icon: string;
  /**
   * Size of the icon
   */
  size: number;
  /**
   * Font of the icon. It must be added to the application
   */
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
    ...(props.style?.adjustsFontSizeToFit
      ? { adjustsFontSizeToFit: props.style.adjustsFontSizeToFit }
      : {}),
  };
};
