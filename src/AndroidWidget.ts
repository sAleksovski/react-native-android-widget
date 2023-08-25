import { NativeModules, Platform } from 'react-native';
import type { Spec } from './NativeAndroidWidget';

const LINKING_ERROR =
  `The package 'react-native-android-widget' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const noopModule: Spec = {
  drawWidget: () => null,
  drawWidgetById: () => null,
  createPreview: () =>
    Promise.resolve({
      base64Image: '',
      clickableAreas: [],
      collectionAreas: [],
    }),
  getWidgetInfo: () => Promise.resolve([]),
  finishWidgetConfiguration: () => null,
};

const AndroidWidgetModule =
  Platform.OS === 'android'
    ? isTurboModuleEnabled
      ? require('./NativeAndroidWidget').default
      : NativeModules.AndroidWidget
    : noopModule;

const dummyModuleProxy = new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  }
);

export const AndroidWidget = (AndroidWidgetModule ?? dummyModuleProxy) as Spec;
