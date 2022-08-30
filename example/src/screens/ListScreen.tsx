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
  WidgetPreviewScreen: undefined;
  FlexScreen: undefined;
};

interface Item {
  title: string;
  screen: keyof ExampleScreens;
}

const items: Item[] = [
  {
    title: 'Widget Preview',
    screen: 'WidgetPreviewScreen',
  },
  {
    title: 'Flexbox Demo',
    screen: 'FlexScreen',
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
