import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

export interface IconWidgetInternalProps extends CommonInternalProps {
  icon: string;
  size: number;
  font: 'material' | 'material_outlined';

  color?: string;
}

interface IconWidgetStyle extends CommonStyleProps {
  color?: string;
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
    ...(props?.style?.color ? { color: props?.style?.color } : {}),
  };
};
