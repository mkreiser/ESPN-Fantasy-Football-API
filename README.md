# ESPN Fantasy Football API
[![npm](https://img.shields.io/npm/v/espn-fantasy-football-api.svg?colorB=deepskyblue)](https://www.npmjs.com/package/espn-fantasy-football-api) [![node](https://img.shields.io/node/v/espn-fantasy-football-api.svg)](https://www.npmjs.com/package/espn-fantasy-football-api) [![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

[![Build Status](https://travis-ci.org/mkreiser/ESPN-Fantasy-Football-API.svg?branch=master)](https://travis-ci.org/mkreiser/ESPN-Fantasy-Football-API) [![Maintainability](https://api.codeclimate.com/v1/badges/548bae8930b5efad0418/maintainability)](https://codeclimate.com/github/mkreiser/ESPN-Fantasy-Football-API/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/548bae8930b5efad0418/test_coverage)](https://codeclimate.com/github/mkreiser/ESPN-Fantasy-Football-API/test_coverage) [![dependencies Status](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API/status.svg)](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API) [![devDependencies Status](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API/dev-status.svg)](https://david-dm.org/mkreiser/ESPN-Fantasy-Football-API?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API?targetFile=package.json)


A Javascript API client for both web and NodeJS that connects to ESPN's fantasy football API. Available as an npm package.

## Converting to v3 API

In February 2019, ESPN deprecated and removed their `v2` fantasy football API and upgraded their site to a new `v3` API. ESPN had already made this change for their baseball and basketball fantasy APIs as well. This change broke every project running on the `v2` API, including this project. This project will not work until the code is converted to consume the `v3` API.

Work for converting this project is being tracked in #95. 

## Features

* Supports leagues, matchups, boxscores, and rosters.
  * Get matchup details, player performances, league standings, historical data, and more.
  * Private league support (node version only, see [Important Notes](#important-notes)).
* Highly documented.
* Built for speed and efficiency with caching support.
* Built for extensibility by using ES6 classes.

## Documentation Reference

Hosted documentation available at http://espn-fantasy-football-api.s3-website.us-east-2.amazonaws.com/.

## Installation

```
npm install --save espn-fantasy-football-api
```

There are two files exported in the package:

* `dist/index-web.js` - Production file built for web environments (**main/default file**).
* `dist/index-node.js` - Production file built for node environments.

## Important Notes

### ESPN Databases

This project simply retrieves data from ESPN and formats the responses in an easy to read and use format. ESPN is still responsible for maintaining and providing the data. Recently, many have noticed league data disappearing from previous years, including in other ESPN fantasy sports. This appears to be a result of ESPN deleting this data. While some data exists before 2017 (as of Feb. 1, 2019), some data (such as boxscores) is not longer available. 

### ESPN API Changes

**UPDATE**: This happened in February 2019.

Since this project wraps the ESPN API, any breaking changes to the ESPN API will break this project. Other ESPN fantasy sports have changed their APIs recently, causing old tools to no longer work. These routes are denoted by a `v3` api route (whereas fantasy football is still `v2`). 

I am confident in the core of this project. I believe the only changes that will be needed will be schema changes to each APIObject (`League`, etc). Once the `v3` routes are available, I will create and work on a feature branch to update this project for the new API.

### Private Leagues

Private leagues currently only work with the node version of this project. Since ESPN/Disney requires two auth cookies to make a valid request, we must provide those. However, modern web browsers forbid the setting of the `Cookie` header, causing authentication rejections in the web version, as the cookies are not passed on the request.

## How to use

### ESPN API Conventions

`seasonId` matches the year in which the season was played.

`matchupPeriod` refers to an entire match-up, including if the match-up lasts multiple weeks (not rare in playoff settings for smaller leagues).

`scoringPeriod` refers to a single NFL week. Since most matchups are 1 week long, the `scoringPeriod` will typically match the `matchupPeriod`. However, for multi-week matchups, `scoringPeriod` allows one to get information about a specific week in the match-up (useful in multi-week playoff match-up).

If both a `matchupPeriod` and a `scoringPeriod` are used, the `scoringPeriod` takes precedence.

### How to get data

*See documentation reference for more detail.*

**League** provides league information and settings. Great for league info and team data.

**Boxscore** provides detailed scoring information on a matchup. Great for getting scoring breakdowns by player.

**Scoreboard** provides a summary of each matchup. Great for matchup summary data (e.g. team scores).

**Roster** provides a detailed breakdown of a team's roster. Great for player information.

### Examples

NOTE: The NodeJS REPL does not work with `async`/`await`, so the following examples are written with Promises.

#### Importing

```javascript
// Web
import { League, Team } from 'espn-fantasy-football-api';

// Node
import { League, Team } from 'espn-fantasy-football-api/dist/index-node.js';

// From local build
import { League, Team } from './dist/index-node.js';
```

#### Loading a League

```javascript
import { League } from 'espn-fantasy-football-api';

const league = new League({ leagueId: 336358, seasonId: 2018 });
league.read().then(() => console.log(league)); // Prints loaded league
```

#### Loading a Private League

NOTE: Only works in node.

```javascript
import { BaseAPIObject, League } from 'espn-fantasy-football-api/dist/index-node.js';

BaseAPIObject.setCookies({ espnS2: 'xxxxx', SWID: '{xxxxxxxxxx}' }); // fire and forget

const league = new League({ leagueId: 336358, seasonId: 2018 });
league.read().then(() => console.log(league)); // Prints loaded league
```

#### Loading all Boxscores for a week

To prevent loading duplicate Boxscores, load the week's Scoreboard first and use each matchup to load the matching Boxscore.

```javascript
import { Boxscore, Scoreboard } from 'espn-fantasy-football-api';

const leagueId = 336358;
const seasonId = 2018;
const scoringPeriodId = 10; // Some week

Scoreboard.read({
    params: { leagueId, seasonId, scoringPeriodId }
}).then((scoreboard) => {
    const boxscorePromises = scoreboard.matchups.map((matchup) => Boxscore.read({
        params: { leagueId, seasonId, teamId: matchup.homeTeam.teamId, scoringPeriodId }
    }));

    return Promise.all(boxscorePromises)
}).then((boxscores) => {
    console.log(boxscores); // Prints all loaded Boxscores
});
```

## Testing

*How do you know it works?*

This project includes an expansive test suite. The unit tests ensure specific logic works as intended. The integration tests make live calls to the ESPN API, ensuring that the project will work in the real world.

Travis CI is used to build and verify changes/pull requests in a clean environment. Additionally, the master branch runs a weekly build on Travis to catch any issues when development activity is sparse.

## Built With

[axios](https://github.com/axios/axios) - Promise based HTTP client.

[babel](https://github.com/babel/babel) + [webpack](https://github.com/webpack/webpack) - Compiles and bundles ES6 and next-gen Javascript to browser-compatible Javascript.

[eslint](https://github.com/eslint/eslint) - Fast code linting to maintain good style and code patterns.

[jest](https://github.com/facebook/jest) - Powerful and fast testing platform.

[jsdoc](https://github.com/jsdoc3/jsdoc) - Generated code documentation.

[lodash](https://github.com/lodash/lodash) - Utility library.

## Versioning

This project uses [Semantic Versioning](https://semver.org/). Until the 1.0.0 version is published, all major changes will be published with a minor version bump.

## License

This project is licensed under [LGPL-3.0](https://choosealicense.com/licenses/lgpl-3.0/) (see LICENSE for details). Essentially, don't take this project and close source it.

This is my first time writing OSS and picking a license. Feel free to reach out with questions and/or concerns.


## Contributing

See [CONTRIBUTING.MD](https://github.com/mkreiser/ESPN-Fantasy-Football-API/blob/master/CONTRIBUTING.md)

## npm scripts

| Script           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| build            | Builds the module.                                           |
| build:docs       | Builds the docs.                                             |
| clean            | Runs all clean scripts.                                      |
| clean:dist       | Removes the dist folder.                                     |
| clean:docs       | Removes the docs folder.                                     |
| ci               | Runs continuous integration tasks. Currently runs lint, unit and integration tests, and build. |
| lint             | Ensures code style is correct.                               |
| serve:docs       | Builds and serves docs. Defaults to port 8080.               |
| test             | Starts a jest test runner with access to all tests. Pass `--watch` to keep jest alive and watching for changes. Pass a string as a file inclusion pattern. |
| test:all         | Runs the unit tests then the integration tests.              |
| test:integration | Runs the integration tests.                                  |
| test:unit        | Runs the unit tests.                                         |

## Acknowledgements

Thanks to the following projects for their work and documentation of the ESPN API. They served as the inspiration for this project.

[rbarton65/espnff](https://github.com/rbarton65/espnff)

[Possardt/espn-ff-api](https://github.com/Possardt/espn-ff-api)

