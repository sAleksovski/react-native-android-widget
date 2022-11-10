import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  FlexWidget,
  TextWidget,
  WidgetPreview,
} from 'react-native-android-widget';

const FONT_STYLE: ('normal' | 'italic')[] = ['normal', 'italic'];
const FONT_WEIGHT: (
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
)[] = [
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

function TextWidgetDemo({
  fontStyle,
  fontWeight,
}: {
  fontStyle: 'normal' | 'italic';
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}) {
  return (
    <FlexWidget>
      <TextWidget
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontStyle,
          fontWeight,
          fontSize: 24,
        }}
        text={`${fontStyle} ${fontWeight} Widget`}
      />
    </FlexWidget>
  );
}

export function TextScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {FONT_STYLE.map((fontStyle, fontStyleIndex) =>
        FONT_WEIGHT.map((fontWeight, fontWeightIndex) => (
          <View key={fontStyleIndex * 10 + fontWeightIndex}>
            <WidgetPreview
              renderWidget={() => (
                <TextWidgetDemo fontStyle={fontStyle} fontWeight={fontWeight} />
              )}
              height={30}
              width={320}
            />

            <View style={styles.wrapper}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 24,
                  fontStyle,
                  fontWeight,
                  color: 'black',
                }}
              >
                {fontStyle} {fontWeight} RN
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  contentContainer: {
    paddingBottom: 64,
  },
  wrapper: {
    width: 320,
    height: 30,
    marginBottom: 16,
  },
});
