import Player from '../player/player';
import { parsePlayerStats } from '../player-stats/player-stats';
import BaseObject from '../base-classes/base-object/base-object.js';

/* global PlayerStats */

/**
 * Represents an NFL player. This model is not directly associated with any fantasy team.
 *
 * @augments {BaseObject}
 */
class PlayerScore extends BaseObject {
  constructor(options = {}) {
    super(options);

    this.seasonId = options.seasonId;
  }

  static displayName = 'Player';

  /**
   * Returns valid id params when 'id' and 'seasonId' are passed.
   *
   * @param   {object} params The params to use.
   * @returns {object|undefined} An object containing the params, or `undefined`.
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
   * @typedef {object} PlayerScore~PlayerScoreMap
   *
   * @property {number} id The id of the player in the ESPN universe.
   * @property {Player} player The player model representing the NFL player.
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player over the season.
   */

  /**
   * @type {PlayerScore~PlayerScoreMap}
   */
  static responseMap = {
    id: 'id',
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
    }
  };
}

export default PlayerScore;
