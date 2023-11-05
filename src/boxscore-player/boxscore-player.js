import _ from 'lodash';

import Player from '../player/player';
import { parsePlayerStats } from '../player-stats/player-stats';

import { slotCategoryIdToPositionMap } from '../constants';

/* global PlayerStats */

/**
 * Represents a player and their stats on a boxscore.
 *
 * @augments {Player}
 */
class BoxscorePlayer extends Player {
  static displayName = 'BoxscorePlayer';

  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * @typedef {PlayerMap} BoxscorePlayerMap
   *
   * @property {Player} player The player model representing the NFL player.
   * @property {string} rosteredPosition The position the player is slotted at in the fantasy lineup
   * @property {number} totalPoints The total points scored by the player.
   * @property {PlayerStats} pointBreakdown The PlayerStats model with the points scored by the
   *                                        player.
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player.
   */
  /* eslint-enable jsdoc/no-undefined-types */

  /**
   * @type {BoxscorePlayerMap}
   */
  static responseMap = {
    availabilityStatus: {
      key: 'status',
      manualParse: (responseData, data, rawData) => rawData.playerPoolEntry.status
    },
    rosteredPosition: {
      key: 'lineupSlotId',
      manualParse: (responseData) => _.get(slotCategoryIdToPositionMap, responseData)
    },
    totalPoints: 'appliedStatTotal',
    pointBreakdown: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 0,
        statSplitTypeId: 1
      })
    },
    projectedPointBreakdown: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 1,
        statSplitTypeId: 1
      })
    },
    rawStats: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      })
    },
    projectedRawStats: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
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
