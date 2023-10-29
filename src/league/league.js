import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import {
  scoringIdToItem,
  slotCategoryIdToPositionMap
} from '../constants';

/* global DRAFT_TYPE, LINEUP_LOCK_TIMES */

/**
 * Represents basic information about an ESPN fantasy football league.
 *
 * @augments {BaseObject}
 */
class League extends BaseObject {
  static displayName = 'League';

  /**
   * @typedef {object} DraftSettings
   *
   * @property {Date} date The date of the draft.
   * @property {DRAFT_TYPE} type The type of draft.
   * @property {number} timePerPick The amount of time to make a selection.
   * @property {boolean} canTradeDraftPicks Whether or not draft picks can be traded.
   * @property {number} currentMatchupPeriodId The current matchup period id (see README.md for
   *   matchupPeriod v. scoringPeriod)
   * @property {number} currentScoringPeriodId The current scoring period id (see README.md for
   *   matchupPeriod v. scoringPeriod)
   */

  /**
   * @typedef {object} RosterSettings
   *
   * @property {object} lineupPositionCount How many slots of each position are in a starting
   *                                        lineup. Key is position; value is count.
   * @property {object} positionLimits The maximum number of players that may be rostered of each
   *                                   position. Key is position; value is count.
   * @property {LINEUP_LOCK_TIMES} locktime When the starting lineup for a roster locks.
   */

  /**
   * @typedef {object} ScheduleSettings
   *
   * @property {number} numberOfRegularSeasonMatchups The number of regular season matchups a team
   *                                                  will have on the schedule.
   * @property {number} regularSeasonMatchupLength How many weeks each regular season matchup lasts.
   * @property {number} numberOfPlayoffMatchups The number of playoff matchups a team will have
   *                                            on the schedule.
   * @property {number} playoffMatchupLength How many weeks each playoff matchup lasts.
   * @property {number} numberOfPlayoffTeams The number of playoff teams there will be.
   */

  /**
   * @typedef {object} LeagueMap
   *
   * @property {string} name The name of the league.
   * @property {number} size The number of teams in the league.
   * @property {boolean} isPublic Whether or not the league is publically visible and accessible.
   *
   * @property {DraftSettings} draftSettings The draft settings of the league.
   * @property {RosterSettings} rosterSettings The roster settings of the league.
   * @property {ScheduleSettings} scheduleSettings The schedule settings of the league.
   * @property {object} scoringSettings The scoring settings of the league.
   */

  /**
   * @type {LeagueMap}
   */
  static responseMap = {
    name: 'name',
    size: 'size',
    isPublic: 'isPublic',

    currentMatchupPeriodId: 'currentMatchupPeriodId',
    currentScoringPeriodId: 'currentScoringPeriodId',

    draftSettings: {
      key: 'draftSettings',
      manualParse: (responseData) => ({
        date: new Date(responseData.date),
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
    },

    scoringSettings: {
      key: 'scoringSettings',
      manualParse: (responseData) => _.reduce(
        responseData.scoringItems,
        (acc, { points, pointsOverrides, statId }) => {
          const key = scoringIdToItem[statId];

          if (!key) {
            return acc;
          }

          if (pointsOverrides) {
            acc[key] = _.first(_.values(pointsOverrides));
          } else {
            acc[key] = points;
          }

          return acc;
        },
        {}
      )
    }
  };
}

export default League;
