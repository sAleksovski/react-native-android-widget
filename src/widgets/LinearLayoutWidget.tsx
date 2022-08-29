import {
  CommonInternalProps,
  CommonProps,
  convertCommonProps,
} from './common.props';

interface LinearLayoutWidgetInternalProps extends CommonInternalProps {
  /**
   * orientation
   * Default is Vertical
   */
  orientation?: 'VERTICAL' | 'HORIZONTAL';
  /**
   * LinearLayoutWidget.Gravity
   */
  gravity?: number;
  separator?: {
    padding: number;
    color: string;
  };
}

interface LinearLayoutWidgetProps extends CommonProps {
  children: any;
  /**
   * orientation
   * Default is Vertical
   */
  orientation?: 'VERTICAL' | 'HORIZONTAL';
  /**
   * LinearLayoutWidget.Gravity
   */
  gravity?: number;
  separator?: {
    padding: number;
    color: string;
  };
}

export function LinearLayoutWidget({ children }: LinearLayoutWidgetProps) {
  return children;
}
LinearLayoutWidget.__name__ = 'LinearLayoutWidget';
LinearLayoutWidget.convertProps = (
  props: LinearLayoutWidgetProps
): LinearLayoutWidgetInternalProps => {
  const internalProps: CommonInternalProps = convertCommonProps(props);
  return {
    ...internalProps,
    ...(props.orientation ? { orientation: props.orientation } : {}),
    ...(props.gravity ? { gravity: props.gravity } : {}),
    ...(props.separator ? { separator: props.separator } : {}),
  };
};
LinearLayoutWidget.Gravity = {
  FILL: 119,
  FILL_HORIZONTAL: 7,
  FILL_VERTICAL: 112,
  START: 8388611,
  END: 8388613,
  LEFT: 3,
  RIGHT: 5,
  TOP: 48,
  BOTTOM: 80,
  CENTER: 17,
  CENTER_HORIZONTAL: 1,
  CENTER_VERTICAL: 16,
};
