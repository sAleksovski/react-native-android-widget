export interface MarginStyleProps {
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export interface PaddingStyleProps {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export interface BorderStyleProps {
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;

  borderColor?: string;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;

  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;

  borderStyle?: 'solid' | 'dotted' | 'dashed';
}

export interface SizeStyleProps {
  height?: 'wrap_content' | 'match_parent' | number;
  width?: 'wrap_content' | 'match_parent' | number;
}

export interface BackgroundStyleProps {
  /**
   * #RRGGBB or #AARRGGBB
   */
  backgroundColor?: string;
  backgroundGradient?: {
    /**
     * #RRGGBB or #AARRGGBB
     */
    from: string;
    /**
     * #RRGGBB or #AARRGGBB
     */
    to: string;
    orientation:
      | 'TOP_BOTTOM'
      | 'TR_BL'
      | 'RIGHT_LEFT'
      | 'BR_TL'
      | 'BOTTOM_TOP'
      | 'BL_TR'
      | 'LEFT_RIGHT'
      | 'TL_BR';
  };
}

export interface OtherStyleProps {
  rotation?: number;
}

export interface CommonStyleProps
  extends MarginStyleProps,
    PaddingStyleProps,
    SizeStyleProps,
    BackgroundStyleProps,
    BorderStyleProps,
    OtherStyleProps {}
