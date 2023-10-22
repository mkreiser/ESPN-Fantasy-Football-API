import _ from 'lodash';

import BaseCacheableObject from '../base-classes/base-cacheable-object/base-cacheable-object.js';

import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
} from '../constants.js';

import DraftPlayer from './draft-player.js';

describe('DraftPlayer', () => {
  test('extends BaseCacheableObject', () => {
    const instance = new DraftPlayer();
    expect(instance).toBeInstanceOf(BaseCacheableObject);
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new DraftPlayer();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('seasonId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new DraftPlayer({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const buildPlayer = (data, options) => DraftPlayer.buildFromServer(data, options);

    describe('proTeam', () => {
      describe('manualParse', () => {
        test('maps team id to human readable string', () => {
          const proTeamId = 22;
          const data = { proTeamId };

          const player = buildPlayer(data);
          expect(player.proTeam).toBe(_.get(nflTeamIdToNFLTeam, proTeamId));
        });
      });
    });

    describe('proTeamAbbreviation', () => {
      describe('manualParse', () => {
        test('maps team id to human readable abbreviation', () => {
          const proTeamId = 22;
          const data = { proTeamId };

          const player = buildPlayer(data);
          expect(player.proTeamAbbreviation).toBe(_.get(nflTeamIdToNFLTeamAbbreviation, proTeamId));
        });
      });
    });

    describe('defaultPosition', () => {
      describe('manualParse', () => {
        test('maps id to human readable position', () => {
          const defaultPositionId = 2;
          const data = { defaultPositionId };

          const player = buildPlayer(data);
          expect(player.defaultPosition).toBe(
            _.get(slotCategoryIdToPositionMap, defaultPositionId)
          );
        });
      });
    });

    describe('eligiblePositions', () => {
      describe('manualParse', () => {
        test('maps ids to positions', () => {
          const eligibleSlots = [0, 1, 2];
          const data = { eligibleSlots };

          const player = buildPlayer(data);

          expect.hasAssertions();
          _.forEach(player.eligiblePositions, (position, index) => {
            expect(position).toBe(
              _.get(slotCategoryIdToPositionMap, eligibleSlots[index])
            );
          });
        });
      });
    });
  });

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
});
