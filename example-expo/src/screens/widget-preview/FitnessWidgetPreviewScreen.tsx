import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import { FitnessWidget } from '../../widgets/FitnessWidget';

const FITNESS_VIEWS: ('directions_walk' | 'schedule' | 'bar_chart')[] = [
  'directions_walk',
  'schedule',
  'bar_chart',
];

export function FitnessWidgetPreviewScreen() {
  const [viewIndex, setViewIndex] = React.useState(0);

  const activeView = FITNESS_VIEWS[viewIndex % FITNESS_VIEWS.length];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Change View"
          onPress={() => setViewIndex(viewIndex + 1)}
        />
      </View>

      <WidgetPreview
        renderWidget={() => <FitnessWidget activeView={activeView} />}
        height={209}
        width={320}
        showBorder
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
  buttonContainer: {
    marginBottom: 16,
  },
});
