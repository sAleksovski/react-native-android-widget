import {
  convertClickAction,
  type ClickActionProps,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

type OverlapWidgetInternalProps = CommonInternalProps;

export type OverlapWidgetStyle = CommonStyleProps;

export interface OverlapWidgetProps extends ClickActionProps {
  children?: any;
  style?: OverlapWidgetStyle;
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
    ...convertClickAction(props),
  };
};
