/* eslint-disable react-native/no-inline-styles */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function Separator() {
  return <View style={styles.separator} />;
}

export type ExampleScreens = {
  ListScreen: undefined;
  FitnessWidgetPreviewScreen: undefined;
  ResizableMusicWidgetPreviewScreen: undefined;
  RotatedWidgetPreviewScreen: undefined;
  ShopifyWidgetPreviewScreen: undefined;
  ClickDemoWidgetPreviewScreen: undefined;
  ListDemoWidgetPreviewScreen: undefined;
  ListDemoWidgetPreviewDeepLinkScreen: { id: number } | undefined;
  DebugEventsWidgetPreviewScreen: undefined;
  FlexScreen: undefined;
  BorderScreen: undefined;
  SvgScreen: undefined;
  TextScreen: undefined;
  CounterScreen: undefined;
};

interface Item {
  title: string;
  screen: keyof ExampleScreens;
}

const items: Item[] = [
  {
    title: 'Fitness Widget Preview',
    screen: 'FitnessWidgetPreviewScreen',
  },
  {
    title: 'Resizable Music Widget Preview',
    screen: 'ResizableMusicWidgetPreviewScreen',
  },
  {
    title: 'Rotated Widget Preview',
    screen: 'RotatedWidgetPreviewScreen',
  },
  {
    title: 'Shopify Widget Preview',
    screen: 'ShopifyWidgetPreviewScreen',
  },
  {
    title: 'Click Demo Widget Preview',
    screen: 'ClickDemoWidgetPreviewScreen',
  },
  {
    title: 'List Widget Preview',
    screen: 'ListDemoWidgetPreviewScreen',
  },
  {
    title: 'Counter Demo',
    screen: 'CounterScreen',
  },
  {
    title: 'Debug Events',
    screen: 'DebugEventsWidgetPreviewScreen',
  },
  {
    title: 'Flexbox Demo',
    screen: 'FlexScreen',
  },
  {
    title: 'Border Demo',
    screen: 'BorderScreen',
  },
  {
    title: 'Svg Demo',
    screen: 'SvgScreen',
  },
  {
    title: 'Text Demo',
    screen: 'TextScreen',
  },
];

export function ListScreen({
  navigation,
}: NativeStackScreenProps<ExampleScreens, 'ListScreen'>) {
  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={Separator}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={styles.listItem}
          >
            <Text style={{ color: 'black' }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: 8,
  },
  separator: {
    backgroundColor: '#d6d6d6',
    height: 1,
  },
  listItem: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
