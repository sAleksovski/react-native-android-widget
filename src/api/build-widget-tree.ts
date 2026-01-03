import * as React from 'react';

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

export function buildWidgetTree(jsxTree: React.JSX.Element): WidgetTree {
  try {
    const widgetTree = buildWidgetTreeInner(jsxTree);

    validateWidgetTree(widgetTree);

    return widgetTree;
  } catch (error: any) {
    if (error.message && error.message.includes('Invalid hook call')) {
      const widgetName = jsxTree.type?.name ?? 'your widget';
      throw new Error(`Widget Error: Invalid Hook Call detected in ${widgetName}.
Possible causes:
1. You are using hooks (useState, useEffect) which are not supported.
2. The React Compiler (React 19) is transforming this component, but this library requires raw functions.
   Fix: Add "use no memo"; at the very top of your widget file to disable the compiler for this file.`);
    }
    throw error;
  }
}

function buildWidgetTreeInner(jsxTree: React.JSX.Element): WidgetTree {
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
