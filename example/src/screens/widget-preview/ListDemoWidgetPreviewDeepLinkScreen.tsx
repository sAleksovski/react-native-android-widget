import * as React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import type { ExampleScreens } from '../ListScreen';

export function ListDemoWidgetPreviewDeepLinkScreen({
  route,
}: NativeStackScreenProps<
  ExampleScreens,
  'ListDemoWidgetPreviewDeepLinkScreen'
>) {
  return (
    <View style={styles.container}>
      <Text>Viewing details for release: 0.{route.params?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  list: {
    width: '100%',
  },
  listItem: {
    padding: 16,
  },
  separator: {
    backgroundColor: 'gray',
    height: 1,
  },
});
