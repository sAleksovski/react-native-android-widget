import * as React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';
import { ListDemoWidget } from '../../widgets/ListDemoWidget';
import type { ExampleScreens } from '../ListScreen';

export function ListDemoWidgetPreviewScreen({
  navigation,
}: NativeStackScreenProps<ExampleScreens, 'ListDemoWidgetPreviewScreen'>) {
  const [archivedIndex, setArhivedIndex] = React.useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <WidgetPreview
          renderWidget={() => <ListDemoWidget archivedIndex={archivedIndex} />}
          height={209}
          width={320}
          onClick={(props) => {
            if (props.clickAction === 'ARCHIVE') {
              setArhivedIndex(
                (props.clickActionData?.listItemId as number) ?? -1
              );
            }
          }}
        />
      </View>

      <FlatList
        style={styles.list}
        data={Array.from({ length: 15 }).map((_, i) => i + 1)}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('ListDemoWidgetPreviewDeepLinkScreen', {
                id: item,
              })
            }
          >
            <View style={styles.listItem}>
              <Text>React Native Android Widget Release 0.{item}</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      />
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
