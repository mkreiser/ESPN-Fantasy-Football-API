# ESPN Fantasy Football API
[![npm](https://img.shields.io/npm/v/espn-fantasy-football-api.svg?colorB=deepskyblue)](https://www.npmjs.com/package/espn-fantasy-football-api) [![node](https://img.shields.io/node/v/espn-fantasy-football-api.svg)](https://www.npmjs.com/package/espn-fantasy-football-api) [![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

[![CI](https://github.com/mkreiser/ESPN-Fantasy-Football-API/actions/workflows/ci.yml/badge.svg)](https://github.com/mkreiser/ESPN-Fantasy-Football-API/actions/workflows/ci.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/548bae8930b5efad0418/maintainability)](https://codeclimate.com/github/mkreiser/ESPN-Fantasy-Football-API/maintainability) [![codecov](https://codecov.io/gh/mkreiser/ESPN-Fantasy-Football-API/graph/badge.svg?token=eYPSrLsdXz)](https://codecov.io/gh/mkreiser/ESPN-Fantasy-Football-API) [![Known Vulnerabilities](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mkreiser/ESPN-Fantasy-Football-API?targetFile=package.json)


A Javascript API client for both web and NodeJS that connects to the updated v3 ESPN fantasy football API. Available as an npm package.

## Features

* Supports pulling data from ESPN
* Private league support (NodeJS version only, see [Important Notes](#important-notes))
* Highly documented
* Built for speed and efficiency with caching support
* Built for extensibility by using ES6 classes

## Documentation Reference

Hosted documentation available at http://espn-fantasy-football-api.s3-website.us-east-2.amazonaws.com/.

## Installation

```
npm install --save espn-fantasy-football-api
```

There are four files exported in the package:

* `web.js` - Production file built for web environments (**main/default file**).
* `node.js` - Production file built for NodeJS environments.
* `web-dev.js` - Same as web, but not minified/obfused to make debugging/developing easier.
* `node-dev.js` - Same as node, but not minified/obfused to make debugging/developing easier.

## Important Notes

### ESPN Databases and Data Storage

This project simply retrieves data from ESPN and formats the responses in an easy to read and use format. ESPN is still responsible for maintaining and providing the data. Recently, many have noticed league data disappearing from previous years, including in other ESPN fantasy sports. This appears to be a result of ESPN deleting this data. While some data exists before 2017 (as of Feb. 1, 2019), some data (such as boxscores) is not longer available.

### ESPN API Changes

Since this project wraps the ESPN API, any breaking changes to the ESPN API will break this project. This occurred in February 2019 when ESPN migrated from their v2 API to a new v3 API (the original version of this project was completed in Janurary 2019). This project has been updated to consume ESPN's v3 API.

### Private Leagues

Private leagues currently only work with the NodeJS version of this project, due to limitations in setting headers in browsers.

## How to use

### ESPN API Conventions

* `leagueId` is the id for your league.
  * Example: `387659`
* `seasonId` matches the year in which the season was played.
  * Example: `2018`
* `matchupPeriod` refers to an entire match-up, including if the match-up lasts multiple weeks (not rare in playoff settings for smaller leagues).
  * Example: `3` refers to the third matchup in your league.
* `scoringPeriod` refers to a single NFL week. Since most matchups are 1 week long, the `scoringPeriod` will typically match the `matchupPeriod`. However, for multi-week matchups, `scoringPeriod` allows one to get information about a specific week in the match-up (useful in multi-week playoff match-up).
  * Example: `3` refers to the third week of the NFL season.
  * **Note**: A `scoringPeriodId` of `0` refers to the preseason before any games are played. A `scoringPeriodId` of `18` refers to the end of the season.

* If both a `matchupPeriod` and a `scoringPeriod` are used, the `scoringPeriod` takes precedence.

### Importing ESPN Fantasy Football API

```javascript
// ES6
import { ... } from 'espn-fantasy-football-api'; // web
import { ... } from 'espn-fantasy-football-api/node'; // node
import { ... } from 'espn-fantasy-football-api/web-dev'; // web development build
import { ... } from 'espn-fantasy-football-api/node-dev'; // node development build

// ES5
const { ... } = require('espn-fantasy-football-api'); // web
const { ... } = require('espn-fantasy-football-api/node'); // node
const { ... } = require('espn-fantasy-football-api/web-dev'); // web development build
const { ... } = require('espn-fantasy-football-api/node-dev'); // node development build
```

### How to Get Data

#### Creating a Client

This will allow you to call the various methods on the `Client` class to grab data for the passed league. For working with multiple leagues, create multiple `Client` instances.

```javascript
import { Client } from 'espn-fantasy-football-api';
const myClient = new Client({ leagueId: 432132 });
```

#### Working with Private Leagues

You need two cookies from ESPN: `espn_s2` and `SWID`. These are found at "Application > Cookies > espn.com" in the Chrome DevTools when on espn.com.

**Note**: As specified before, this functionality only works in NodeJS.

```javascript
const client = new Client({
  leagueId: 12345,
  espnS2: 'YOUR_ESPN_S2',
  SWID: 'YOUR_SWID'
});

/* OR */

const myClient = new Client({ leagueId: 12345 });
myClient.setCookies({ espnS2: 'YOUR_ESPN_S2', SWID: 'YOUR_SWID' });
```

## Example Project Usage

The following script calculate the best possible lineup each team could have started for a week:

```javascript
const _ = require('lodash');
const { Client } = require('espn-fantasy-football-api/node');

const myClient = new Client({
  leagueId: 12345,
  espnS2: 'YOUR_ESPN_S2',
  SWID: 'YOUR_SWID'
});

class Psychic {
  static filterPosition(boxscorePlayer, position) {
    return (
      boxscorePlayer.position === position ||
      _.includes(boxscorePlayer.player.eligiblePositions, position)
    );
  }

  static handleNonFlexPosition(lineup, position) {
    const players = _.filter(lineup, (player) => this.filterPosition(player, position));
    const sortedPlayers = _.sortBy(players, ['totalPoints']);
    return _.last(sortedPlayers);
  }

  static analyzeLineup(lineup, score) {
    let bestSum = 0;
    const bestRoster = [];
    let numChanges = 0;

    const bestQB = this.handleNonFlexPosition(lineup, 'QB')
    bestRoster.push(bestQB.player.fullName);
    bestSum += bestQB.totalPoints;
    if (bestQB.position === 'Bench') {
      numChanges += 1;
    }

    const bestDefense = this.handleNonFlexPosition(lineup, 'D/ST')
    bestRoster.push(bestDefense.player.fullName);
    bestSum += bestDefense.totalPoints;
    if (bestDefense.position === 'Bench') {
      numChanges += 1;
    }

    const bestKicker = this.handleNonFlexPosition(lineup, 'K')
    bestRoster.push(bestKicker.player.fullName);
    bestSum += bestKicker.totalPoints;
    if (bestKicker.position === 'Bench') {
      numChanges += 1;
    }


    const flexPlayers = _.filter(lineup, (player) => this.filterPosition(player, 'RB') ||
      this.filterPosition(player, 'WR') ||
      this.filterPosition(player, 'TE')
    );
    const sortedFlexPlayers = _.sortBy(flexPlayers, ['totalPoints']);

    const flexPos = { RB: 2, WR: 2, TE: 1, FLEX: 1 };

    while (_.sum(_.values(flexPos)) && !_.isEmpty(sortedFlexPlayers)) {
      const player = sortedFlexPlayers.pop();
      const acceptPlayer = () => {
        bestRoster.push(player.player.fullName);
        bestSum += player.totalPoints;
        if (player.position === 'Bench') {
          numChanges += 1;
        }
      }

      if (flexPos.RB && _.includes(player.player.eligiblePositions, 'RB')) {
        acceptPlayer();
        flexPos.RB -= 1;
      } else if (flexPos.WR && _.includes(player.player.eligiblePositions, 'WR')) {
        acceptPlayer();
        flexPos.WR -= 1;
      } else if (flexPos.TE && _.includes(player.player.eligiblePositions, 'TE')) {
        acceptPlayer();
        flexPos.TE -= 1;
      } else if (flexPos.FLEX) {
        acceptPlayer();
        flexPos.FLEX -= 1;
      }
    }

    return {
      bestSum,
      bestRoster,
      currentScore: score,
      numChanges
    };
  }

  static runForWeek({ seasonId, matchupPeriodId, scoringPeriodId }) {
    const bestLineups = {};
    return myClient.getBoxscoreForWeek({ seasonId, matchupPeriodId, scoringPeriodId }).then((boxes) => {
      _.forEach(boxes, (box) => {
        bestLineups[box.awayTeamId] = this.analyzeLineup(box.awayRoster, box.awayScore);
        bestLineups[box.homeTeamId] = this.analyzeLineup(box.homeRoster, box.homeScore);
      });

      return bestLineups;
    });
  }
}

Psychic.runForWeek({ seasonId: 2019, matchupPeriodId: 4, scoringPeriodId: 4 }).then((result) => {
  console.log(result);
  return result;
});
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

## npm scripts

| Script           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| build            | Builds the module.                                           |
| build:docs       | Builds the docs.                                             |
| clean            | Runs all clean scripts.                                      |
| clean:dist       | Removes the dist folder.                                     |
| clean:docs       | Removes the docs folder.                                     |
| ci               | Runs continuous integration tasks. Currently runs lint, unit and integration tests, and build. |
| lint             | Runs all lint tasks                                          |
| lint:js          | Ensures code style is correct.                               |
| lint:spelling    | Ensures spelling is correct.                                 |
| serve:docs       | Builds and serves docs. Defaults to port 8080.               |
| test             | Starts a jest test runner with access to all unit tests. Pass `--watch` to keep jest alive and watching for changes. Pass a string as a file inclusion pattern. |
| test:integration | Runs the integration tests.                                  |
