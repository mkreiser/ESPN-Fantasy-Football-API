import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Player from '../player/player.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents a Player slotted in a roster position.
 *
 * @extends BaseObject
 */
class SlottedPlayer extends BaseObject {
  static displayName = 'SlottedPlayer';

  /**
   * @typedef {object} SlottedPlayerObject
   *
   * @property {Player} player A Player instance for abstracted player information.
   *
   * @property {string} position The position (via `slotCategoryIdToPositionMap`) in which the
   *                             player is slotted. May be `bench`.
   *
   * @property {boolean} isKeeper Whether or not the player is designated as a kept player. Can only
   *                              be `true` if and only if the league is a keeper league.
   * @property {boolean} isLocked Whether or not the player is locked and cannot be moved to another
   *                              position.
   */

  /**
    * @type {SlottedPlayerObject}
    */
  static responseMap = {
    player: {
      key: 'player',
      manualParse: (responseData, response, constructorParams) => {
        if (_.isEmpty(responseData)) {
          return undefined;
        }

        const cacheId = Player.getCacheId(
          _.assign({}, constructorParams, { playerId: responseData.playerId })
        );
        return Player.get(cacheId) || Player.buildFromServer(responseData, constructorParams);
      }
    },

    position: {
      key: 'slotCategoryId',
      manualParse: (responseData) => _.get(slotCategoryIdToPositionMap, responseData)
    },

    isKeeper: 'isKeeper',
    isLocked: {
      key: 'lockStatus',
      manualParse: (responseData) => {
        switch (responseData) {
          case 0: return false;
          case 4: return true;
          default: return undefined;
        }
      }
    }
  };
}

export default SlottedPlayer;
