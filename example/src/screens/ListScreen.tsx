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
  MusicWidgetPreviewScreen: undefined;
  ResizableMusicWidgetPreviewScreen: undefined;
  RotatedWidgetPreviewScreen: undefined;
  StepsWidgetPreviewScreen: undefined;
  FlexScreen: undefined;
  BorderScreen: undefined;
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
    title: 'Music Widget Preview',
    screen: 'MusicWidgetPreviewScreen',
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
    title: 'Steps Widget Preview',
    screen: 'StepsWidgetPreviewScreen',
  },
  {
    title: 'Flexbox Demo',
    screen: 'FlexScreen',
  },
  {
    title: 'Border Demo',
    screen: 'BorderScreen',
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
            <Text>{item.title}</Text>
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
