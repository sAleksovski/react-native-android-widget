import type { FrameLayoutWidgetInternalProps } from './widgets/FrameLayoutWidget';
import type { IconWidgetInternalProps } from './widgets/IconWidget';
import type { ImageWidgetInternalProps } from './widgets/ImageWidget';
import type { LinearLayoutWidgetInternalProps } from './widgets/LinearLayoutWidget';
import type { TextWidgetInternalProps } from './widgets/TextWidet';

interface FrameLayoutNode {
  type: 'FrameLayoutWidget';
  props: FrameLayoutWidgetInternalProps;
  children: WidgetTree[];
}

interface IconNode {
  type: 'IconWidget';
  props: IconWidgetInternalProps;
}

interface ImageNode {
  type: 'ImageWidget';
  props: ImageWidgetInternalProps;
}

interface LinearLayoutNode {
  type: 'LinearLayoutWidget';
  props: LinearLayoutWidgetInternalProps;
  children: WidgetTree[];
}

interface TextNode {
  type: 'TextWidget';
  props: TextWidgetInternalProps;
}

export type WidgetTree =
  | FrameLayoutNode
  | IconNode
  | ImageNode
  | LinearLayoutNode
  | TextNode;

export function buildTree(jsxTree: JSX.Element): WidgetTree {
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
