import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import BoxscorePlayerPointStats
  from '../boxscore-player-point-stats/boxscore-player-point-stats.js';
import Player from '../player/player.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents a player on a team in a boxscore. Summarizes the player's stats and status. This is an
 * organizational class and not a class found on the API responses. Therefore, there is no id for
 * this class.
 * @extends BaseObject
 */
class BoxscorePlayer extends BaseObject {
  static displayName = 'BoxscorePlayer';

  /**
   * @typedef {object} BoxscorePlayerModel
   *
   * @property {Player} player A Player instance for generic player information.
   * @property {string} position The position (from `slotCategoryIdToPositionMap`) in which the
   *                             player is slotted in the boxscore. May be `bench`.
   * @property {boolean} isLocked Whether or not the player is locked and cannot be moved to another
   *                              position.
   *
   * @property {number} totalPoints The total of points the player has scored in the scoring period
   *                                across all stats.
   * @property {number} projectedPoints The total of points the player is projected to score in the
   *                                    scoring period across all stats.
   *
   * @property {BoxscorePlayerPointStats} stats A breakdown of the player's points scored by stat.
   * @property {BoxscorePlayerPointStats} projectedStats A breakdown of the player's projected
   *                                                     points scored by stat.
   */

  /**
    * @type {BoxscorePlayerModel}
    */
  static responseMap = {
    player: {
      key: 'player',
      manualParse: (responseData) => {
        if (_.isEmpty(responseData)) {
          return undefined;
        }

        return Player.get(responseData.playerId) || Player.buildFromServer(responseData);
      }
    },

    position: {
      key: 'slotCategoryId',
      manualParse: (responseData) => _.get(slotCategoryIdToPositionMap, responseData)
    },
    isLocked: {
      key: 'lockStatus',
      manualParse: (responseData) => {
        switch (responseData) {
          case 0: return false;
          case 4: return true;
          default: return undefined;
        }
      }
    },

    totalPoints: 'currentPeriodRealStats.appliedStatTotal',
    projectedPoints: 'currentPeriodProjectedStats.appliedStatTotal',

    stats: {
      key: 'currentPeriodRealStats.appliedStats',
      BaseObject: BoxscorePlayerPointStats
    },
    projectedStats: {
      key: 'currentPeriodProjectedStats.appliedStats',
      BaseObject: BoxscorePlayerPointStats
    }
  };
}

export default BoxscorePlayer;
