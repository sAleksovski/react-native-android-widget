import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

export type OverlapWidgetInternalProps = CommonInternalProps;

type OverlapWidgetStyle = CommonStyleProps;

interface OverlapWidgetProps {
  children?: any;
  style?: OverlapWidgetStyle;
  clickAction?: string;
}

export function OverlapWidget({ children }: OverlapWidgetProps) {
  return children;
}
OverlapWidget.__name__ = 'FrameLayoutWidget';
OverlapWidget.convertProps = (
  props: OverlapWidgetProps
): OverlapWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...(props.clickAction ? { clickAction: props.clickAction } : {}),
  };
};
