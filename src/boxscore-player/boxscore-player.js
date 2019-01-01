import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';

import BoxscorePlayerPointStats
  from '../boxscore-player-point-stats/boxscore-player-point-stats.js';
import Player from '../player/player.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents a player on a team in a boxscore. Summarizes the player's stats and status. This is an
 * organizational class and not a class found on the API responses. Therefore, there is no id for
 * this class.
 * @extends ApiModel
 */
class BoxscorePlayer extends ApiModel {
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
      ApiModel: BoxscorePlayerPointStats
    },
    projectedStats: {
      key: 'currentPeriodProjectedStats.appliedStats',
      ApiModel: BoxscorePlayerPointStats
    }
  };

  /**
   * @throws Always, as BoxscorePlayer is an organizational class created by this project and does
   *         not exist on the ESPN API.
   */
  static read() {
    throw new Error(`${this.displayName}: read: Cannot call read.`);
  }
}

export default BoxscorePlayer;
