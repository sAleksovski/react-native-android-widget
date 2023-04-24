---
sidebar_position: 6
---

# IconWidget

Widget for displaying icons.

## Usage

```tsx
import { FlexWidget, IconWidget } from 'react-native-android-widget';

export function MyWidget() {
  return (
    <FlexWidget>
      <IconWidget font="material" size={36} icon="play_arrow" />
    </FlexWidget>
  );
}
```

## Fonts

Icon widget supports custom fonts, but we must provide the font file.

### Bare React Native

To use a custom icon font in bare React Native app we must copy the font file(s) to `android/app/src/main/assets/fonts`. The `font` prop will match the file by name.

For example, `android/app/src/main/assets/fonts/material.ttf`

### Expo

To use a custom font in an Expo app, we can add them in the assets directory.

For example, `assets/fonts/material.ttf`

Then, when using the config plugin we must provide a list of all the custom fonts we need.

```ts
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Expo App Name',
  plugins: [
    ['react-native-android-widget', {
      fonts: ['./assets/fonts/material.ttf'],
      widgets: [...],
    }]
  ],
});
```

## Props

Check the props in the [Public API](/docs/public-api/interfaces/IconWidgetProps) documentation
