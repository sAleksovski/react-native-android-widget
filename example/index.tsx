import { AppRegistry } from 'react-native';
import { HEADLESS_TASK_KEY } from 'react-native-android-widget';
import App from './src/App';
import WidgetTask from './widgetTask';

AppRegistry.registerComponent('main', () => App);
AppRegistry.registerHeadlessTask(HEADLESS_TASK_KEY, () => WidgetTask);
