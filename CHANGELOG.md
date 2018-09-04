# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [*1.0.1*] - <*2018-09-04*>

### Changed

* Added *outlook.office.com* to the CSP policy of the page router, to support inline Connector configurations

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