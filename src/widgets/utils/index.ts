import type { CommonInternalProps, CommonProps } from '../common.props';

export function buildMargin(
  props: CommonProps,
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

export function buildPadding(
  props: CommonProps,
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
