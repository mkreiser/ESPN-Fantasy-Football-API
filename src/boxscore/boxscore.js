import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import BoxscoreTeam from '../boxscore-team/boxscore-team.js';
import NFLGame from '../nfl-game/nfl-game.js';

/**
 * Represents the boxscore of a matchup between two teams. Requires `leagueId`, `seasonId`,
 * `teamId`, and at least one of `matchupPeriodId` and `scoringPeriodId`.
 *
 * Boxscore does not cache.
 *
 * Only introduced in 2017 and valid for all matchups in 2017 or after.
 * @extends BaseAPIObject
 */
class Boxscore extends BaseAPIObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the boxscore belongs. Required to make reads on the Boxscore
     * instance.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the boxscore belongs. Required to make reads on
     * the Boxscore instance.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the team to which the boxscore includes. The team is not guaranteed to be the home or
     * away team, but rather just guaranteed to be on the boxscore. Required to make reads on the
     * Boxscore instance.
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
   * @typedef {object} BoxscoreModel
   *
   * @property {number} matchupPeriodId
   * @property {number} scoringPeriodId
   *
   * @property {NFLGame[]} nflGames An array of the NFL games occuring during the `scoringPeriod`.
   *
   * @property {BoxscoreTeam} homeTeam A BoxscoreTeam representing the home team in the matchup.
   * @property {BoxscoreTeam} awayTeam A BoxscoreTeam representing the away team in the matchup.
   */

  /**
    * @type {BoxscoreModel}
    */
  static responseMap = {
    matchupPeriodId: 'boxscore.matchupPeriodId',
    scoringPeriodId: 'boxscore.scoringPeriodId',

    nflGames: {
      key: 'boxscore.progames',
      manualParse: (responseData) => _.map(responseData, (value) => NFLGame.buildFromServer(value))
    },

    homeTeam: {
      key: 'teams',
      manualParse: (responseData, response, model) => model.constructor._parseTeam({
        teamPrefix: 'home', response, model
      })
    },
    awayTeam: {
      key: 'teams',
      manualParse: (responseData, response, model) => model.constructor._parseTeam({
        teamPrefix: 'away', response, model
      })
    }
  };

  /**
   * Helper for team parsing.
   * @private
   */
  static _parseTeam({ teamPrefix, response, model }) {
    const scheduleItems = _.get(response, 'boxscore.scheduleItems');
    const matchups = _.get(_.first(scheduleItems), 'matchups');
    const matchup = _.first(matchups);
    const matchupScore = _.sum(_.get(matchup, `${teamPrefix}TeamScores`));

    const teamId = _.get(matchup, `${teamPrefix}TeamId`);
    const teamBoxscore = _.find(_.get(response, 'boxscore.teams'), { teamId });

    return BoxscoreTeam.buildFromServer(
      { matchupScore, teamBoxscore },
      { leagueId: model.leagueId, seasonId: model.seasonId }
    );
  }

  static getCacheId() {
    return undefined;
  }
}

export default Boxscore;
