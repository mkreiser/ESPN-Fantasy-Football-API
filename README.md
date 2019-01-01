# ESPN Fantasy Football API
[![Build Status](https://travis-ci.org/mkreiser/ESPN-Fantasy-Football-API.svg?branch=master)](https://travis-ci.org/mkreiser/ESPN-Fantasy-Football-API) [![Maintainability](https://api.codeclimate.com/v1/badges/548bae8930b5efad0418/maintainability)](https://codeclimate.com/github/mkreiser/ESPN-Fantasy-Football-API/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/548bae8930b5efad0418/test_coverage)](https://codeclimate.com/github/mkreiser/ESPN-Fantasy-Football-API/test_coverage) [![dependencies Status](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API/status.svg)](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API) [![devDependencies Status](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API/dev-status.svg)](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API?targetFile=package.json) [![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

A Javascript API client for both web and NodeJS that connects to ESPN's fantasy football API. Available as an npm package.

## Features

* Supports leagues, matchups, boxscores, and rosters.
  * Get matchup details, player performances, league standings, historical data, and more.
  * Private league support coming soon™.
* Highly documented.
* Built for speed and efficiency with caching support.
* Built for extensibility by using ES6 classes.

## Documentation Reference

Hosted documentation available at http://espn-fantasy-football-api.s3-website.us-east-2.amazonaws.com/.

## Installation

***npm module coming soon™.***

There are two files exported in the package:

* `dist/index-web.js` - Production file built for web environments

* `dist/index-node.js` - Production file built for node environments

## How to use

### Importing

```javascript
// Web
import { League, Team } from 'espn-fantasy-football-api';

// Node
import { League, Team } from 'espn-fantasy-football-api/dist/index-node.js';

// From local build
import { League, Team } from './dist/index-node.js';
```

### Loading a League

```javascript
import { League } from 'espn-fantasy-football-api';
const league = new League({ leagueId: 336358, seasonId: 2018 });
league.read().then(() => console.log(league)); // Prints loaded league
```

## Built With

[axios](https://github.com/axios/axios) - Promise based HTTP client.

[babel](https://github.com/babel/babel) + [webpack](https://github.com/webpack/webpack) - Compiles and bundles ES6 and next-gen Javascript to browser-compatible Javascript.

[eslint](https://github.com/eslint/eslint) - Fast code linting to maintain good style and code patterns.

[jest](https://github.com/facebook/jest) - Powerful and fast testing platform.

[jsdoc](https://github.com/jsdoc3/jsdoc) - Generated code documentation.

[lodash](https://github.com/lodash/lodash) - Utility library.

## Versioning

This project uses [Semantic Versioning](https://semver.org/).

## License

This project is licensed under [LGPL-3.0](https://choosealicense.com/licenses/lgpl-3.0/) (see LICENSE for details). Essentially, don't take this project and close source it.

This is my first time writing OSS and picking a license. Feel free to reach out with questions and/or concerns.


## Contributing

See [CONTRIBUTING.MD](https://github.com/mkreiser/ESPN-Fantasy-Football-API/blob/master/CONTRIBUTING.md)

## npm scripts

| Script     | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| build      | Builds the module                                            |
| build:docs | Builds the docs                                              |
| clean      | Runs all clean scripts                                       |
| clean:dist | Removes the dist folder                                      |
| clean:docs | Removes the docs folder                                      |
| ci         | Runs continuous integration tasks. Currently runs lint, test, and build |
| lint       | Ensures code style is correct                                |
| serve:docs | Builds and serves docs. Defaults to port 8080                |
| test       | Runs the unit tests                                          |
| test:watch | Runs and live-watches the unit tests                         |

## Acknowledgements

Thanks to the following projects for their work and documentation of the ESPN API. They served as the inspiration for this project.

[rbarton65/espnff](https://github.com/rbarton65/espnff)

[Possardt/espn-ff-api](https://github.com/Possardt/espn-ff-api)
