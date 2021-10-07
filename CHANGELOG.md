# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [*Unreleased*] - <**>

### Added

* Unit testing
* Github code coverage integration

### Fixed

* Fixed in assue with CSP where the current host was not added correctly

### Changes

* **BREAKING**: Upgraded to `botbuilder` version `4.14.1` as minumum version
* Dependency bump
* Moved to Github actions
* Moved to ESLint

## [*1.7.0*] - <*2020-10-27*>

### Changes

* Bot Framework dependencies updated (PR #10)
* `BotDeclaration` now supports dynamically loaded parameters by supporting functions that return strings

### Added

* Support form certificate based auth for Bots (PR #6)

## [*1.6.2*] - <*2020-05-17*>

### Changes

* Updated dev dependencies

### Fixes

* Updated `"Content-Security-Policy` to support US Government GCC and DoD endpoints

## [*1.6.1*] - <*2020-04-22*>

### Fixes

* Fixed an issue where arrow functions was not used, preserving `this`, for Outgoing webhooks (PR #2)

## [*1.6.0*] - <*2020-03-05*>

### Changes

* Migrated to `botbuilder@4.7.1`
* Bots should be extending `ActivityHandler` instead of implementing the removed `IBot` interface (breaking change)

### Removed

* Removed the `IBot` interface

## [*1.5.2*] - <*2019-11-19*>

### Changes

* Fixed an issue where `this` was not correctly bound for incoming calls to the bot
* Node 6 no longer supported

## [*1.5.1*] - <*2019-06-14*>

### Changes

* Changed bot framework adapter from generic adapter to `TeamsAdapter`
* Updated the `BotDeclarator` implementation to use `reflect-metadata` and strict constructor checking
* Modified `MessagingExtensionDeclarator` so that it supports `undefined` as argument, for catch-all scenearios 

## [*1.5.0*] - <*2019-05-22*>

### Changes

* Updated version reference for `botbuilder-teams-messagingextensions`

## [*1.4.1*] - <*2019-05-07*>

### Changes

* Fixed versions for dependencies

## [*1.4.0*] - <*2019-05-06*>

### Added

* Added `BotCallingWebhook` method decorator to support webhooks for Bot calling
* Introduction of using `reflect-metadata` for improved decorator management

### Changes

* Updated `botbuilder-teams-messagingextensions` npm package version to support newer features of messaging extensions
* The bot classes are now instatiated with one additional parameter (`BotFrameworkAdapter`)

## [*1.3.1*] - <*2019-04-17*>

### Changes

* Updated `botbuilder-teams-messagingextensions` npm package version
* Updated README and inline documentation
* Added additional logging for Message extensions

## [*1.3.0*] - <*2019-04-16*>

### Added

* New declarator for Messaging Extensions
* New interface for Message Extensions
* Added Bot Framework 4 middleware for Messaging Extensions
* Added a new decorator for CSP policy (`PreventIframe`)

### Changes
* Messaging extensions are now created using the `botbuilder-teams-messagingextensions` npm package
* Updated dependencies
* Connector declaration redefined
* Updated to Bot Framework v4
* Added `Storage` property to `BotDeclaration`
* `IBot` interface changed to support new Bot Framework v4
* `IConnector` `Ping` method updated
* Removed CSP depending on hardcoded file names
* Changed internal property names for decorators to alwyas start with double underscore `__`

### Removed
* Removed experiemental/preview bot implementation
* Removed configuration property in `ConnectorDeclaration`
* Removed messaging extensions interfaces and experimental middleware, this is now defined in external `botbuilder-teams-messagingextensions` npm package

## [*1.0.1*] - <*2018-09-04*>

### Changed

* Added *outlook.office.com* to the CSP policy of the page router, to support inline Connector configurations
* Connector no longer uses a redirect pages when connecting/pinging but instead returns a HTTP 200 OK

## [*1.0.0*] - <*2018-08-13*>

### Added

* Added more comments and documentation

### Changed

* Moved logging from using console to using the `debug` package

## [*0.0.6*] - <*2018-08-07*>

### Changed

* Replace all arguments in the IConnector with the Express Request object

### Fixed

* Added current host in the content security policy for tabs, so we can load ADAL renewal frames

### Changed

* Ping method changed so that it accepts data
* Ping method now supports both POST and GET, data for POST is the body and data for GET is the query string

## [*0.0.5*] - <*2018-07-31*>

### Changed

* Added *.sharepoint.com in the content security policy for tabs

## [*0.0.4*] - <*2018-07-30*>

### Fixed

* Fixed an issue with how the bot service endpoint was registered in the router

### Changed

* Updated code to reflect linting changes

### Removed

* Removed the (unnecessary) botId argument for the BotDeclaration decorator

### Added

* Travis-ci integration
* Linting added (npm run lint)

## [*0.0.3*] - <*2018-07-29*>

### Changed

* Update to package-lock.json

## [*0.0.2*] - <*2018-07-28*>

### Changed

* Updated botbuilder package to latest

## [*0.0.1*] - <*2018-07-28*>

### Added

* Initial release