import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import BoxscoreTeam from '../boxscore-team/boxscore-team.js';
import NFLGame from '../nfl-game/nfl-game.js';

/**
 * Represents the boxscore of a matchup between two teams.
 *
 * Boxscore does not cache.
 *
 * @extends BaseAPIObject
 */
class Boxscore extends BaseAPIObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the boxscore belongs. Required to make reads.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the boxscore belongs. Required to make reads.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the team to which the boxscore includes. The team is not guaranteed to be the home or
     * away team, but is guaranteed to be on the boxscore. Required to make reads.
     * @type {number}
     */
    this.teamId = options.teamId;

    /**
     * Id of the matchup period to which the boxscore refers to. This or `scoringPeriodId` must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.matchupPeriodId = options.matchupPeriodId;

    /**
     * Id of the scoring period to which the boxscore refers to. This or `matchupPeriodId` must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.scoringPeriodId = options.scoringPeriodId;
  }

  static displayName = 'Boxscore';

  static route = 'boxscore';

  /**
   * @typedef {object} BoxscoreObject
   *
   * @property {number} matchupPeriodId
   * @property {number} scoringPeriodId
   *
   * @property {NFLGame[]} nflGames The NFL games occuring during the `scoringPeriod`.
   *
   * @property {BoxscoreTeam} homeTeam The home team in the matchup.
   * @property {BoxscoreTeam} awayTeam The away team in the matchup.
   */

  /**
    * @type {BoxscoreObject}
    */
  static responseMap = {
    matchupPeriodId: 'boxscore.matchupPeriodId',
    scoringPeriodId: 'boxscore.scoringPeriodId',

    nflGames: {
      key: 'boxscore.progames',
      manualParse: (responseData) => _.map(responseData, (value) => NFLGame.buildFromServer(value))
    },

    homeTeam: {
      key: 'boxscore',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeam({
          teamPrefix: 'home', response, constructorParams
        })
      )
    },
    awayTeam: {
      key: 'boxscore',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeam({
          teamPrefix: 'away', response, constructorParams
        })
      )
    }
  };

  /**
   * Helper for team parsing.
   * @private
   */
  static _parseTeam({ teamPrefix, response, constructorParams }) {
    const scheduleItems = _.get(response, 'boxscore.scheduleItems');
    const matchups = _.get(_.first(scheduleItems), 'matchups');
    const matchup = _.first(matchups);

    const teamId = _.get(matchup, `${teamPrefix}TeamId`);
    const teamBoxscore = _.find(_.get(response, 'boxscore.teams'), { teamId });

    if (!matchup || !teamBoxscore) {
      return undefined;
    }

    const matchupScore = _.sum(_.get(matchup, `${teamPrefix}TeamScores`));
    return BoxscoreTeam.buildFromServer({ matchupScore, teamBoxscore }, constructorParams);
  }

  static getCacheId() {
    return undefined;
  }

  static read(
    {
      instance, route = this.route, params, reload = true
    } = { route: this.route, reload: true }
  ) {
    if (!_.get(params, 'leagueId')) {
      throw new Error(`${this.displayName}: static read: cannot read without leagueId`);
    } else if (!_.get(params, 'seasonId')) {
      throw new Error(`${this.displayName}: static read: cannot read without seasonId`);
    } else if (!_.get(params, 'teamId')) {
      throw new Error(`${this.displayName}: static read: cannot read without teamId`);
    } else if (!(_.get(params, 'matchupPeriodId') || _.get(params, 'scoringPeriodId'))) {
      throw new Error(
        `${this.displayName}: static read: cannot read without one of matchupPeriodId or ` +
        'scoringPeriodId'
      );
    }

    return super.read({
      instance, route, params, reload
    });
  }

  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    const idParams = _.pickBy({
      leagueId: this.leagueId,
      seasonId: this.seasonId,
      teamId: this.teamId,
      matchupPeriodId: this.matchupPeriodId,
      scoringPeriodId: this.scoringPeriodId
    }, (value) => _.isFinite(value));

    const paramsWithIds = _.assign({}, params, idParams);

    return super.read({
      route,
      params: paramsWithIds,
      reload
    });
  }
}

export default Boxscore;
