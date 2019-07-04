import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import BoxscorePlayer from '../boxscore-player/boxscore-player';

/**
 * Represents a boxscore for a week.
 *
 * @extends {BaseObject}
 */
class Boxscore extends BaseObject {
  static displayName = 'Boxscore';

  /**
   * @typedef {object} Boxscore~BoxscoreMap
   *
   * @property {number} homeScore The total points scored by the home team.
   * @property {number} homeTeamId The home team's id. Can be used to load a cached Team.
   * @property {BoxscorePlayer[]} homeRoster The home team's roster, containing player info and
   *                                         stats.
   *
   * @property {number} awayScore The total points scored by the away team.
   * @property {number} awayTeamId The away team's id. Can be used to load a cached Team.
   * @property {BoxscorePlayer[]} awayRoster The away team's roster, containing player info and
   *                                         stats.
   */

  /**
   * @type {Boxscore~BoxscoreMap}
   */
  static responseMap = {
    homeScore: 'home.totalPoints',
    homeTeamId: 'home.teamId',
    homeRoster: {
      key: 'home.rosterForCurrentScoringPeriod.entries',
      isArray: true,
      manualParse: (responseData, data, constructorParams) => _.map(
        responseData,
        (playerData) => BoxscorePlayer.buildFromServer(playerData, constructorParams)
      )
    },

    awayScore: 'away.totalPoints',
    awayTeamId: 'away.teamId',
    awayRoster: {
      key: 'away.rosterForCurrentScoringPeriod.entries',
      isArray: true,
      manualParse: (responseData, data, constructorParams) => _.map(
        responseData,
        (playerData) => BoxscorePlayer.buildFromServer(playerData, constructorParams)
      )
    }
  };
}

export default Boxscore;
