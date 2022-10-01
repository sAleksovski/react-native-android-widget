import type { CommonInternalProps } from '../common.props';
import { buildBorder, buildMargin, buildPadding } from '../utils';
import type { CommonStyleProps } from './style.types';

export function convertCommonStyle(
  style: CommonStyleProps
): CommonInternalProps {
  const internalProps: CommonInternalProps = {};

  copyProp(style, internalProps, 'height');
  copyProp(style, internalProps, 'width');
  copyProp(style, internalProps, 'backgroundColor');
  copyProp(style, internalProps, 'backgroundGradient');
  copyProp(style, internalProps, 'radius');
  copyProp(style, internalProps, 'rotation');

  buildMargin(style, internalProps);
  buildPadding(style, internalProps);
  buildBorder(style, internalProps);

  return internalProps;
}

function copyProp(
  style: CommonStyleProps,
  internalProps: CommonInternalProps,
  propName: keyof CommonStyleProps
) {
  if (propName in style) {
    // @ts-ignore
    internalProps[propName] = style[propName];
  }
}
