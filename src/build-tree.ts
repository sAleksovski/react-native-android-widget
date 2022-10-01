import type { FrameLayoutWidgetInternalProps } from './widgets/FrameLayoutWidget';
import type { IconWidgetInternalProps } from './widgets/IconWidget';
import type { ImageWidgetInternalProps } from './widgets/ImageWidget';
import type { TextWidgetInternalProps } from './widgets/TextWidet';
import type { FlexWidgetInternalProps } from './widgets/v2/FlexWidget';

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

interface FlexNode {
  type: 'FlexWidget';
  props: FlexWidgetInternalProps;
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
  | FlexNode
  | TextNode;

export function buildTree(jsxTree: JSX.Element): WidgetTree {
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
            .map((x) => buildTree(x))
            .flat(1),
        }
      : {}),
  };
}
