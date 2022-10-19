import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import App from './src/App';
import widgetTaskHandler from './widgetTaskHandler';

AppRegistry.registerComponent('main', () => App);
registerWidgetTaskHandler(widgetTaskHandler);
