import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  FlexWidget,
  WidgetPreview,
  type FlexWidgetStyle,
} from 'react-native-android-widget';

const FLEX_DIRECTION: ('row' | 'column')[] = ['row', 'column'];
const ALIGN_ITEMS: ('flex-start' | 'center' | 'flex-end')[] = [
  'flex-start',
  'center',
  'flex-end',
];
const JUSTIFY_CONTENT: (
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
)[] = [
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
  'space-evenly',
];

function FlexWidgetDemo({
  flexDirection,
  justifyContent,
  alignItems,
}: FlexWidgetStyle) {
  return (
    <FlexWidget
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection,
        justifyContent,
        alignItems,
        backgroundColor: 'rgba(100, 200, 255, 0.4)',
        height: flexDirection === 'row' ? 60 : 150,
        width: 'match_parent',
      }}
    >
      <FlexWidget
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#ff0000',
          height: 30,
          width: 50,
        }}
      />
      <FlexWidget
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#008000',
          height: 30,
          width: 50,
        }}
      />
      <FlexWidget
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#0000ff',
          height: 30,
          width: 50,
        }}
      />
    </FlexWidget>
  );
}

export function FlexScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {FLEX_DIRECTION.map((flexDirection, directionIndex) =>
        ALIGN_ITEMS.map((alignItems, alignIndex) =>
          JUSTIFY_CONTENT.map((justifyContent, justifyIndex) => (
            <View key={directionIndex * 100 + alignIndex * 10 + justifyIndex}>
              <Text>flexDirection: {flexDirection}</Text>
              <Text>alignItems: {alignItems}</Text>
              <Text>justifyContent: {justifyContent}</Text>

              <Text>Widget</Text>
              <WidgetPreview
                renderWidget={() => (
                  <FlexWidgetDemo
                    flexDirection={flexDirection}
                    justifyContent={justifyContent}
                    alignItems={alignItems}
                  />
                )}
                height={flexDirection === 'row' ? 60 : 150}
                width={320}
              />

              <Text>RN View</Text>
              <View
                style={[
                  styles.wrapper,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { height: flexDirection === 'row' ? 60 : 150 },
                  { flexDirection, justifyContent, alignItems },
                ]}
              >
                <View style={styles.child1} />
                <View style={styles.child2} />
                <View style={styles.child3} />
              </View>
            </View>
          ))
        )
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
  child1: {
    width: 50,
    height: 30,
    backgroundColor: 'red',
  },
  child2: {
    width: 50,
    height: 30,
    backgroundColor: 'green',
  },
  child3: {
    width: 50,
    height: 30,
    backgroundColor: 'blue',
  },
  wrapper: {
    width: 320,
    height: 150,
    backgroundColor: 'rgba(100, 200, 255, 0.4)',
    marginBottom: 16,
  },
});
