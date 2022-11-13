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
              height: 150,
              width: 320,
              backgroundColor: 'rgba(100, 200, 255, 0.4)',
              borderTopColor: '#ff0000',
              borderLeftColor: '#0000ff',
              borderTopWidth: 10,
              borderLeftWidth: 20,
            }}
          >
            <FlexWidget
              style={{
                width: 50,
                height: 30,
                backgroundColor: '#008080',
              }}
              children={[]}
            />
            <FlexWidget
              style={{
                width: 50,
                height: 30,
                backgroundColor: '#ff0000',
              }}
              children={[]}
            />
            <FlexWidget
              style={{
                width: 50,
                height: 30,
                backgroundColor: '#ffff00',
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
            borderTopColor: '#ff0000',
            borderTopWidth: 10,
            borderLeftColor: '#0000ff',
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
    backgroundColor: '#008080',
  },
  child2: {
    width: 50,
    height: 30,
    backgroundColor: '#ff0000',
  },
  child3: {
    width: 50,
    height: 30,
    backgroundColor: '#ffff00',
  },
  wrapper: {
    width: 320,
    height: 150,
    backgroundColor: 'rgba(100, 200, 255, 0.4)',
    marginBottom: 16,
  },
});
