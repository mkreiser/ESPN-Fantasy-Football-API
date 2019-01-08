import _ from 'lodash';

import SlottedPlayer from '../slotted-player/slotted-player.js';

import BoxscorePlayerPointStats
  from '../boxscore-player-point-stats/boxscore-player-point-stats.js';

/**
 * Represents a player on a team in a boxscore. Summarizes the player's stats and status.
 * @extends SlottedPlayer
 */
class BoxscorePlayer extends SlottedPlayer {
  static displayName = 'BoxscorePlayer';

  /**
   * @typedef {object} BoxscorePlayerObject
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
    * @type {BoxscorePlayerObject}
    */
  static responseMap = _.assign({}, SlottedPlayer.responseMap, {
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
  });
}

export default BoxscorePlayer;
