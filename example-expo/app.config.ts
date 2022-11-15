import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
  fonts: [
    './assets/fonts/material.ttf',
    './assets/fonts/material_outlined.otf',
  ],
  widgets: [
    {
      name: 'Fitness',
      minHeight: '120dp',
      minWidth: '300dp',
      description: 'Track your fitness level',
      previewImage: './assets/widget-preview/fitness.png',
    },
    {
      name: 'Music',
      minHeight: '150dp',
      minWidth: '180dp',
      previewImage: './assets/widget-preview/music.png',
    },
    {
      name: 'Resizable',
      minHeight: '100dp',
      minWidth: '180dp',
      description: 'Check your music in different formats',
      previewImage: './assets/widget-preview/resizable.png',
      resizeMode: 'horizontal|vertical',
    },
    {
      name: 'Rotated',
      minHeight: '150dp',
      minWidth: '180dp',
      previewImage: './assets/widget-preview/rotated.png',
    },
    {
      name: 'Shopify',
      label: 'Shopify Insights',
      minHeight: '200dp',
      minWidth: '300dp',
      description: "Get quick access to your store's performance",
      previewImage: './assets/widget-preview/shopify.png',
    },
    {
      name: 'Steps',
      minHeight: '150dp',
      minWidth: '180dp',
      description: 'Your steps at a glance',
      previewImage: './assets/widget-preview/steps.png',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AndroidWidgetExpoExample',
  slug: 'android-widget-expo-example',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.androidwidgetexampleexpo',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'be9e6b81-3f11-4eae-913f-f1acdefe6e97',
    },
  },
  plugins: [['react-native-android-widget', widgetConfig]],
});
