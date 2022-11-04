import { ClickActionProps, convertClickAction } from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type {
  ColorProp,
  CommonStyleProps,
  HexColor,
} from './utils/style.props';
import { convertColor, convertCommonStyle } from './utils/style.utils';

export interface TextWidgetInternalProps extends CommonInternalProps {
  text: string;
  fontSize: number;
  color?: HexColor;
  shadow?: {
    radius: number;
    dx: number;
    dy: number;
    color: HexColor;
  };
  truncate?: 'START' | 'MIDDLE' | 'END';
  maxLines?: number;
}

interface TextWidgetStyle extends CommonStyleProps {
  color?: ColorProp;
  fontSize?: number;

  textShadowColor?: ColorProp;
  textShadowRadius?: number;
  textShadowOffset?: { height: number; width: number };
}

interface TextWidgetProps extends ClickActionProps {
  style?: TextWidgetStyle;
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
    ...convertClickAction(props),
    text: props.text,
    fontSize: props.style?.fontSize ?? 12,
    ...(props.style?.color ? { color: convertColor(props.style.color) } : {}),
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
        color: convertColor(style.textShadowColor ?? '#fff'),
      },
    };
  }

  return {};
}
