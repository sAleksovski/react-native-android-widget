import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { name as appName } from './app.json';
import App from './src/App';
import widgetTaskHandler from './widgetTaskHandler';

AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);
