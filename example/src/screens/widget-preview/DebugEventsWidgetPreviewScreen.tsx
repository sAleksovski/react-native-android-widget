import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEBUG_EVENTS_STORAGE_KEY,
  DebugEventsWidget,
} from '../../widgets/DebugEventsWidget';

export function DebugEventsWidgetPreviewScreen() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    async function init() {
      const data = await AsyncStorage.getItem(DEBUG_EVENTS_STORAGE_KEY);
      const items = JSON.parse(data ?? '[]');
      setEvents(items);
    }

    init();
  }, []);

  return (
    <View style={styles.container}>
      <WidgetPreview
        renderWidget={() => <DebugEventsWidget events={events} />}
        onClick={() => setEvents([])}
        height={209}
        width={320}
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
});
