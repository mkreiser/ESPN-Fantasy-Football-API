import _ from 'lodash';
import BaseObject from '../base-classes/base-object/base-object';
import PlayerStats from '../player-stats/player-stats';
import Player from '../player/player';
import PlayerScore from './player-score';

describe('PlayerScore', () => {
  test('extends BaseObject', () => {
    const instance = new PlayerScore();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new PlayerScore();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('seasonId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new PlayerScore({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('seasonId');
    });

    describe('responseMap', () => {
      const buildPlayerScore = (data, options) => PlayerScore.buildFromServer(data, options);

      let seasonId;
      let pointStats;
      let projectedStats;
      let data;

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
          statSplitTypeId: 0
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
          statSplitTypeId: 0
        };

        data = {
          player: {
            stats: [projectedStats, pointStats]
          }
        };
      });

      describe('player', () => {
        describe('manualParse', () => {
          test('returns a Player', () => {
            const playerScore = buildPlayerScore(data, { seasonId });
            expect(playerScore.player).toBeInstanceOf(Player);
          });
        });
      });

      describe('rawStats', () => {
        describe('manualParse', () => {
          test('maps points to a PlayerStats instance', () => {
            const player = buildPlayerScore(data, { seasonId });
            const expectedStats = PlayerStats.buildFromServer(
              pointStats.stats, { usesPoints: false, seasonId }
            );
            expect(player.rawStats).toEqual(expectedStats);
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getIDParams', () => {
      const testReturnsUndefined = ({ id, seasonId }) => {
        test('returns undefined', () => {
          const params = { id, seasonId };
          expect(PlayerScore.getIDParams(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(PlayerScore.getIDParams()).toBeUndefined();
        });
      });

      describe('when id is defined', () => {
        describe('when seasonId is defined', () => {
          test('returns a valid caching id', () => {
            const params = { id: 341234, seasonId: 2021 };

            const returnedCachingId = PlayerScore.getIDParams(params);
            expect(returnedCachingId).toEqual(params);
          });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({ id: 341234 });
        });
      });

      describe('when id is undefined', () => {
        describe('when seasonId is defined', () => {
          testReturnsUndefined({ seasonId: 2021 });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({});
        });
      });
    });
  });
});
