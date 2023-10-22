import _ from 'lodash';

import BaseCacheableObject from '../base-classes/base-cacheable-object/base-cacheable-object';

import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
} from '../constants.js';

/**
 * Represents a player in a draft.
 *
 * @augments {BaseCacheableObject}
 */
class DraftPlayer extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    this.seasonId = options.seasonId;
  }

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

  /**
   * @typedef {object} DraftPlayerMap
   *
   * @property {number} id The id of the player in the ESPN universe.
   * @property {string} name The full name of the player.
   * @property {number} teamId The teamId of the fantasy team that drafted the player. Use
   *   `Client#getTeamAtWeek` to access fantasy team data.
   * @property {string} proTeam The NFL team the player is rostered on.
   * @property {string} proTeamAbbreviation The NFL team abbreviation the player is rostered on.
   * @property {string} defaultPosition The default position in a fantasy roster for the player.
   * @property {string[]} eligiblePositions A list of the eligible positions in a fantasy roster the
   *                                        player may be slotted in.
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

  /**
   * @type {DraftPlayerMap}
   */
  static responseMap = {
    id: 'playerId',
    name: 'fullName',
    teamId: 'teamId',
    proTeam: {
      key: 'proTeamId',
      manualParse: (responseData) => _.get(nflTeamIdToNFLTeam, responseData)
    },
    proTeamAbbreviation: {
      key: 'proTeamId',
      manualParse: (responseData) => _.get(nflTeamIdToNFLTeamAbbreviation, responseData)
    },
    defaultPosition: {
      key: 'defaultPositionId',
      manualParse: (responseData) => _.get(slotCategoryIdToPositionMap, responseData)
    },
    eligiblePositions: {
      key: 'eligibleSlots',
      manualParse: (responseData) => _.map(responseData, (posId) => (
        _.get(slotCategoryIdToPositionMap, posId)
      ))
    },

    overallPickNumber: 'overallPickNumber',
    roundNumber: 'roundId',
    roundPickNumber: 'roundPickNumber',

    isKeeper: 'keeper',

    bidAmount: 'bidAmount',
    nominatingTeamId: 'nominatingTeamId'
  };
}

export default DraftPlayer;
