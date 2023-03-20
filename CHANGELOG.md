# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
