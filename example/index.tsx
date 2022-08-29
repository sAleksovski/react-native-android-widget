import { AppRegistry } from 'react-native';
import App from './src/App';
import WidgetTask from './widgetTask';

AppRegistry.registerComponent('main', () => App);
AppRegistry.registerHeadlessTask('WidgetTask', () => WidgetTask);
