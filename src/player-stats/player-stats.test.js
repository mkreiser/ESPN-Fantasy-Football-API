import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import PlayerStats, { parsePlayerStats } from './player-stats';

describe('PlayerStats', () => {
  test('extends BaseObject', () => {
    const instance = new PlayerStats();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new PlayerStats();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('usesPoints');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = true;
          const newInstance = new PlayerStats({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('usesPoints');
    });
  });
});

describe('parsePlayerStats', () => {
  let data;

  beforeEach(() => {
    data = {
      player: {
        stats: [{
          appliedStats: {
            24: 23,
            25: 46
          },
          seasonId: 2018,
          stats: {
            24: 318,
            25: 63
          },
          statSourceId: 0,
          statSplitTypeId: 1
        }, {
          appliedStats: {
            24: 2.3,
            25: 6
          },
          seasonId: 2017,
          stats: {
            24: 3,
            25: 6.4
          },
          statSourceId: 0,
          statSplitTypeId: 1
        }]
      }
    };
  });

  test('maps stats to a PlayerStats instance', () => {
    const stats = parsePlayerStats({
      responseData: data,
      constructorParams: {},
      usesPoints: false,
      statKey: 'stats',
      statSourceId: 0,
      statSplitTypeId: 1
    });

    expect(stats).toBeInstanceOf(PlayerStats);
  });

  describe('when seasonId is passed', () => {
    test('filters based on seasonId in addition to stat ids', () => {
      const stats = parsePlayerStats({
        responseData: data,
        constructorParams: {},
        usesPoints: false,
        seasonId: 2018,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      });

      expect(stats).toBeInstanceOf(PlayerStats);
      expect(stats.rushingYards).toBe(318);
    });
  });
});
