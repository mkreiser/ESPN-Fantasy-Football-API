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

  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * @typedef {PlayerMap} FreeAgentPlayerMap
   *
   * @property {PlayerStats} rawStats The PlayerStats model with the raw statistics registered by
   *                                  the player over the season.
   * @property {PlayerStats} projectedRawStats The PlayerStats model with the raw statistics
   *                                           projected by the player over the season.
   */
  /* eslint-enable jsdoc/no-undefined-types */

  /**
   * @type {FreeAgentPlayerMap}
   */
  static responseMap = {
    rawStatsForYear: {
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
    projectedRawStatsForYear: {
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
    },

    rawStatsForScoringPeriod: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        scoringPeriodId: constructorParams.scoringPeriodId,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      })
    },
    projectedRawStatsForScoringPeriod: {
      key: 'stats',
      manualParse: (responseData, data, rawData, constructorParams) => parsePlayerStats({
        responseData,
        constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        scoringPeriodId: constructorParams.scoringPeriodId,
        statKey: 'stats',
        statSourceId: 1,
        statSplitTypeId: 1
      })
    }
  };
}

export default FreeAgentPlayer;
