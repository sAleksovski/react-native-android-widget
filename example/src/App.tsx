import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { buildTree, WidgetPreview } from 'react-native-android-widget';
import { FitnessWidget } from './widgets/FitnessWidget';

export default function App() {
  return (
    <View style={styles.container}>
      <WidgetPreview
        tree={buildTree(FitnessWidget({ activeView: 'bar_chart' }))}
        height={209}
        width={320}
        widgetName="Fitness"
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
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
