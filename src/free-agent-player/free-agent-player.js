import BaseObject from '../base-classes/base-object/base-object';

import Player from '../player/player';
import { parsePlayerStats } from '../player-stats/player-stats';

/**
 * Represents a player and their raw stats.
 *
 * @extends {BaseObject}
 */
class FreeAgentPlayer extends BaseObject {
  static displayName = 'FreeAgentPlayer';

  /**
   * @typedef {object} FreeAgentPlayer~FreeAgentPlayerMap
   *
   * @property {Player} player The player model representing the NFL player.
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player over the season.
   * @property {PlayerStats} projectedRawStats The PlayerStats model with the raw statistics
   *                                           projected by the player over the season.
   */

  /**
   * @type {FreeAgentPlayer~FreeAgentPlayerMap}
   */
  static responseMap = {
    player: {
      key: 'player',
      manualParse: (responseData, data, constructorParams) => (
        Player.buildFromServer(data, constructorParams)
      )
    },
    rawStats: {
      key: 'player',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData: data,
        constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 0
      })
    },
    projectedRawStats: {
      key: 'player',
      manualParse: (responseData, data, constructorParams) => parsePlayerStats({
        responseData: data,
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
