# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
 - Changed action when clicking a button. It will now select it in the configurator instead of triggering its sound.
### Fixed
 - Fixed ButtonConfigurator `label` input value not updating on selection change when the selected button has no label.
 - Fixed audio quality drops due to the keydown event triggering twice to a unique keypress. This caused the audio to play twice at the same time, greatly reducing its quality.
 - Removed React `Warning: Each child in a list should have a unique "key" prop` error. 
## [0.1.0-canary.1] - 2021-08-12
### Added
 - Properties saving. Pad will no longer reset on every restart.
 - Failing button indicator. When a button is failing, it now has a blinking red border.
### Changed
 - Default button properties. Good bye sad gray buttons, hello colorful buttons.
## [0.1.0-canary] - 2021-08-12
### Added
 - A first version of Pad.