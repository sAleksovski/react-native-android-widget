import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { requestWidgetUpdate } from 'react-native-android-widget';

import { CounterWidget } from '../widgets/CounterWidget';

const STORAGE_KEY = 'CounterWidget:count';

export function CounterScreen() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    async function init() {
      const value = +((await AsyncStorage.getItem(STORAGE_KEY)) ?? 0);

      setCount(value);
    }

    init();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, `${count}`);

    requestWidgetUpdate({
      widgetName: 'Counter',
      renderWidget: () => <CounterWidget count={count} />,
    });
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Decrement" onPress={() => setCount(count - 1)} />
        <Button title="Increment" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 64,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
