import {
  CommonInternalProps,
  CommonProps,
  convertCommonProps,
} from './common.props';

export interface IconWidgetInternalProps extends CommonInternalProps {
  icon: string;
  size: number;
  font: 'material' | 'material_outlined';
  /**
   * #RRGGBB or #AARRGGBB
   * Default is #000
   */
  color?: string;
}

interface IconWidgetProps extends CommonProps {
  icon: string;
  size: number;
  font: 'material' | 'material_outlined';
  /**
   * #RRGGBB or #AARRGGBB
   * Default is #000
   */
  color?: string;
  children?: never;
}

export function IconWidget(_: IconWidgetProps) {
  return null;
}
IconWidget.__name__ = 'IconWidget';
IconWidget.convertProps = (props: IconWidgetProps): IconWidgetInternalProps => {
  const internalProps: CommonInternalProps = convertCommonProps(props);
  return {
    ...internalProps,
    icon: props.icon,
    size: props.size,
    font: props.font,
    ...(props.color ? { color: props.color } : {}),
  };
};
