# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.1.0-canary.3] - 2021-08-16
### Added
 - [`54e5a70`](https://github.com/hickatheworld/pad/commit/54e5a70) Added an indicator of the progress of the playing sound of each button.
 - [`d105d6c`](https://github.com/hickatheworld/pad/commit/d105d6c) Added the ability to stop a playing audio simply by pressing the button again.
### Changed
 - [`c6ef873`](https://github.com/hickatheworld/pad/commit/c6ef873) The active color now stays on display as long as the button's audio is being played, it no longer depends on the user's keypress.
 - [`fed62d0`](https://github.com/hickatheworld/pad/commit/fed62d0) An active button now blinks in its active color instead of staticly displaying it.
 - [`f1697a8`](https://github.com/hickatheworld/pad/commit/f1697a8) A button now can't play its sound simultaneously. It must wait for one instance of the sound to stop before playing a new one.
## [0.1.0-canary.2] - 2021-08-14
### Changed
 - [`2abebb7`](https://github.com/hickatheworld/pad/commit/2abebb7) Changed action when clicking a button. It will now select it in the configurator instead of triggering its sound.
 - [`ffc398d`](https://github.com/hickatheworld/pad/commit/ffc398d) Changed installer configuration. User can now choose where to install Pad.
### Fixed
 - [`f57e084`](https://github.com/hickatheworld/pad/commit/f57e084) Fixed ButtonConfigurator `label` input value not updating on selection change when the selected button has no label.
 - [`c1d026d`](https://github.com/hickatheworld/pad/commit/c1d026d) Fixed audio quality drops due to the keydown event triggering twice to a unique keypress. This caused the audio to play twice at the same time, greatly reducing its quality.
 - [`51d4de1`](https://github.com/hickatheworld/pad/commit/51d4de1) Fixed React `Warning: Each child in a list should have a unique "key" prop` error. 
 - [`b835f6c`](https://github.com/hickatheworld/pad/commit/b835f6c) Fixed application's name. It is now capitalized.
## [0.1.0-canary.1] - 2021-08-12
### Added
 - [`60545cd`](https://github.com/hickatheworld/pad/commit/60545cd) Properties saving. Pad will no longer reset on every restart.
 - [`3492d47`](https://github.com/hickatheworld/pad/commit/3492d47) Failing button indicator. When a button is failing, it now has a blinking red border.
### Changed
 - [`7204c7b`](https://github.com/hickatheworld/pad/commit/7204c7b) Default button properties. Good bye sad gray buttons, hello colorful buttons.
## [0.1.0-canary] - 2021-08-12
### Added
 - [`9675078`](https://github.com/hickatheworld/pad/commit/9675078) A first version of Pad.
