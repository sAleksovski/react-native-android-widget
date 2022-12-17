export interface WidgetTree {
  type:
    | 'IconWidget'
    | 'ImageWidget'
    | 'SvgWidget'
    | 'TextWidget'
    | 'FlexWidget'
    | 'OverlapWidget';
  props: unknown;
}

export function buildWidgetTree(jsxTree: JSX.Element): WidgetTree {
  if (typeof jsxTree === 'string' || typeof jsxTree === 'number') {
    return jsxTree;
  }

  while (!jsxTree.type.__name__) {
    jsxTree = jsxTree.type(jsxTree.props);
  }

  const { children, ...otherProps } = jsxTree.props;

  const updatedChildren =
    jsxTree.type.processChildren?.(otherProps, children ?? []) ??
    children ??
    [];

  return {
    type: jsxTree.type.__name__,
    props: jsxTree.type.convertProps(otherProps),
    ...(updatedChildren
      ? {
          children: (Array.isArray(updatedChildren)
            ? updatedChildren
            : [updatedChildren]
          )
            .filter((x) => !!x)
            .map((x) => buildWidgetTree(x))
            .flat(1),
        }
      : {}),
  };
}
