---
sidebar_position: 4
---

# ImageWidget

Widget for displaying different types of images, including network images, `data:/image` images, and static resources.

## Usage

```tsx
import { FlexWidget, ImageWidget } from 'react-native-android-widget';

export function MyWidget() {
  return (
    <FlexWidget>
      <ImageWidget
        image={require('../assets/image-file.jpg')}
        imageWidth={88}
        imageHeight={88}
      />
    </FlexWidget>
  );
}
```

## Props

Check the props in the [Public API](/docs/public-api/interfaces/ImageWidgetProps) documentation
