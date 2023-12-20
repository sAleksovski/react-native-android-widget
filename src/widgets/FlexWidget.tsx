import {
  type ClickActionProps,
  convertClickAction,
} from './utils/click-action';
import type { CommonInternalProps } from './utils/common-internal.props';
import type { ColorProp, CommonStyleProps } from './utils/style.props';
import { convertColor, convertCommonStyle } from './utils/style.utils';

const GRAVITY = {
  START: 8388611,
  END: 8388613,
  TOP: 48,
  BOTTOM: 80,
  CENTER_HORIZONTAL: 1,
  CENTER_VERTICAL: 16,
};

interface FlexWidgetInternalProps extends CommonInternalProps {
  orientation?: 'VERTICAL' | 'HORIZONTAL';
  gravity?: number;
  separator?: {
    size: number;
    color: string;
  };
  overflow?: 'hidden';
}

interface FlexStyleProps {
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
  flexGap?: number;
  flexGapColor?: ColorProp;
  overflow?: 'hidden';
}

export interface FlexWidgetStyle extends FlexStyleProps, CommonStyleProps {}

export interface FlexWidgetProps extends ClickActionProps {
  children?: any;
  style?: FlexWidgetStyle;
}

export function FlexWidget({ children }: FlexWidgetProps) {
  return children;
}
FlexWidget.__name__ = 'LinearLayoutWidget';
FlexWidget.convertProps = (props: FlexWidgetProps): FlexWidgetInternalProps => {
  return {
    ...convertCommonStyle(props.style ?? {}),
    ...convertFlexStyle(props.style ?? {}),
    ...convertClickAction(props),
    ...(props.style?.flexGap
      ? {
          separator: {
            size: props.style.flexGap,
            color: convertColor(props.style.flexGapColor ?? '#ffffff00'),
          },
        }
      : {}),
    ...(props?.style?.overflow ? { overflow: props.style.overflow } : {}),
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

function convertFlexStyle(style: FlexStyleProps): FlexWidgetInternalProps {
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
