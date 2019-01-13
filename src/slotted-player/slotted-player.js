import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Player from '../player/player.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * @extends BaseObject
 */
class SlottedPlayer extends BaseObject {
  static displayName = 'SlottedPlayer';

  /**
   * @typedef {object} SlottedPlayerObject
   *
   * @property {Player} player A Player instance for generic player information.
   *
   * @property {string} position The position (from `slotCategoryIdToPositionMap`) in which the
   *                             player is slotted. May be `bench`.
   *
   * @property {boolean} isKeeper Whether or not the player is designated as a kept player. Can only
   *                              be `true` if the league is a keeper league.
   * @property {boolean} isLocked Whether or not the player is locked and cannot be moved to another
   *                              position.
   */

  /**
    * @type {SlottedPlayerObject}
    */
  static responseMap = {
    player: {
      key: 'player',
      manualParse: (responseData) => (
        _.isEmpty(responseData) ? undefined : Player.buildFromServer(responseData)
      )
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
