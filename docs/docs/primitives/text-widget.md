---
sidebar_position: 5
---

# TextWidget

Widget for displaying text.

## Usage

```tsx
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function MyWidget() {
  return (
    <FlexWidget>
      <TextWidget
        text="Hello"
        style={{
          fontSize: 32,
          fontFamily: 'Inter',
          color: '#000000',
        }}
      />
    </FlexWidget>
  );
}
```

## Fonts

Text widget supports custom fonts, but we must provide the font file.

### Bare React Native

To use a custom font in bare React Native app we must copy the font file(s) to `android/app/src/main/assets/fonts`. The `fontFamily` style prop will match the file by name.

For example, `android/app/src/main/assets/fonts/Inter.ttf`

### Expo

To use a custom font in an Expo app, we can add them in the assets directory.

For example, `assets/fonts/Inter.ttf`

Then, when using the config plugin we must provide a list of all the custom fonts we need.

```ts
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Expo App Name',
  plugins: [
    ['react-native-android-widget', {
      fonts: ['./assets/fonts/Inter.ttf'],
      widgets: [...],
    }]
  ],
});
```

## Example

Check the [example widget](https://github.com/sAleksovski/react-native-android-widget/blob/master/example/src/widgets/RotatedWidget.tsx)

## Props

Check the props in the [Public API](/docs/public-api/interfaces/TextWidgetProps) documentation
