import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import Player from '../player/player';
import { parsePlayerStats } from '../player-stats/player-stats';

import { slotCategoryIdToPositionMap } from '../constants';

/**
 * Represents a player and their stats on a boxscore.
 *
 * @extends {BaseObject}
 */
class BoxscorePlayer extends BaseObject {
  static displayName = 'BoxscorePlayer';

  /**
   * @typedef {object} BoxscorePlayer~BoxscorePlayerMap
   *
   * @property {Player} player The player model representing the NFL player.
   * @property {string} position The position the player is slotted at in the fantasy lineup.
   * @property {number} totalPoints The total points scored by the player.
   * @property {PlayerStats} pointBreakdown The PlayerStats model with the points scored by the
   *                                        player.
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player.
   */

  /**
   * @type {BoxscorePlayer~BoxscorePlayerMap}
   */
  static responseMap = {
    player: {
      key: 'playerPoolEntry',
      BaseObject: Player
    },
    position: {
      key: 'lineupSlotId',
      manualParse: (responseData) => _.get(slotCategoryIdToPositionMap, responseData)
    },
    totalPoints: 'playerPoolEntry.appliedStatTotal',
    pointBreakdown: {
      key: 'playerPoolEntry',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 0,
        statSplitTypeId: 1
      })
    },
    projectedPointBreakdown: {
      key: 'playerPoolEntry',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 1,
        statSplitTypeId: 1
      })
    },
    rawStats: {
      key: 'playerPoolEntry',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      })
    },
    projectedRawStats: {
      key: 'playerPoolEntry',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        statKey: 'stats',
        statSourceId: 1,
        statSplitTypeId: 1
      })
    }
  };
}

export default BoxscorePlayer;
