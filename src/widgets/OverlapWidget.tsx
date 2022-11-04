import { ClickActionProps, convertClickAction } from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

export type OverlapWidgetInternalProps = CommonInternalProps;

type OverlapWidgetStyle = CommonStyleProps;

interface OverlapWidgetProps extends ClickActionProps {
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
