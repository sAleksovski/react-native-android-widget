import type { CommonInternalProps } from '../common.props';
import type { CommonStyleProps } from './style.types';
import { convertCommonStyle } from './style.utils';

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
  return convertCommonStyle(props.style ?? {});
};
