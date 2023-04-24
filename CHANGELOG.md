# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## Added

- Added `ListWidget` that can show a scrollable list of items

## [0.4.1] - 2023-04-17

## Fixed

- Fix crash on iOS due to linking check

## [0.4.0] - 2023-04-05

## Added

- Setting `clickAction="OPEN_APP"` on a widget primitive will open the app when clicked
- Setting `clickAction="OPEN_URI" clickActionData={{ uri: 'https://google.com' }}` on a widget primitive will open google in web browser
- Setting `clickAction="OPEN_URI" clickActionData={{ uri: 'myapp://deep-link' }}` on a widget primitive will open the deep link in `myapp` if deep linking is configured

## [0.3.1] - 2023-04-03

## Fixed

- Fixed an issue where clicking on a widget with nested `clickAction` was triggering the topmost one, instead of the one directly under the clicked area

## [0.3.0] - 2023-03-20

## Added

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
