export interface WidgetTree {
  type:
    | 'FlexWidget'
    | 'IconWidget'
    | 'ImageWidget'
    | 'ListWidget'
    | 'OverlapWidget'
    | 'SvgWidget'
    | 'TextWidget';
  props: unknown;
  children?: WidgetTree[];
}

export function buildWidgetTree(jsxTree: JSX.Element): WidgetTree {
  const widgetTree = buildWidgetTreeInner(jsxTree);

  validateWidgetTree(widgetTree);

  return widgetTree;
}

function buildWidgetTreeInner(jsxTree: JSX.Element): WidgetTree {
  if (typeof jsxTree === 'string' || typeof jsxTree === 'number') {
    return jsxTree;
  }

  while (!jsxTree.type.__name__) {
    jsxTree = jsxTree.type(jsxTree.props);
  }

  const { children, ...otherProps } = jsxTree.props;

  const childrenArray = children
    ? Array.isArray(children)
      ? children
      : [children]
    : [];

  const updatedChildren: any[] =
    jsxTree.type.processChildren?.(otherProps, childrenArray) ??
    childrenArray ??
    [];

  return {
    type: jsxTree.type.__name__,
    props: jsxTree.type.convertProps(otherProps),
    ...(updatedChildren
      ? {
          children: updatedChildren
            .filter((x) => !!x)
            .flat(1)
            .map((x) => buildWidgetTree(x))
            .flat(1),
        }
      : {}),
  };
}

function validateWidgetTree(widgetTree: WidgetTree): void {
  throwIfNestedListWidget(widgetTree, false);

  const listWidgetCount = countListWidgets(widgetTree);

  if (listWidgetCount > 2) {
    throw new Error('You can have a maximum of two ListWidget(s)');
  }
}

function throwIfNestedListWidget(
  widgetTree: WidgetTree,
  shouldThrow: boolean = false
): void {
  if (widgetTree.type === 'ListWidget') {
    if (shouldThrow) {
      throw new Error('You cannot have ListWidget inside other ListWidget');
    }

    (widgetTree.children ?? []).forEach((child) =>
      throwIfNestedListWidget(child, true)
    );
  }

  (widgetTree.children ?? []).forEach((child) =>
    throwIfNestedListWidget(child, shouldThrow)
  );
}

function countListWidgets(widgetTree: WidgetTree): number {
  if (widgetTree.type === 'ListWidget') {
    return 1;
  }

  return (widgetTree.children ?? []).reduce(
    (memo, child) => memo + countListWidgets(child),
    0
  );
}
