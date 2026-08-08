import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { requestPinWidget } from 'react-native-android-widget';

export function RequestPinWidgetScreen() {
  const [message, setMessage] = React.useState(
    'Add the Fitness widget without leaving the app.'
  );
  const [requesting, setRequesting] = React.useState(false);

  async function addFitnessWidget() {
    setRequesting(true);

    try {
      const requested = await requestPinWidget({ widgetName: 'Fitness' });

      setMessage(
        requested
          ? 'Choose Add in the launcher dialog to place the widget.'
          : 'This launcher does not support adding widgets from inside an app.'
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Could not request the widget.'
      );
    } finally {
      setRequesting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness widget</Text>
      <Text style={styles.message}>{message}</Text>
      <Button
        disabled={requesting}
        title={requesting ? 'Opening launcher…' : 'Add widget'}
        onPress={addFitnessWidget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  message: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
});
