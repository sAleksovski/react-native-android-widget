import type { ExpoConfig } from 'expo/config';
import {
  AndroidConfig,
  withAndroidManifest,
  withDangerousMod,
  withStringsXml,
  type ExportedConfigWithProps,
} from 'expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

export type ResourcePath = `./${string}` | `../${string}`;

export interface Widget {
  /**
   * Name of the widget which will be used to reference it in code
   */
  name: string;
  /**
   * Label that will be shown in widget picker
   */
  label?: string;
  /**
   * Description that will be shown in widget picker
   */
  description?: string;
  minWidth: `${number}dp`;
  minHeight: `${number}dp`;
  targetCellWidth?: number;
  targetCellHeight?: number;
  maxResizeWidth?: `${number}dp`;
  maxResizeHeight?: `${number}dp`;
  previewImage?: ResourcePath;
  resizeMode?: 'none' | 'horizontal' | 'vertical' | 'horizontal|vertical';
  /**
   * Whether the widget can be configured.
   * 'configurable' means that the widget is configurable, and a
   * configuration activity will be open when the widget is added on home screen.
   * 'reconfigurable|configuration_optional' will make the widget configurable,
   * but will not open the configuration activity when added on home screen,
   * and the configuration can be changed by holding the widget and selecting configure.
   * The widget will not be configurable if `widgetFeatures` is not provided
   */
  widgetFeatures?: 'reconfigurable' | 'reconfigurable|configuration_optional';
  /**
   * How often the widget should be updated, in milliseconds.
   *
   * Default is 0 (no automatic updates)
   *
   * Minimum is 1.800.000 (30 minutes == 30 * 60 * 1000).
   */
  updatePeriodMillis?: number;
  /**
   * Custom Java package name for the widget's AppWidgetProvider.
   *
   * It must start with the actual apps package name.
   *
   * Can be used if introducing react-native-android-widget in existing app
   * that already has widgets in a different package that the default one.
   *
   * Must not end with "."
   *
   * @default "<app-package-name>.widget"
   */
  packageName?: string;
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
      withCollectionService(mainApplication);

      projectPaths.platformProjectRoot =
        androidManifestConfig.modRequest.platformProjectRoot;
      projectPaths.projectRoot = androidManifestConfig.modRequest.projectRoot;

      withConfigurableActivity(mainApplication, params);

      params.widgets.forEach((widget) => {
        withWidgetReceiver(androidManifestConfig, mainApplication, widget);
      });

      return androidManifestConfig;
    }
  );

  config = withWidgetDescriptions(config, params.widgets);
  config = withFonts(config, projectPaths, params.fonts ?? []);
  config = withWidgets(config, projectPaths, params.widgets);
  config = withConfigurableActivityClass(config, projectPaths, params.widgets);

  return config;
}

function withCollectionService(
  mainApplication: AndroidConfig.Manifest.ManifestApplication
): void {
  mainApplication.service = mainApplication.service ?? [];

  const alreadyAdded = mainApplication.service.some(
    (service) =>
      service.$['android:name'] ===
      'com.reactnativeandroidwidget.RNWidgetCollectionService'
  );

  if (alreadyAdded) return;

  mainApplication.service?.push({
    $: {
      'android:name': 'com.reactnativeandroidwidget.RNWidgetCollectionService',
      'android:permission': 'android.permission.BIND_REMOTEVIEWS',
    },
  });
}

function withConfigurableActivity(
  mainApplication: AndroidConfig.Manifest.ManifestApplication,
  params: WithAndroidWidgetsParams
) {
  const hasConfigurableWidget = params.widgets.some(
    (widget) => !!widget.widgetFeatures
  );

  if (hasConfigurableWidget) {
    mainApplication.activity = mainApplication.activity ?? [];

    const alreadyAdded = mainApplication.activity.some(
      (activity) =>
        activity.$['android:name'] === '.WidgetConfigurationActivity'
    );

    if (alreadyAdded) return;

    mainApplication.activity?.push({
      '$': {
        'android:name': '.WidgetConfigurationActivity',
        'android:exported': 'true',
      },
      'intent-filter': [
        {
          action: [
            {
              $: {
                'android:name': 'android.appwidget.action.APPWIDGET_CONFIGURE',
              },
            },
          ],
        },
      ],
    });
  }
}

