import PlayerStats from '../player-stats/player-stats';

import FreeAgentPlayer from './free-agent-player';

describe('FreeAgentPlayer', () => {
  describe('responseMap', () => {
    const buildFreeAgentPlayer = (data, options) => FreeAgentPlayer.buildFromServer(data, options);

    let data;
    let pointStats;
    let projectedStats;
    let rawYearStats;
    let projectedRawYearStats;
    let seasonId;

    beforeEach(() => {
      seasonId = 2018;
      pointStats = {
        appliedStats: {
          24: 2.3,
          25: 6
        },
        seasonId,
        stats: {
          24: 3,
          25: 6.4
        },
        statSourceId: 0,
        statSplitTypeId: 1
      };
      projectedStats = {
        appliedStats: {
          24: 4.2,
          25: 1
        },
        seasonId,
        stats: {
          24: 3.2,
          25: 4
        },
        statSourceId: 1,
        statSplitTypeId: 1
      };

      rawYearStats = {
        appliedStats: {
          24: 2.3,
          25: 6
        },
        seasonId,
        stats: {
          24: 3,
          25: 6.4
        },
        statSourceId: 0,
        statSplitTypeId: 0
      };
      projectedRawYearStats = {
        appliedStats: {
          24: 4.2,
          25: 1
        },
        seasonId,
        stats: {
          24: 3.2,
          25: 4
        },
        statSourceId: 1,
        statSplitTypeId: 0
      };

      data = {
        player: {
          stats: [
            projectedStats,
            pointStats,
            rawYearStats,
            projectedRawYearStats
          ]
        }
      };
    });

    describe('rawStatsForScoringPeriod', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            pointStats.stats,
            { usesPoints: false, seasonId }
          );
          expect(player.rawStatsForScoringPeriod).toEqual(expectedStats);
        });
      });
    });

    describe('projectedRawStatsForScoringPeriod', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            projectedStats.stats,
            { usesPoints: false, seasonId }
          );
          expect(player.projectedRawStatsForScoringPeriod).toEqual(expectedStats);
        });
      });
    });

    describe('rawStatsForYear', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            rawYearStats.stats,
            { usesPoints: false, seasonId }
          );
          expect(player.rawStatsForYear).toEqual(expectedStats);
        });
      });
    });

    describe('projectedRawStatsForYear', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            projectedRawYearStats.stats,
            { usesPoints: false, seasonId }
          );
          expect(player.projectedRawStatsForYear).toEqual(expectedStats);
        });
      });
    });
  });
});
