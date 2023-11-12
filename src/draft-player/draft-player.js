import _ from 'lodash';

import Player from '../player/player';
import { parsePlayerStats } from '../player-stats/player-stats';

/**
 * Represents a player in a draft.
 *
 * @augments {Player}
 */
class DraftPlayer extends Player {
  static displayName = 'DraftPlayer';

  /**
   * Returns valid id params when 'id' and 'seasonId' are passed.
   *
   * @param   {object} params The params to use.
   * @returns {object|undefined} An object containing the params, or `undefined`.
   */
  static getIDParams(params = {}) {
    if (params.playerId && params.seasonId) {
      return {
        playerId: params.playerId,
        seasonId: params.seasonId
      };
    }

    return undefined;
  }

  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * @typedef {PlayerMap} DraftPlayerMap
   *
   * @property {number} id The id of the player in the ESPN universe.
   * @property {number} teamId The teamId of the fantasy team that drafted the player. Use
   *   `Client#getTeamAtWeek` to access fantasy team data.
   *
   * @property {number} overallPickNumber The overall pick number
   * @property {number} roundNumber The round in which the pick occurred
   * @property {number} roundPickNumber The pick number inside the round
   *
   * @property {boolean} isKeeper FOR KEEPER DRAFTS ONLY: Whether or not the "drafted" player is a
   *   keeper pick
   *
   * @property {number} bidAmount FOR AUCTION DRAFTS ONLY: How much the winning bid was
   * @property {number} nominatingTeamId FOR AUCTION DRAFTS ONLY: The teamId of the fantasy team
   *   that nominatied the player. Use `Client#getTeamAtWeek` to access fantasy team data.
   */
  /* eslint-enable jsdoc/no-undefined-types */

  /**
   * @type {DraftPlayerMap}
   */
  static responseMap = {
    id: 'playerId',
    teamId: 'teamId',

    overallPickNumber: 'overallPickNumber',
    roundNumber: 'roundId',
    roundPickNumber: 'roundPickNumber',

    isKeeper: 'keeper',

    bidAmount: 'bidAmount',
    nominatingTeamId: 'nominatingTeamId',

    positionalRanking: {
      key: 'ratings',
      manualParse: (responseData) => _.first(_.values(responseData))?.positionalRanking
    },
    overallRanking: {
      key: 'ratings',
      manualParse: (responseData) => _.first(_.values(responseData))?.totalRanking
    },

    rawStatsForYear: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 0
      })
    },
    projectedRawStatsForYear: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        statKey: 'stats',
        statSourceId: 1,
        statSplitTypeId: 0
      })
    },

    pointsScoredThisSeason: {
      key: 'ratings',
      manualParse: (responseData) => _.first(_.values(responseData))?.totalRating
    }
  };
}

export default DraftPlayer;
