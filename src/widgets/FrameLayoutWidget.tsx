import {
  CommonInternalProps,
  CommonProps,
  convertCommonProps,
} from './common.props';

interface FrameLayoutWidgetInternalProps extends CommonInternalProps {
  children: any;
}

interface FrameLayoutWidgetProps extends CommonProps {
  children: any;
}

export function FrameLayoutWidget({ children }: FrameLayoutWidgetProps) {
  return children;
}
FrameLayoutWidget.__name__ = 'FrameLayoutWidget';
FrameLayoutWidget.convertProps = (
  props: FrameLayoutWidgetProps
): FrameLayoutWidgetInternalProps => {
  const internalProps: CommonInternalProps = convertCommonProps(props);
  return { ...internalProps, children: props.children };
};
