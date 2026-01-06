import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';
import { DarkModeDemoWidget } from '../../widgets/DarkModeWidget';

export function DarkModeDemoWidgetPreviewScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <Button
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        onPress={() => setIsDarkMode(!isDarkMode)}
      />
      <View style={styles.previewContainer}>
        <WidgetPreview
          renderWidget={() => (
            <DarkModeDemoWidget mode={isDarkMode ? 'dark' : 'light'} />
          )}
          height={209}
          width={320}
          onClick={(props) => {
            console.log('Widget clicked', props);
          }}
        />
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
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
});
