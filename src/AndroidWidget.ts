import { NativeModules, Platform } from 'react-native';
import type { Spec } from './NativeAndroidWidget';

const LINKING_ERROR =
  `The package 'react-native-android-widget' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const AndroidWidgetModule = isTurboModuleEnabled
  ? require('./NativeAndroidWidget').default
  : NativeModules.AndroidWidget;

export const AndroidWidget = (
  AndroidWidgetModule
    ? AndroidWidgetModule
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      )
) as Spec;
