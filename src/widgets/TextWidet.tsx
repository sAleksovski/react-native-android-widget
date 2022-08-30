import {
  CommonInternalProps,
  CommonProps,
  convertCommonProps,
} from './common.props';

export interface TextWidgetInternalProps extends CommonInternalProps {
  text: string;
  fontSize: number;
  /**
   * #RRGGBB or #AARRGGBB
   * Default is #000
   */
  color?: string;
  shadow?: {
    radius: number;
    dx: number;
    dy: number;
    color: string;
  };
  truncate?: 'START' | 'MIDDLE' | 'END';
  maxLines?: number;
}

interface TextWidgetProps extends CommonProps {
  text: string;
  fontSize: number;
  /**
   * #RRGGBB or #AARRGGBB
   * Default is #000
   */
  color?: string;
  shadow?: {
    radius: number;
    dx: number;
    dy: number;
    color: string;
  };
  truncate?: 'START' | 'MIDDLE' | 'END';
  maxLines?: number;
  children?: never;
}

export function TextWidget(_: TextWidgetProps) {
  return null;
}
TextWidget.convertProps = (props: TextWidgetProps): TextWidgetInternalProps => {
  const internalProps: CommonInternalProps = convertCommonProps(props);
  return {
    ...internalProps,
    text: props.text,
    fontSize: props.fontSize,
    ...(props.color ? { color: props.color } : {}),
    ...(props.shadow ? { shadow: props.shadow } : {}),
    ...(props.truncate ? { truncate: props.truncate } : {}),
    ...(props.maxLines ? { maxLines: props.maxLines } : {}),
  };
};
TextWidget.__name__ = 'TextWidget';
