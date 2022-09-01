import type { CommonInternalProps } from '../common.props';
import type { CommonStyleProps } from './style.types';
import { convertCommonStyle } from './style.utils';

const GRAVITY = {
  START: 8388611,
  END: 8388613,
  TOP: 48,
  BOTTOM: 80,
  CENTER_HORIZONTAL: 1,
  CENTER_VERTICAL: 16,
};

export interface FlexWidgetInternalProps extends CommonInternalProps {
  orientation?: 'VERTICAL' | 'HORIZONTAL';
  gravity?: number;
  // TODO
  // separator?: {
  //   padding: number;
  //   color: string;
  // };
}

export interface FlexStyleProps {
  flex?: number;
  flexDirection?: 'row' | 'column';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  // TODO
  // flexGap?: number;
}

interface FlexWidgetStyle extends FlexStyleProps, CommonStyleProps {}

interface FlexWidgetProps {
  children?: any;
  style?: FlexWidgetStyle;
  clickAction?: string;
}

export function FlexWidget({ children }: FlexWidgetProps) {
  return children;
}
FlexWidget.__name__ = 'LinearLayoutWidget';
FlexWidget.convertProps = (props: FlexWidgetProps): FlexWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertFlexStyles(props.style ?? {}),
  };
};
FlexWidget.processChildren = (
  { style }: FlexWidgetProps,
  children: any[]
): any[] => {
  if (
    style?.justifyContent &&
    ['space-around', 'space-between', 'space-evenly'].includes(
      style.justifyContent
    )
  ) {
    const betweenFlex = style.justifyContent === 'space-around' ? 2 : 1;
    const showBeforeAndAfter = style.justifyContent !== 'space-between';

    const newChildren = children.reduce((memo, item, index) => {
      if (index > 0) {
        return [...memo, createSeparator(betweenFlex), item];
      }
      return [...memo, item];
    }, []);

    if (showBeforeAndAfter) {
      return [createSeparator(1), ...newChildren, createSeparator(1)];
    }

    return newChildren;
  }
  return children;
};

function createSeparator(betweenFlex: number): any {
  return {
    type: FlexWidget,
    props: {
      children: [],
      style: {
        flex: betweenFlex,
      },
    },
  };
}

function convertFlexStyles(style: FlexStyleProps): FlexWidgetInternalProps {
  return {
    orientation: style.flexDirection === 'row' ? 'HORIZONTAL' : 'VERTICAL',
    ...(style.flex ? { weight: style.flex } : {}),
    gravity: getGravity(style),
  };
}

function getGravity({
  flexDirection,
  justifyContent,
  alignItems,
}: FlexWidgetStyle) {
  let gravity = GRAVITY.START;

  switch (flexDirection === 'row' ? justifyContent : alignItems) {
    case 'flex-start':
      gravity = GRAVITY.START;
      break;

    case 'center':
      gravity = GRAVITY.CENTER_HORIZONTAL;
      break;

    case 'flex-end':
      gravity = GRAVITY.END;
      break;

    default:
      break;
  }

  switch (flexDirection === 'row' ? alignItems : justifyContent) {
    case 'flex-start':
      gravity |= GRAVITY.TOP;
      break;

    case 'center':
      gravity |= GRAVITY.CENTER_VERTICAL;
      break;

    case 'flex-end':
      gravity |= GRAVITY.BOTTOM;
      break;

    default:
      break;
  }
  return gravity;
}
