import type { CommonInternalProps } from './utils/common-internal.props';
import type { CommonStyleProps } from './utils/style.props';
import { convertCommonStyle } from './utils/style.utils';

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

interface TextWidgetStyle extends CommonStyleProps {
  color?: string;
  fontSize?: number;

  textShadowColor?: string;
  textShadowRadius?: number;
  textShadowOffset?: { height: number; width: number };
}

interface TextWidgetProps {
  style?: TextWidgetStyle;
  clickAction?: string;
  children?: never;

  text: string;

  truncate?: 'START' | 'MIDDLE' | 'END';
  maxLines?: number;
}

export function TextWidget(_: TextWidgetProps) {
  return null;
}
TextWidget.convertProps = (props: TextWidgetProps): TextWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    text: props.text,
    fontSize: props.style?.fontSize ?? 12,
    ...(props.style?.color ? { color: props.style?.color } : {}),
    ...buildTextShadow(props.style ?? {}),
    ...(props.truncate ? { truncate: props.truncate } : {}),
    ...(props.maxLines ? { maxLines: props.maxLines } : {}),
  };
};
TextWidget.__name__ = 'TextWidget';

function buildTextShadow(
  style: TextWidgetStyle
): Partial<TextWidgetInternalProps> {
  if (
    'textShadowColor' in style ||
    'textShadowRadius' in style ||
    'textShadowOffset' in style
  ) {
    return {
      shadow: {
        radius: style.textShadowRadius ?? 0,
        dx: style.textShadowOffset?.width ?? 0,
        dy: style.textShadowOffset?.height ?? 0,
        color: style.textShadowColor ?? '#fff',
      },
    };
  }

  return {};
}
