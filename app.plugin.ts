import {
  AndroidConfig,
  ExportedConfigWithProps,
  withAndroidManifest,
} from '@expo/config-plugins';
import type { ExpoConfig } from '@expo/config-types';
import * as fs from 'fs';
import * as path from 'path';

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

interface Widget {
  name: string;
}

export default (config: ExpoConfig, params: { widgets: Widget[] }) => {
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.WAKE_LOCK',
    'android.permission.FOREGROUND_SERVICE',
  ]);

  return withAndroidManifest(
    config,
    (
      androidManifestConfig: ExportedConfigWithProps<AndroidConfig.Manifest.AndroidManifest>
    ) => {
      const mainApplication = getMainApplicationOrThrow(
        androidManifestConfig.modResults
      );
      withBackgroundTaskService(mainApplication);

      params.widgets.forEach((widget: Widget) => {
        withWidgetProviderClass(config, androidManifestConfig, widget);
        withWidgetProviderXml(androidManifestConfig, widget);
        withWidgetReceiver(mainApplication, widget);
      });

      return androidManifestConfig;
    }
  );
};

function withBackgroundTaskService(
  mainApplication: AndroidConfig.Manifest.ManifestApplication
): void {
  mainApplication.service = mainApplication.service ?? [];

  const alreadyAdded = mainApplication.service.some(
    (service) =>
      service.$['android:name'] ===
      'com.reactnativeandroidwidget.RNWidgetBackgroundTaskService'
  );

  if (alreadyAdded) return;

  mainApplication.service?.push({
    $: {
      'android:name':
        'com.reactnativeandroidwidget.RNWidgetBackgroundTaskService',
      'android:enabled': 'true',
    },
  });
}

function withWidgetProviderClass(
  config: ExpoConfig,
  androidManifestConfig: ExportedConfigWithProps<AndroidConfig.Manifest.AndroidManifest>,
  widget: Widget
) {
  const widgetPackagePath = path.join(
    androidManifestConfig.modRequest.platformProjectRoot,
    'app/src/main/java/' +
      config.android?.package?.split('.').join('/') +
      '/widget'
  );

  const javaFilePath = path.join(widgetPackagePath, `/${widget.name}.java`);

  const data = `package ${config.android?.package}.widget;

import com.reactnativeandroidwidget.RNWidgetProvider;

public class ${widget.name} extends RNWidgetProvider {
}
`;

  fs.mkdirSync(widgetPackagePath, { recursive: true });

  fs.writeFileSync(javaFilePath, data);
}

function withWidgetProviderXml(
  androidManifestConfig: ExportedConfigWithProps<AndroidConfig.Manifest.AndroidManifest>,
  widget: Widget
) {
  const xmlFolderPath = path.join(
    androidManifestConfig.modRequest.platformProjectRoot,
    'app/src/main/res/xml'
  );

  const xmlPath = path.join(
    xmlFolderPath,
    `/widgetprovider_${widget.name.toLowerCase()}.xml`
  );

  const data = `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="300dp"
    android:minHeight="120dp"

    android:updatePeriodMillis="0"

    android:initialLayout="@layout/rn_widget"

    android:resizeMode="none"

    android:widgetCategory="home_screen">
</appwidget-provider>
`;

  fs.mkdirSync(xmlFolderPath, { recursive: true });

  fs.writeFileSync(xmlPath, data);
}

function withWidgetReceiver(
  mainApplication: AndroidConfig.Manifest.ManifestApplication,
  widget: Widget
): void {
  mainApplication.receiver = mainApplication.receiver ?? [];

  const alreadyAdded = mainApplication.receiver.some(
    (service) => service.$['android:name'] === `.widget.${widget.name}`
  );

  if (alreadyAdded) return;

  mainApplication.receiver?.push({
    '$': {
      'android:name': `.widget.${widget.name}`,
      'android:exported': 'false',
      'android:label': widget.name,
    } as any,
    'intent-filter': [
      {
        action: [
          {
            $: {
              'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',
            },
          },
          {
            $: {
              'android:name': 'com.reactnativeandroidwidget.WIDGET_CLICK',
            },
          },
        ],
      },
    ],
    'meta-data': {
      $: {
        'android:name': 'android.appwidget.provider',
        'android:resource': `@xml/widgetprovider_${widget.name.toLowerCase()}`,
      },
    },
  } as any);
}
