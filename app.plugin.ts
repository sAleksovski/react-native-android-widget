import type { ExpoConfig } from 'expo/config';
import {
  AndroidConfig,
  ExportedConfigWithProps,
  withAndroidManifest,
  withDangerousMod,
  withStringsXml,
} from 'expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

export type ResourcePath = `./${string}` | `../${string}`;

export interface Widget {
  name: string;
  label?: string;
  description?: string;
  minWidth: `${number}dp`;
  minHeight: `${number}dp`;
  maxResizeWidth?: `${number}dp`;
  maxResizeHeight?: `${number}dp`;
  previewImage?: ResourcePath;
  resizeMode?: 'none' | 'horizontal' | 'vertical' | 'horizontal|vertical';
}

export interface WithAndroidWidgetsParams {
  fonts?: ResourcePath[];
  widgets: Widget[];
}

interface ProjectPaths {
  platformProjectRoot: string;
  projectRoot: string;
}

export default function withAndroidWidgets(
  config: ExpoConfig,
  params: WithAndroidWidgetsParams
) {
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.WAKE_LOCK',
    'android.permission.FOREGROUND_SERVICE',
  ]);

  let projectPaths: ProjectPaths = {
    platformProjectRoot: '',
    projectRoot: '',
  };

  config = withAndroidManifest(
    config,
    (
      androidManifestConfig: ExportedConfigWithProps<AndroidConfig.Manifest.AndroidManifest>
    ) => {
      const mainApplication = getMainApplicationOrThrow(
        androidManifestConfig.modResults
      );
      withBackgroundTaskService(mainApplication);

      projectPaths.platformProjectRoot =
        androidManifestConfig.modRequest.platformProjectRoot;
      projectPaths.projectRoot = androidManifestConfig.modRequest.projectRoot;

      params.widgets.forEach((widget) => {
        withWidgetReceiver(androidManifestConfig, mainApplication, widget);
      });

      return androidManifestConfig;
    }
  );

  config = withWidgetDescriptions(config, params.widgets);
  config = withFonts(config, projectPaths, params.fonts ?? []);
  config = withWidgets(config, projectPaths, params.widgets);

  return config;
}

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

function withWidgetReceiver(
  config: ExpoConfig,
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
      'android:label': `${widget.label ?? widget.name}`,
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
              'android:name': `${config.android?.package}.WIDGET_CLICK`,
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

function withWidgetDescriptions(config: ExpoConfig, widgets: Widget[]) {
  return withStringsXml(config, (stringsXml) => {
    widgets
      .filter((widget) => !!widget.description)
      .forEach((widget) => {
        stringsXml.modResults = AndroidConfig.Strings.setStringItem(
          [
            {
              $: {
                name: `widget_${widget.name.toLowerCase()}_description`,
                translatable: 'false',
              },
              _: `${widget.description}`.replace(/'/g, "\\'"),
            },
          ],
          stringsXml.modResults
        );
      });
    return stringsXml;
  });
}

function withFonts(
  config: ExpoConfig,
  androidManifestConfig: ProjectPaths,
  fonts: ResourcePath[]
) {
  return withDangerousMod(config, [
    'android',
    (dangerousConfig) => {
      if (fonts.length === 0) {
        return dangerousConfig;
      }

      const fontsDir = path.join(
        androidManifestConfig.platformProjectRoot,
        'android/app/src/main/assets/fonts'
      );
      fs.mkdirSync(fontsDir, { recursive: true });

      fonts.forEach((font: ResourcePath) => {
        const fontAssetPath = path.resolve(
          androidManifestConfig.projectRoot,
          font
        );

        const output = path.join(fontsDir, path.basename(fontAssetPath));
        fs.copyFileSync(fontAssetPath, output);
      });
      return dangerousConfig;
    },
  ]);
}

function withWidgets(
  config: ExpoConfig,
  projectPaths: ProjectPaths,
  widgets: Widget[]
) {
  widgets.forEach((widget: Widget) => {
    withWidget(config, projectPaths, widget);
  });
  return config;
}

function withWidget(
  config: ExpoConfig,
  projectPaths: ProjectPaths,
  widget: Widget
) {
  withDangerousMod(config, [
    'android',
    (dangerousConfig) => {
      withWidgetProviderClass(dangerousConfig, projectPaths, widget);
      withWidgetProviderXml(projectPaths, widget);
      withWidgetPreview(projectPaths, widget);
      return dangerousConfig;
    },
  ]);
}

function withWidgetProviderClass(
  config: ExpoConfig,
  projectPaths: ProjectPaths,
  widget: Widget
) {
  const widgetPackagePath = path.join(
    projectPaths.platformProjectRoot,
    'android/app/src/main/java/' +
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

function withWidgetProviderXml(projectPaths: ProjectPaths, widget: Widget) {
  const xmlFolderPath = path.join(
    projectPaths.platformProjectRoot,
    'android/app/src/main/res/xml'
  );

  const xmlPath = path.join(
    xmlFolderPath,
    `/widgetprovider_${widget.name.toLowerCase()}.xml`
  );

  const data = `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="${widget.minWidth}"
    android:minHeight="${widget.minHeight}"
${
  widget.maxResizeWidth
    ? `    android:maxResizeWidth="${widget.maxResizeWidth}"`
    : ''
}
${
  widget.maxResizeHeight
    ? `    android:maxResizeHeight="${widget.maxResizeHeight}"`
    : ''
}

    android:resizeMode="${widget.resizeMode ?? 'none'}"

${
  widget.description
    ? `    android:description="@string/widget_${widget.name.toLowerCase()}_description"`
    : ''
}

    android:initialLayout="@layout/rn_widget"
${
  widget.previewImage
    ? `    android:previewImage="@drawable/${widget.name.toLowerCase()}_preview"`
    : ''
}

    android:updatePeriodMillis="0"
    android:widgetCategory="home_screen">
</appwidget-provider>
`;

  fs.mkdirSync(xmlFolderPath, { recursive: true });

  fs.writeFileSync(xmlPath, data);
}

function withWidgetPreview(projectPaths: ProjectPaths, widget: Widget) {
  if (widget.previewImage) {
    const drawableDir = path.join(
      projectPaths.platformProjectRoot,
      'android/app/src/main/res/drawable'
    );
    fs.mkdirSync(drawableDir, { recursive: true });

    const previewAssetPath = path.resolve(
      projectPaths.projectRoot,
      widget.previewImage
    );

    const output = path.join(
      drawableDir,
      `${widget.name.toLowerCase()}_preview${path.extname(previewAssetPath)}`
    );
    fs.copyFileSync(previewAssetPath, output);
  }
}
