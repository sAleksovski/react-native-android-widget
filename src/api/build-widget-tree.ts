import type { FlexWidgetInternalProps } from '../widgets/FlexWidget';
import type { IconWidgetInternalProps } from '../widgets/IconWidget';
import type { ImageWidgetInternalProps } from '../widgets/ImageWidget';
import type { OverlapWidgetInternalProps } from '../widgets/OverlapWidget';
import type { SvgWidgetInternalProps } from '../widgets/SvgWidget';
import type { TextWidgetInternalProps } from '../widgets/TextWidet';

interface IconNode {
  type: 'IconWidget';
  props: IconWidgetInternalProps;
}

interface ImageNode {
  type: 'ImageWidget';
  props: ImageWidgetInternalProps;
}

interface SvgNode {
  type: 'SvgWidget';
  props: SvgWidgetInternalProps;
}

interface TextNode {
  type: 'TextWidget';
  props: TextWidgetInternalProps;
}

interface FlexNode {
  type: 'FlexWidget';
  props: FlexWidgetInternalProps;
  children: WidgetTree[];
}

interface OverlapNode {
  type: 'OverlapWidget';
  props: OverlapWidgetInternalProps;
  children: WidgetTree[];
}

export type WidgetTree =
  | FlexNode
  | OverlapNode
  | IconNode
  | ImageNode
  | SvgNode
  | TextNode;

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
