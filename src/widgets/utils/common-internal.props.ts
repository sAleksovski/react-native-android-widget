export interface CommonInternalProps {
  height?: 'wrap_content' | 'match_parent' | number;
  width?: 'wrap_content' | 'match_parent' | number;
  weight?: number;
  clickAction?: string;
  clickActionData?: Record<string, unknown>;
  /**
   * #RRGGBB or #AARRGGBB
   */
  backgroundColor?: string;
  backgroundGradient?: {
    from: string;
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
  radius?: number;
  rotation?: number;

  margin?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  padding?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  borderWidth?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  borderColor?: {
    left: string;
    top: string;
    right: string;
    bottom: string;
  };
  borderRadius?: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
  borderStyle?: 'solid' | 'dotted' | 'dashed';
}
