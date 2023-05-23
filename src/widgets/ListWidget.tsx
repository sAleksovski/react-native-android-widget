import type { CommonInternalProps } from './utils/common-internal.props';
import type {
  BackgroundStyleProps,
  BorderStyleProps,
  MarginStyleProps,
  SizeStyleProps,
} from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

interface ListWidgetInternalProps extends CommonInternalProps {}

export interface ListWidgetStyle
  extends MarginStyleProps,
    SizeStyleProps,
    BackgroundStyleProps,
    Omit<BorderStyleProps, `${string}Radius`> {}

export interface ListWidgetProps {
  children?: any;
  style?: ListWidgetStyle;
}

export function ListWidget({ children }: ListWidgetProps) {
  return children;
}
ListWidget.__name__ = 'ListWidget';
ListWidget.convertProps = (props: ListWidgetProps): ListWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    height: props.style?.height ?? 'match_parent',
    width: props.style?.width ?? 'match_parent',
  };
};
