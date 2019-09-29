import _ from 'lodash';
import moment from 'moment';

import BaseObject from '../base-classes/base-object/base-object';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents basic information about an ESPN fantasy football league.
 *
 * @extends {BaseObject}
 */
class League extends BaseObject {
  static displayName = 'League';

  /**
   * @typedef {object} League~DraftSettings
   *
   * @property {moment} date The date of the draft.
   * @property {DRAFT_TYPE} type The type of draft.
   * @property {number} timePerPick The amount of time to make a selection.
   * @property {boolean} canTradeDraftPicks Whether or not draft picks can be traded.
   */

  /**
   * @typedef {object} League~RosterSettings
   *
   * @property {object} lineupPositionCount How many slots of each position are in a starting
   *                                        lineup. Key is position; value is count.
   * @property {object} positionLimits The maximum number of players that may be rostered of each
   *                                   position. Key is position; value is count.
   * @property {LINEUP_LOCK_TIMES} locktime When the starting lineup for a roster locks.
   */

  /**
   * @typedef {object} League~scheduleSettings
   *
   * @property {number} id The id of the NFL team in the ESPN universe.
   */


  /**
   * @typedef {object} League~LeagueMap
   *
   * @property {number} numberOfRegularSeasonMatchups
   * @property {number} regularSeasonMatchupLength How many weeks each regular season matchup lasts.
   * @property {number} numberOfPlayoffMatchups
   * @property {number} playoffMatchupLength How many weeks each playoff matchup lasts.
   * @property {number} numberOfPlayoffTeams
   */

  /**
    * @type {League~LeagueMap}
    * @property {string} name The name of the league.
    * @property {number} size The number of teams in the league.
    * @property {boolean} isPublic Whether or not the league is publically visible and accessible.
    *
    * @property {League~DraftSettings} draftSettings The draft settings of the league.
    * @property {League~RosterSettings} rosterSettings The roster settings of the league.
    * @property {League~ScheduleSettings} scheduleSettings The schedule settings of the league.
    */
  static responseMap = {
    name: 'name',
    size: 'size',
    isPublic: 'isPublic',

    draftSettings: {
      key: 'draftSettings',
      manualParse: (responseData) => ({
        date: moment(responseData.date),
        type: responseData.type,
        timePerPick: responseData.timePerSelection,
        canTradeDraftPicks: responseData.isTradingEnabled
      })
    },

    rosterSettings: {
      key: 'rosterSettings',
      manualParse: (responseData) => ({
        lineupPositionCount: _.mapKeys(
          responseData.lineupSlotCounts,
          (count, position) => _.get(slotCategoryIdToPositionMap, position)
        ),
        positionLimits: _.mapKeys(
          responseData.positionLimits,
          (count, position) => _.get(slotCategoryIdToPositionMap, position)
        ),
        locktime: responseData.rosterLocktimeType
      })
    },

    scheduleSettings: {
      key: 'scheduleSettings',
      manualParse: (responseData) => {
        const numberOfPlayoffMatchups = _.toSafeInteger(
          (
            17 - (responseData.matchupPeriodCount * responseData.matchupPeriodLength)
          ) / responseData.playoffMatchupPeriodLength
        );

        return {
          numberOfRegularSeasonMatchups: responseData.matchupPeriodCount,
          regularSeasonMatchupLength: responseData.matchupPeriodLength,
          numberOfPlayoffMatchups,
          playoffMatchupLength: responseData.playoffMatchupPeriodLength,
          numberOfPlayoffTeams: responseData.playoffTeamCount
        };
      }
    }
  };
}

export default League;
