import {
  convertClickAction,
  type ClickActionProps,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type {
  ColorProp,
  CommonStyleProps,
  HexColor,
} from './utils/style.props';
import { convertColor, convertCommonStyle } from './utils/style.utils';

interface TextWidgetInternalProps extends CommonInternalProps {
  text: string;
  fontSize: number;
  allowFontScaling: boolean;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic';
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  adjustsFontSizeToFit?: boolean;
  textAlign?: 'center' | 'left' | 'right';
  letterSpacing?: number;
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

export interface TextWidgetStyle extends CommonStyleProps {
  color?: ColorProp;
  fontSize?: number;
  fontFamily?: string | undefined;
  fontStyle?: 'normal' | 'italic';
  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported
   * for most fonts. Not all fonts have a variant for each of the numeric
   * values, in that case the closest one is chosen.
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  adjustsFontSizeToFit?: boolean;
  textAlign?: 'center' | 'left' | 'right';
  letterSpacing?: number;

  textShadowColor?: ColorProp;
  textShadowRadius?: number;
  textShadowOffset?: { height: number; width: number };
}

export interface TextWidgetProps extends ClickActionProps {
  style?: TextWidgetStyle;

  /**
   * Text to show
   */
  text: string;

  /**
   * How to truncate the text if it cannot fit
   */
  truncate?: 'START' | 'MIDDLE' | 'END';

  /**
   * Maximum number of lines to if text overflows in next line
   */
  maxLines?: number;

  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings.
   * @default true
   */
  allowFontScaling?: boolean;
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
    allowFontScaling: props.allowFontScaling ?? true,
    ...(props.style?.fontFamily ? { fontFamily: props.style.fontFamily } : {}),
    ...(props.style?.fontStyle ? { fontStyle: props.style.fontStyle } : {}),
    ...(props.style?.fontWeight ? { fontWeight: props.style.fontWeight } : {}),
    ...(props.style?.textAlign ? { textAlign: props.style.textAlign } : {}),
    ...(props.style?.letterSpacing
      ? { letterSpacing: props.style.letterSpacing }
      : {}),
    ...(props.style?.adjustsFontSizeToFit
      ? { adjustsFontSizeToFit: props.style.adjustsFontSizeToFit }
      : {}),
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