function withConfigurableActivityClass(
  config: ExpoConfig,
  projectPaths: ProjectPaths,
  widgets: Widget[]
) {
  const hasConfigurableWidget = widgets.some(
    (widget) => !!widget.widgetFeatures
  );

  if (hasConfigurableWidget) {
    withDangerousMod(config, [
      'android',
      (dangerousConfig) => {
        const appPackage = path.join(
          projectPaths.platformProjectRoot,
          'android/app/src/main/java/' +
            config.android?.package?.split('.').join('/')
        );

        const javaFilePath = path.join(
          appPackage,
          `/WidgetConfigurationActivity.java`
        );

        const data = `package ${config.android?.package};

import com.reactnativeandroidwidget.RNWidgetConfigurationActivity;

public class WidgetConfigurationActivity extends RNWidgetConfigurationActivity {
}
`;

        fs.writeFileSync(javaFilePath, data);

        return dangerousConfig;
      },
    ]);
  }

  return config;
}

function withWidgetReceiver(
  config: ExpoConfig,
  mainApplication: AndroidConfig.Manifest.ManifestApplication,
  widget: Widget
): void {
  mainApplication.receiver = mainApplication.receiver ?? [];

  const { receiverName } = getReceiverInfo(config, widget);

  const alreadyAdded = mainApplication.receiver.some(
    (service) => service.$['android:name'] === receiverName
  );

  if (alreadyAdded) return;

  mainApplication.receiver?.push({
    '$': {
      'android:name': receiverName,
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
      withWidgetProviderXml(dangerousConfig, projectPaths, widget);
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
  const { receiverPackage } = getReceiverInfo(config, widget);

  const widgetPackagePath = path.join(
    projectPaths.platformProjectRoot,
    'android/app/src/main/java/' + receiverPackage.split('.').join('/')
  );

  const javaFilePath = path.join(widgetPackagePath, `/${widget.name}.java`);

  const data = `package ${receiverPackage};

import com.reactnativeandroidwidget.RNWidgetProvider;

public class ${widget.name} extends RNWidgetProvider {
}
`;

  fs.mkdirSync(widgetPackagePath, { recursive: true });

  fs.writeFileSync(javaFilePath, data);
}

function withWidgetProviderXml(
  config: ExpoConfig,
  projectPaths: ProjectPaths,
  widget: Widget
) {
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
  widget.targetCellWidth
    ? `    android:targetCellWidth="${widget.targetCellWidth}"`
    : ''
}
${
  widget.targetCellHeight
    ? `    android:targetCellHeight="${widget.targetCellHeight}"`
    : ''
}
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

${
  widget.widgetFeatures
    ? `    android:configure="${config.android?.package}.WidgetConfigurationActivity"
    android:widgetFeatures="${widget.widgetFeatures}"`
    : ''
}

    android:updatePeriodMillis="${
      widget.updatePeriodMillis
        ? Math.max(30 * 60 * 1000, widget.updatePeriodMillis)
        : 0
    }"
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

function getReceiverInfo(config: ExpoConfig, widget: Widget) {
  if (!config.android?.package) {
    throw new Error('Must provide a package for the app');
  }

  if (
    widget.packageName &&
    !widget.packageName.startsWith(config.android.package)
  ) {
    throw new Error(
      `Package name for widget with name ${widget.name} must start with ${config.android.package}`
    );
  }

  const receiverPackage =
    widget.packageName ?? `${config.android.package}.widget`;
  const receiverName = `${receiverPackage.replace(
    config.android.package,
    ''
  )}.${widget.name}`;

  return { receiverPackage, receiverName };
}
