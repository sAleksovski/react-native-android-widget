import { buildMargin, buildPadding } from './utils';

interface CommonCommonProps {
  height?: 'wrap_content' | 'match_parent' | number;
  width?: 'wrap_content' | 'match_parent' | number;
  weight?: number;
  clickAction?: string;
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
}

export interface CommonInternalProps extends CommonCommonProps {
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
}

export interface CommonProps extends CommonCommonProps {
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;

  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export function convertCommonProps(props: CommonProps): CommonInternalProps {
  const internalProps: CommonInternalProps = {};

  copyProp(props, internalProps, 'height');
  copyProp(props, internalProps, 'width');
  copyProp(props, internalProps, 'weight');
  copyProp(props, internalProps, 'clickAction');
  copyProp(props, internalProps, 'backgroundColor');
  copyProp(props, internalProps, 'backgroundGradient');
  copyProp(props, internalProps, 'radius');
  copyProp(props, internalProps, 'rotation');

  buildMargin(props, internalProps);
  buildPadding(props, internalProps);

  return internalProps;
}

function copyProp(
  props: CommonCommonProps,
  internalProps: CommonCommonProps,
  propName: keyof CommonCommonProps
) {
  if (propName in props) {
    // @ts-ignore
    internalProps[propName] = props[propName];
  }
}
