import _ from 'lodash';

import BaseCacheableObject from '../base-cacheable-object/base-cacheable-object.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents an NFL player that can be rostered on a fantasy football team.
 *
 * Player data is always up to date in the season to which the player belongs. There is no
 * intra-season historic data for a Player.
 *
 * There is currently not a discovered route to directly get player information. However, player
 * information can be retrieved from a boxscore and a team roster.
 *
 * @extends BaseCacheableObject
 */
class Player extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the league to which the player belongs.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season to which the player belongs.
     * @type {number}
     */
    this.seasonId = options.seasonId;
  }

  static displayName = 'Player';

  static idName = 'playerId';

  /**
   * @typedef {object} PlayerObject
   *
   * @property {number} playerId
   *
   * @property {string} firstName First name of the player.
   * @property {string} lastName Last name of the player.
   * @property {string} jerseyNumber The jersey number the player wears.
   *
   * @property {number} percentOwned The percentage of ESPN leagues in which this player is owned.
   * @property {number} percentOwnedChange The change in player ownership percentage in the last
   *                                       week across all ESPN.
   * @property {number} percentStarted The percentage of ESPN league in which this player is/was
   *                                   started.
   *
   * @property {boolean} isDroppable Whether or not the player can be dropped from a team.
   * @property {boolean} isActive Whether or not the player is active? TOOD: Improve knowledge.
   * @property {boolean} isIREligible Whether or not the player is eligible to be placed in an IR
   *                                  roster slot.
   *
   * @property {string[]} eligiblePositions A list of the eligible position slots the player may be
   *                                        played in.
   */

  /**
    * @type {PlayerObject}
    */
  static responseMap = {
    playerId: 'playerId',

    firstName: 'firstName',
    lastName: 'lastName',
    jerseyNumber: 'jersey',

    percentOwned: 'percentOwned',
    percentOwnedChange: 'percentChange',
    percentStarted: 'percentStarted',

    isDroppable: 'isDroppable',
    isActive: 'isActive',
    isIREligible: 'isIREligible',

    eligiblePositions: {
      key: 'eligibleSlotCategoryIds',
      manualParse: (responseData) => _.map(
        responseData, (posId) => _.get(slotCategoryIdToPositionMap, posId)
      )
    }
  };

  static getCacheId({ playerId, leagueId, seasonId } = {}) {
    return (playerId && leagueId && seasonId) ? `${playerId}-${leagueId}-${seasonId}` : undefined;
  }
}

export default Player;
