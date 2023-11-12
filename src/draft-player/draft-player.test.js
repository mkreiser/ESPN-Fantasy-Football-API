import PlayerStats from '../player-stats/player-stats';

import DraftPlayer from './draft-player.js';

describe('DraftPlayer', () => {
  describe('class methods', () => {
    describe('getIDParams', () => {
      const testReturnsUndefined = ({ playerId, seasonId }) => {
        test('returns undefined', () => {
          const params = { playerId, seasonId };
          expect(DraftPlayer.getIDParams(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(DraftPlayer.getIDParams()).toBeUndefined();
        });
      });

      describe('when playerId is defined', () => {
        describe('when seasonId is defined', () => {
          test('returns a valid caching playerId', () => {
            const params = { playerId: 341243, seasonId: 2017 };

            const returnedCachingId = DraftPlayer.getIDParams(params);
            expect(returnedCachingId).toEqual(params);
          });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({ playerId: 341243 });
        });
      });

      describe('when playerId is undefined', () => {
        describe('when seasonId is defined', () => {
          testReturnsUndefined({ seasonId: 2017 });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({});
        });
      });
    });
  });

  describe('responseMap', () => {
    const buildPlayer = (data, options) => DraftPlayer.buildFromServer(data, options);

    describe('positionalRanking', () => {
      describe('when present on the response', () => {
        test('sets the data', () => {
          const player = buildPlayer({
            ratings: [{
              positionalRanking: 12
            }]
          }, {
            seasonId: 2022
          });
          expect(player.positionalRanking).toBe(12);
        });
      });

      describe('when not present on the response', () => {
        test('does not the data', () => {
          const player = buildPlayer({
            ratings: [{}]
          }, {
            seasonId: 2022
          });
          expect(player.positionalRanking).toBeUndefined();
        });
      });
    });

    describe('overallRanking', () => {
      describe('when present on the response', () => {
        test('sets the data', () => {
          const player = buildPlayer({
            ratings: [{
              totalRanking: 12
            }]
          }, {
            seasonId: 2022
          });
          expect(player.overallRanking).toBe(12);
        });
      });

      describe('when not present on the response', () => {
        test('does not the data', () => {
          const player = buildPlayer({
            ratings: [{}]
          }, {
            seasonId: 2022
          });
          expect(player.overallRanking).toBeUndefined();
        });
      });
    });

    describe('rawStatsForYear', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const stats = {
            appliedStats: {
              24: 2.3,
              25: 6
            },
            seasonId: 2022,
            stats: {
              24: 3,
              25: 6.4
            },
            statSourceId: 0,
            statSplitTypeId: 0
          };

          const player = buildPlayer({
            data: {
              player: {
                stats: [stats]
              }
            }
          }, {
            seasonId: 2022
          });
          const expectedStats = PlayerStats.buildFromServer(
            stats.stats,
            { usesPoints: false, seasonId: 2022 }
          );
          expect(player.rawStatsForYear).toEqual(expectedStats);
        });
      });
    });

    describe('projectedRawStatsForYear', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const stats = {
            appliedStats: {
              24: 2.3,
              25: 6
            },
            seasonId: 2022,
            stats: {
              24: 3,
              25: 6.4
            },
            statSourceId: 1,
            statSplitTypeId: 0
          };

          const player = buildPlayer({
            data: {
              player: {
                stats: [stats]
              }
            }
          }, {
            seasonId: 2022
          });
          const expectedStats = PlayerStats.buildFromServer(
            stats.stats,
            { usesPoints: false, seasonId: 2022 }
          );
          expect(player.projectedRawStatsForYear).toEqual(expectedStats);
        });
      });
    });

    describe('pointsScoredThisSeason', () => {
      describe('when present on the response', () => {
        test('sets the data', () => {
          const player = buildPlayer({
            ratings: [{
              totalRating: 12
            }]
          }, {
            seasonId: 2022
          });
          expect(player.pointsScoredThisSeason).toBe(12);
        });
      });

      describe('when not present on the response', () => {
        test('does not the data', () => {
          const player = buildPlayer({
            ratings: [{}]
          }, {
            seasonId: 2022
          });
          expect(player.pointsScoredThisSeason).toBeUndefined();
        });
      });
    });
  });
});
