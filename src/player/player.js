import _ from 'lodash';

import BaseCacheableObject from '../base-classes/base-cacheable-object/base-cacheable-object.js';

import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
} from '../constants.js';

/**
 * Represents an NFL player. This model is not directly associated with any fantasy team.
 *
 * @extends {BaseCacheableObject}
 */
class Player extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    this.seasonId = options.seasonId;
  }

  static displayName = 'Player';

  static flattenResponse = true;

  /**
   * Returns valid id params when 'id' and 'seasonId' are passed.
   * @param  {Object} params
   * @return {Object|undefined}
   */
  static getIDParams(params = {}) {
    if (params.id && params.seasonId) {
      return {
        id: params.id,
        seasonId: params.seasonId
      };
    }

    return undefined;
  }

  /**
   * @typedef {object} Player~PlayerMap
   *
   * @property {number} id
   * @property {string} firstName The first name of the player.
   * @property {string} lastName The last name of the player.
   * @property {string} fullName The full name of the player.
   * @property {number} jerseyNumber The jersey number the player wears.
   * @property {string} proTeam The NFL team the player is rostered on.
   * @property {string} proTeamAbbreviation The NFL team abbreviation the player is rostered on.
   * @property {string} defaultPosition The default position in a fantasy roster for the player.
   * @property {string[]} eligiblePositions A list of the eligible positions in a fantasy roster the
   *                                        player may be slotted in.
   *
   * @property {number} averageDraftPosition The average position the player was drafted at in ESPN
   *                                         snake drafts.
   * @property {number} averageAuctionValue The average auction price the player fetched in ESPN
   *                                         auction drafts.
   * @property {number} percentChange The change in player ownership percentage in the last
   *                                  week across all ESPN leagues.
   * @property {number} percentStarted The percentage of ESPN league in which this player is/was
   *                                   started.
   * @property {number} percentOwned The percentage of ESPN leagues in which this player is owned.
   *
   * @property {Date} acquiredDate The datetime the player was acquired by their current fantasy
   *                               team.
   *
   * @property {PLAYER_AVAILABILITY_STATUSES} availabilityStatus The fantasy roster status of the
   *                                                             player.
   * @property {boolean} isDroppable Whether or not the player can be dropped from a team.
   * @property {boolean} isInjuried Whether or not the player is injuried.
   * @property {INJURY_STATUSES} injuryStatus The specific injury status/timeline of the player.
   */

  /**
   * @type {Player~PlayerMap}
   */
  static responseMap = {
    id: 'id',
    firstName: 'firstName',
    fullName: 'fullName',
    lastName: 'lastName',
    jerseyNumber: {
      key: 'jersey',
      manualParse: (responseData) => _.toNumber(responseData)
    },
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
      manualParse: (responseData) => _.map(
        responseData, (posId) => _.get(slotCategoryIdToPositionMap, posId)
      )
    },

    averageDraftPosition: 'averageDraftPosition',
    auctionValueAverage: 'auctionValueAverage',
    percentChange: 'percentChange',
    percentStarted: 'percentStarted',
    percentOwned: 'percentOwned',

    acquiredDate: {
      key: 'acquisitionDate',
      manualParse: (responseData) => (responseData ? new Date(responseData) : undefined)
    },

    availabilityStatus: 'status',
    isDroppable: 'droppable',
    isInjured: 'injured',
    injuryStatus: 'injuryStatus'
  };
}

export default Player;
