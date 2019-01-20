import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import ScoreboardMatchup from '../scoreboard-matchup/scoreboard-matchup.js';

/**
 * Represents the scoreboard of a League for a given matchup period or a given scoring period. From
 * here, the score and winner of each matchup can be found.
 *
 * Does not cache.
 *
 * @extends BaseAPIObject
 */
class Scoreboard extends BaseAPIObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the scoreboard belongs. Required to make reads.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the scoreboard belongs. Required to make reads.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the matchup period to which the scoreboard refers to. This or `scoringPeriodId` must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.matchupPeriodId = options.matchupPeriodId;

    /**
     * Id of the scoring period to which the scoreboard refers to. This or `matchupPeriodId` must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.scoringPeriodId = options.scoringPeriodId;
  }

  static displayName = 'Scoreboard';

  static route = 'scoreboard';

  /**
   * @typedef {object} ScoreboardObject
   *
   * @property {number} matchupPeriodId
   * @property {number} scoringPeriodId
   *
   * @property {string} dateOfFirstNFLGameInScoringPeriod A UTC timestamp of when the first NFL game
   *                                                      in the scoring period begins.
   * @property {boolean} nflGamesInProgress Whether or not there are any NFL games currently being
   *                                        played.
   *
   * @property {ScoreboardMatchupObject[]} matchups An array representing the matchups on the
   *                                                scoreboard.
   */

  /**
    * @type {ScoreboardObject}
    */
  static responseMap = {
    matchupPeriodId: 'scoreboard.matchupPeriodId',
    scoringPeriodId: 'scoreboard.scoringPeriodId',

    dateOfFirstNFLGameInScoringPeriod: 'scoreboard.dateFirstProGameOfScoringPeriod',
    nflGamesInProgress: 'scoreboard.proGamesInProgress',

    matchups: {
      key: 'scoreboard.matchups',
      manualParse: (responseData, response, constructorParams) => _.map(responseData, (matchup) => (
        ScoreboardMatchup.buildFromServer(matchup, constructorParams)
      ))
    }
  };

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

  read(
    {
      route = this.constructor.route, params, reload = true
    } = { route: this.constructor.route, reload: true }
  ) {
    const idParams = _.pickBy({
      leagueId: this.leagueId,
      seasonId: this.seasonId,
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

export default Scoreboard;
