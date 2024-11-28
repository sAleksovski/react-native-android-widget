# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.15.1] - 2024-11-28

### Added

- Support for React Native 0.76

### Breaking Changes

- Dropped support for React Native <0.76. For older versions use 0.14.2

### Known Issues

- Not working with new architecture

## [0.14.2] - 2024-11-19

### Fixed

- Fix crash on API 22 & 23

## [0.14.1] - 2024-05-25

### Fixed

- Fix order in which clickable views are created

## [0.14.0] - 2024-05-13

### Added

- `targetCellWidth` and `targetCellHeight` options in config plugin

## [0.13.2] - 2024-05-12

### Fixed

- Fix crash on Android 6 when `clickAction` is present in the widget
- `clickAction` now works only from Android 7 and up

## [0.13.1] - 2024-04-27

### Fixed

- Handle cached image file import in expo

## [0.13.0] - 2024-03-26

### Added

- `requestWidgetUpdateById` function to update single widget

## [0.12.0] - 2024-03-16

### Added

- Support for network svg images in `SvgWidget`

## [0.11.2] - 2024-02-26

### Fixed

- Fix layout when scrolling items with different size in `ListWidget`

## [0.11.1] - 2024-01-04

### Fixed

- Allow clickable views inside list items on Samsung devices

## [0.11.0] - 2024-01-03

### Added

- Allow clickable views inside list items
- Increased background task timeout to 30s

## [0.10.0] - 2023-12-20

### Added

- Added `overflow` prop to `FlexWidget` and `OverlapWidget` that can be used to clip the view if it has border radius

## [0.9.0] - 2023-11-29

### Added

- Added `allowFontScaling` prop to `TextWidget` to specify whether fonts should scale to respect Text Size accessibility settings

## [0.8.2] - 2023-10-10

### Fixed

- Fix compatibility with React Native < 71

## [0.8.1] - 2023-09-16

### Fixed

- Use `DefaultReactActivityDelegate` instead of `ReactActivityDelegate`
- Fix compatibility with React Native 71

## [0.8.0] - 2023-08-25

### Added

- Ability to configure (and reconfigure) widget once it is added on home screen

## [0.7.0] - 2023-07-15

### Added

- Upgrade to React Native 0.72.3
- Upgrade to Expo 49

## [0.6.2] - 2023-07-14

### Fixed

- Fix crash on Android <12 when using click action

## [0.6.1] - 2023-06-13

### Fixed

- Crop widget when reported and actual size are different on some launchers, instead of scaling
  because click targets are missaligned when scaling

## [0.6.0] - 2023-06-05

### Added

- Schedule widget updates with `updatePeriodMillis`
- Widget task handler called with `WIDGET_UPDATE` widgetAction on scheduled update
- Widget task handler called with `WIDGET_DELETED` when the widget is removed from the home screen
- Widget taks handler called with `WIDGET_RESIZED` on resize, without needing to click on it again

### Fixed

- Removed "Click to update widget" text and requirement to click on a widget before update
- Adding/resizing works now without requiring a widget click

### Removed

- Requirement for `android.permission.FOREGROUND_SERVICE`
- Removed `RNWidgetBackgroundTaskService`. For bare React Native it should be removed from AndroidManifest. Expo build are handled with the app plugin

## [0.5.3] - 2023-05-24

### Fixed

- Log native error in WidgetPreview

## [0.5.2] - 2023-05-23

### Fixed

- Fixed crash when items in `ListWidget` do not have `clickAction` and `clickActionData`
- Set default `height` and `width` on `ListWidget` to `match_parent`
- Don't call widget handler when clicking on a list item without `clickAction`

## [0.5.1] - 2023-04-30

### Fixed

- Fixed crash when adding widget next to Array.map

## [0.5.0] - 2023-04-24

### Added

- Added `ListWidget` that can show a scrollable list of items

## [0.4.1] - 2023-04-17

### Fixed

- Fix crash on iOS due to linking check

## [0.4.0] - 2023-04-05

### Added

- Setting `clickAction="OPEN_APP"` on a widget primitive will open the app when clicked
- Setting `clickAction="OPEN_URI" clickActionData={{ uri: 'https://google.com' }}` on a widget primitive will open google in web browser
- Setting `clickAction="OPEN_URI" clickActionData={{ uri: 'myapp://deep-link' }}` on a widget primitive will open the deep link in `myapp` if deep linking is configured

## [0.3.1] - 2023-04-03

### Fixed

- Fixed an issue where clicking on a widget with nested `clickAction` was triggering the topmost one, instead of the one directly under the clicked area

## [0.3.0] - 2023-03-20

### Added

- Upgrade to React Native 0.71.3
- Upgrade to Expo 48

## [0.2.0] - 2023-02-28

### Added

- Optional callback `widgetNotFound` in `requestWidgetUpdate`
- Exposed `getWidgetInfo` function that returns a list of widgets added on the home screen

## [0.1.1] - 2023-02-19

### Fixed

- Fixed an issue for `FlexWidget` when using `justifyContent` with value `'space-around', 'space-between', 'space-evenly'` with only one child
- Fixed how font files are loaded from `AssetManager`

## [0.1.0] - 2023-01-09

### Added

- Initial Release
