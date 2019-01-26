import _ from 'lodash';

import BaseCacheableObject from '../base-cacheable-object/base-cacheable-object.js';

import Player from './player.js';

import { localObject, serverResponse } from './player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('Player', () => {
  test('extends BaseCacheableObject', () => {
    const instance = new Player();
    expect(instance).toBeInstanceOf(BaseCacheableObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = Player.buildFromServer(serverResponse);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new Player(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new Player();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new Player({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const buildPlayer = (data, options) => Player.buildFromServer(data, options);

    describe('streakType', () => {
      describe('manualParse', () => {
        test('maps ids to positions', () => {
          const eligibleSlotCategoryIds = [0, 1, 2];
          const data = { eligibleSlotCategoryIds };

          const player = buildPlayer(data);

          expect.hasAssertions();
          _.forEach(player.eligiblePositions, (position, index) => {
            expect(position).toBe(
              _.get(slotCategoryIdToPositionMap, eligibleSlotCategoryIds[index])
            );
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      const testReturnsUndefined = ({ leagueId, seasonId, playerId }) => {
        test('returns undefined', () => {
          const params = { leagueId, seasonId, playerId };
          expect(Player.getCacheId(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(Player.getCacheId()).toBeUndefined();
        });
      });

      describe('when leagueId is defined', () => {
        describe('when seasonId is defined', () => {
          describe('when playerId is defined', () => {
            test('returns a valid caching id', () => {
              const params = { leagueId: 341243, seasonId: 2017, playerId: 9 };

              const returnedCachingId = Player.getCacheId(params);
              expect(returnedCachingId).toBe(
                `${params.playerId}-${params.leagueId}-${params.seasonId}`
              );
            });
          });

          describe('when playerId is undefined', () => {
            testReturnsUndefined({ leagueId: 341243, seasonId: 2017 });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when playerId is defined', () => {
            testReturnsUndefined({ leagueId: 341243, playerId: 9 });
          });

          describe('when playerId is undefined', () => {
            testReturnsUndefined({ leagueId: 341243 });
          });
        });
      });

      describe('when leagueId is undefined', () => {
        describe('when seasonId is defined', () => {
          describe('when playerId is defined', () => {
            testReturnsUndefined({ seasonId: 2017, playerId: 9 });
          });

          describe('when playerId is undefined', () => {
            testReturnsUndefined({ seasonId: 2017 });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when playerId is defined', () => {
            testReturnsUndefined({ playerId: 9 });
          });

          describe('when playerId is undefined', () => {
            testReturnsUndefined({});
          });
        });
      });
    });
  });
});
