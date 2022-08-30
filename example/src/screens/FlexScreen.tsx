import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  buildTree,
  LinearLayoutWidget,
  WidgetPreview,
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
  // 'space-around',
  // 'space-between',
  // 'space-evenly',
];

interface FlexWidgetProps {
  flexDirection: 'row' | 'column';
  alignItems: 'flex-start' | 'center' | 'flex-end';
  justifyContent:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
}

function FlexWidget({
  flexDirection,
  justifyContent,
  alignItems,
}: FlexWidgetProps) {
  let gravity = LinearLayoutWidget.Gravity.START;

  switch (flexDirection === 'row' ? justifyContent : alignItems) {
    case 'flex-start':
      gravity = LinearLayoutWidget.Gravity.START;
      break;

    case 'center':
      gravity = LinearLayoutWidget.Gravity.CENTER_HORIZONTAL;
      break;

    case 'flex-end':
      gravity = LinearLayoutWidget.Gravity.END;
      break;

    default:
      break;
  }

  switch (flexDirection === 'row' ? alignItems : justifyContent) {
    case 'flex-start':
      gravity |= LinearLayoutWidget.Gravity.TOP;
      break;

    case 'center':
      gravity |= LinearLayoutWidget.Gravity.CENTER_VERTICAL;
      break;

    case 'flex-end':
      gravity |= LinearLayoutWidget.Gravity.BOTTOM;
      break;

    default:
      break;
  }

  return (
    <LinearLayoutWidget
      orientation={flexDirection === 'row' ? 'HORIZONTAL' : 'VERTICAL'}
      backgroundColor="#6664c8ff"
      height={(flexDirection === 'row' ? 60 : 150) * 2.75}
      width="match_parent"
      gravity={gravity}
    >
      <LinearLayoutWidget
        backgroundColor="#ffff0000"
        height={30 * 2.75}
        width={50 * 2.75}
        children={[]}
      />
      <LinearLayoutWidget
        backgroundColor="#ff008000"
        height={30 * 2.75}
        width={50 * 2.75}
        children={[]}
      />
      <LinearLayoutWidget
        backgroundColor="#ff0000ff"
        height={30 * 2.75}
        width={50 * 2.75}
        children={[]}
      />
    </LinearLayoutWidget>
  );
}

export function FlexScreen() {
  return (
    <ScrollView style={styles.container}>
      {FLEX_DIRECTION.map((flexDirection, directionIndex) =>
        ALIGN_ITEMS.map((alignItems, alignIndex) =>
          JUSTIFY_CONTENT.map((justifyContent, justifyIndex) => (
            <View key={directionIndex * 100 + alignIndex * 10 + justifyIndex}>
              <Text>flexDirection: {flexDirection}</Text>
              <Text>alignItems: {alignItems}</Text>
              <Text>justifyContent: {justifyContent}</Text>

              <Text>Widget</Text>
              <WidgetPreview
                tree={buildTree(
                  FlexWidget({ flexDirection, justifyContent, alignItems })
                )}
                height={flexDirection === 'row' ? 60 : 150}
                width={320}
                widgetName="Fitness"
              />

              <Text>RN View</Text>
              <View
                style={[
                  styles.wrapper,
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
