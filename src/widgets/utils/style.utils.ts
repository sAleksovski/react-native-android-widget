import type { CommonInternalProps } from './common-internal.props';
import type { CommonStyleProps } from './style.props';

export function convertCommonStyle(
  style: CommonStyleProps
): CommonInternalProps {
  const internalProps: CommonInternalProps = {};

  copyProp(style, internalProps, 'height');
  copyProp(style, internalProps, 'width');
  copyProp(style, internalProps, 'backgroundColor');
  copyProp(style, internalProps, 'backgroundGradient');
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

function buildMargin(
  props: CommonStyleProps,
  internalProps: CommonInternalProps
): CommonInternalProps {
  if ('margin' in props) {
    const margin = getMargin(internalProps);
    margin.top = props.margin ?? 0;
    margin.right = props.margin ?? 0;
    margin.bottom = props.margin ?? 0;
    margin.left = props.margin ?? 0;
  }

  if ('marginHorizontal' in props) {
    const margin = getMargin(internalProps);
    margin.right = props.marginHorizontal ?? 0;
    margin.left = props.marginHorizontal ?? 0;
  }

  if ('marginVertical' in props) {
    const margin = getMargin(internalProps);
    margin.top = props.marginVertical ?? 0;
    margin.bottom = props.marginVertical ?? 0;
  }

  if ('marginTop' in props) {
    const margin = getMargin(internalProps);
    margin.top = props.marginTop ?? 0;
  }

  if ('marginRight' in props) {
    const margin = getMargin(internalProps);
    margin.right = props.marginRight ?? 0;
  }

  if ('marginBottom' in props) {
    const margin = getMargin(internalProps);
    margin.bottom = props.marginBottom ?? 0;
  }

  if ('marginLeft' in props) {
    const margin = getMargin(internalProps);
    margin.left = props.marginLeft ?? 0;
  }

  return internalProps;
}

function getMargin(internalProps: CommonInternalProps) {
  internalProps.margin = internalProps.margin ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return internalProps.margin;
}

function buildPadding(
  props: CommonStyleProps,
  internalProps: CommonInternalProps
): CommonInternalProps {
  if ('padding' in props) {
    const padding = getPadding(internalProps);
    padding.top = props.padding ?? 0;
    padding.right = props.padding ?? 0;
    padding.bottom = props.padding ?? 0;
    padding.left = props.padding ?? 0;
  }

  if ('paddingHorizontal' in props) {
    const padding = getPadding(internalProps);
    padding.right = props.paddingHorizontal ?? 0;
    padding.left = props.paddingHorizontal ?? 0;
  }

  if ('paddingVertical' in props) {
    const padding = getPadding(internalProps);
    padding.top = props.paddingVertical ?? 0;
    padding.bottom = props.paddingVertical ?? 0;
  }

  if ('paddingTop' in props) {
    const padding = getPadding(internalProps);
    padding.top = props.paddingTop ?? 0;
  }

  if ('paddingRight' in props) {
    const padding = getPadding(internalProps);
    padding.right = props.paddingRight ?? 0;
  }

  if ('paddingBottom' in props) {
    const padding = getPadding(internalProps);
    padding.bottom = props.paddingBottom ?? 0;
  }

  if ('paddingLeft' in props) {
    const padding = getPadding(internalProps);
    padding.left = props.paddingLeft ?? 0;
  }

  return internalProps;
}

function getPadding(internalProps: CommonInternalProps) {
  internalProps.padding = internalProps.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return internalProps.padding;
}

function buildBorder(
  props: CommonStyleProps,
  internalProps: CommonInternalProps
): CommonInternalProps {
  if ('borderWidth' in props) {
    const borderWidth = getBorderWidth(internalProps);
    borderWidth.top = props.borderWidth ?? 0;
    borderWidth.right = props.borderWidth ?? 0;
    borderWidth.bottom = props.borderWidth ?? 0;
    borderWidth.left = props.borderWidth ?? 0;
  }

  if ('borderTopWidth' in props) {
    const borderWidth = getBorderWidth(internalProps);
    borderWidth.top = props.borderTopWidth ?? 0;
  }

  if ('borderRightWidth' in props) {
    const borderWidth = getBorderWidth(internalProps);
    borderWidth.right = props.borderRightWidth ?? 0;
  }

  if ('borderBottomWidth' in props) {
    const borderWidth = getBorderWidth(internalProps);
    borderWidth.bottom = props.borderBottomWidth ?? 0;
  }

  if ('borderLeftWidth' in props) {
    const borderWidth = getBorderWidth(internalProps);
    borderWidth.left = props.borderLeftWidth ?? 0;
  }

  if ('borderColor' in props) {
    const borderColor = getBorderColor(internalProps);
    borderColor.top = props.borderColor ?? '#ffffffff';
    borderColor.right = props.borderColor ?? '#ffffffff';
    borderColor.bottom = props.borderColor ?? '#ffffffff';
    borderColor.left = props.borderColor ?? '#ffffffff';
  }

  if ('borderTopColor' in props) {
    const borderColor = getBorderColor(internalProps);
    borderColor.top = props.borderTopColor ?? '#ffffffff';
  }

  if ('borderRightColor' in props) {
    const borderColor = getBorderColor(internalProps);
    borderColor.right = props.borderRightColor ?? '#ffffffff';
  }

  if ('borderBottomColor' in props) {
    const borderColor = getBorderColor(internalProps);
    borderColor.bottom = props.borderBottomColor ?? '#ffffffff';
  }

  if ('borderLeftColor' in props) {
    const borderColor = getBorderColor(internalProps);
    borderColor.left = props.borderLeftColor ?? '#ffffffff';
  }

  if ('borderRadius' in props) {
    const borderRadius = getBorderRadius(internalProps);
    borderRadius.topLeft = props.borderRadius ?? 0;
    borderRadius.topRight = props.borderRadius ?? 0;
    borderRadius.bottomLeft = props.borderRadius ?? 0;
    borderRadius.bottomRight = props.borderRadius ?? 0;
  }

  if ('borderTopLeftRadius' in props) {
    const borderRadius = getBorderRadius(internalProps);
    borderRadius.topLeft = props.borderTopLeftRadius ?? 0;
  }

  if ('borderTopRightRadius' in props) {
    const borderRadius = getBorderRadius(internalProps);
    borderRadius.topRight = props.borderTopRightRadius ?? 0;
  }

  if ('borderBottomLeftRadius' in props) {
    const borderRadius = getBorderRadius(internalProps);
    borderRadius.bottomLeft = props.borderBottomLeftRadius ?? 0;
  }

  if ('borderBottomRightRadius' in props) {
    const borderRadius = getBorderRadius(internalProps);
    borderRadius.bottomRight = props.borderBottomRightRadius ?? 0;
  }

  if ('borderStyle' in props) {
    internalProps.borderStyle = props.borderStyle;
  }

  return internalProps;
}

function getBorderWidth(internalProps: CommonInternalProps) {
  internalProps.borderWidth = internalProps.borderWidth ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return internalProps.borderWidth;
}

function getBorderColor(internalProps: CommonInternalProps) {
  internalProps.borderColor = internalProps.borderColor ?? {
    top: '#ffffffff',
    right: '#ffffffff',
    bottom: '#ffffffff',
    left: '#ffffffff',
  };
  return internalProps.borderColor;
}

function getBorderRadius(internalProps: CommonInternalProps) {
  internalProps.borderRadius = internalProps.borderRadius ?? {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };
  return internalProps.borderRadius;
}
