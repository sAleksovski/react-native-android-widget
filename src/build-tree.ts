export function buildTree(jsxTree: JSX.Element): any {
  if (typeof jsxTree === 'string' || typeof jsxTree === 'number') {
    return jsxTree;
  }

  while (!jsxTree.type.__name__) {
    jsxTree = jsxTree.type(jsxTree.props);
  }

  const { children, ...otherProps } = jsxTree.props;

  return {
    type: jsxTree.type.__name__,
    props: jsxTree.type.convertProps(otherProps),
    ...(children
      ? {
          children: (Array.isArray(children) ? children : [children])
            .filter((x) => !!x)
            .map((x) => buildTree(x))
            .flat(1),
        }
      : {}),
  };
}
