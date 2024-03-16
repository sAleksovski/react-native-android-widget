---
sidebar_position: 7
---

# SvgWidget

Widget for displaying SVG.
It supports importing an SVG file, using an SVG string, or a path to network svg file;

## Usage

```tsx
import { FlexWidget, SvgWidget } from 'react-native-android-widget';

const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 300 300">
  ...
</svg>
`;

export function MyWidget() {
  return (
    <FlexWidget>
      <SvgWidget
        // highlight-next-line
        svg={require('../assets/SVG_Logo.svg')}
        style={{ height: 72, width: 72 }}
      />

      <SvgWidget
        // highlight-next-line
        svg={svgString}
        style={{ height: 72, width: 72 }}
      />

      <SvgWidget
        // highlight-next-line
        svg="https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
        style={{ height: 72, width: 72 }}
      />
    </FlexWidget>
  );
}
```

## Props

Check the props in the [Public API](/docs/public-api/interfaces/SvgWidgetProps) documentation
