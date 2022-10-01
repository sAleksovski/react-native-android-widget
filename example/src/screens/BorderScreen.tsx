/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlexWidget, WidgetPreview } from 'react-native-android-widget';

export function BorderScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Widget</Text>
      <WidgetPreview
        renderWidget={() => (
          <FlexWidget
            style={{
              height: 150 * 2.75,
              width: 320 * 2.75,
              backgroundColor: '#6664c8ff',
              borderTopColor: '#ff0000',
              borderLeftColor: '#0000ff',
              borderTopWidth: 10 * 2.75,
              borderLeftWidth: 20 * 2.75,
            }}
          >
            <FlexWidget
              style={{
                width: 50 * 2.75,
                height: 30 * 2.75,
                backgroundColor: 'teal',
              }}
              children={[]}
            />
            <FlexWidget
              style={{
                width: 50 * 2.75,
                height: 30 * 2.75,
                backgroundColor: 'red',
              }}
              children={[]}
            />
            <FlexWidget
              style={{
                width: 50 * 2.75,
                height: 30 * 2.75,
                backgroundColor: 'yellow',
              }}
              children={[]}
            />
          </FlexWidget>
        )}
        height={150}
        width={320}
      />

      <Text>RN View</Text>
      <View
        style={[
          styles.wrapper,
          {
            borderTopColor: 'red',
            borderTopWidth: 10,
            borderLeftColor: 'blue',
            borderLeftWidth: 20,
          },
        ]}
      >
        <View style={styles.child1} />
        <View style={styles.child2} />
        <View style={styles.child3} />
      </View>
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
    backgroundColor: 'teal',
  },
  child2: {
    width: 50,
    height: 30,
    backgroundColor: 'red',
  },
  child3: {
    width: 50,
    height: 30,
    backgroundColor: 'yellow',
  },
  wrapper: {
    width: 320,
    height: 150,
    backgroundColor: 'rgba(100, 200, 255, 0.4)',
    marginBottom: 16,
  },
});
