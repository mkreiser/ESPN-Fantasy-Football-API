import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import Player from '../player/player';
import PlayerStats from '../player-stats/player-stats';

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
      manualParse: (responseData, data, constructorParams) => {
        const statData = _.find(responseData.player.stats, { statSourceId: 0, statSplitTypeId: 1 });
        const params = _.assign({}, constructorParams, { usesPoints: true });
        return PlayerStats.buildFromServer(statData.appliedStats, params);
      }
    },
    rawStats: {
      key: 'playerPoolEntry',
      manualParse: (responseData, data, constructorParams) => {
        const statData = _.find(responseData.player.stats, { statSourceId: 0, statSplitTypeId: 1 });
        const params = _.assign({}, constructorParams, { usesPoints: false });
        return PlayerStats.buildFromServer(statData.stats, params);
      }
    }
  };
}

export default BoxscorePlayer;
