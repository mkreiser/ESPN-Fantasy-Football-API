import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

/**
 * Represents a matchup score for a week.
 *
 * @augments {BaseObject}
 */
class MatchupScore extends BaseObject {
  static displayName = 'MatchupScore';

  /**
   * @typedef {object} MatchupScore~MatchupScoreMap
   *
   * @property {number} matchupPeriodId The id of the matchup period
   *
   * @property {number} homeScore The total points scored by the home team.
   * @property {number} homeScoreLive The live points scored by the home team.
   * @property {number} homeTeamId The home team's id. Can be used to load a cached Team.
   *
   * @property {number} awayScore The total points scored by the away team.
   * @property {number} awayScoreLive The live points scored by the away team.
   * @property {number} awayTeamId The away team's id. Can be used to load a cached Team.
   */

  /**
   * @type {MatchupScore~MatchupScoreMap}
   */
  static responseMap = {
    matchupPeriodId: 'matchupPeriodId',

    homeScore: 'home.totalPoints',
    homeScoreLive: 'home.totalPointsLive',
    homeTeamId: 'home.teamId',

    awayScore: 'away.totalPoints',
    awayScoreLive: 'away.totalPointsLive',
    awayTeamId: 'away.teamId'
  };
}

export default MatchupScore;
