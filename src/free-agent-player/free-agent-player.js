import Player from '../player/player';

import { parsePlayerStats } from '../player-stats/player-stats';

/* global PlayerStats */

/**
 * Represents a player and their raw stats.
 *
 * @augments {Player}
 */
class FreeAgentPlayer extends Player {
  static displayName = 'FreeAgentPlayer';

  /**
   * @typedef {object} FreeAgentPlayerMap
   *
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player over the season.
   * @property {PlayerStats} projectedRawStats The PlayerStats model with the raw statistics
   *                                           projected by the player over the season.
   */

  /**
   * @type {FreeAgentPlayerMap}
   */
  static responseMap = {
    rawStats: {
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
    projectedRawStats: {
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
    }
  };
}

export default FreeAgentPlayer;
