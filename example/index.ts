import { AppRegistry } from 'react-native';
import {
  registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
} from 'react-native-android-widget';
import { name as appName } from './app.json';
import { App, WidgetConfigurationScreen, widgetTaskHandler } from './src';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);
