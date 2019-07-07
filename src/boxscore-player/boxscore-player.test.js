import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object.js';

import PlayerStats from '../player-stats/player-stats';

import { slotCategoryIdToPositionMap } from '../constants';

import BoxscorePlayer from './boxscore-player.js';

describe('BoxscorePlayer', () => {
  test('extends BaseObject', () => {
    const instance = new BoxscorePlayer();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    const buildBoxscorePlayer = (data, options) => BoxscorePlayer.buildFromServer(data, options);

    let data;
    let pointStats;
    let projectedStats;

    beforeEach(() => {
      pointStats = {
        appliedStats: {
          24: 2.3,
          25: 6
        },
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
        stats: {
          24: 3.2,
          25: 4
        },
        statSourceId: 1,
        statSplitTypeId: 1
      };

      data = {
        lineupSlotId: 2,
        playerPoolEntry: {
          player: {
            stats: [projectedStats, pointStats]
          }
        }
      };
    });

    describe('position', () => {
      describe('manualParse', () => {
        test('maps id to human readable position', () => {
          const player = buildBoxscorePlayer(data);
          expect(player.position).toBe(_.get(slotCategoryIdToPositionMap, data.lineupSlotId));
        });
      });
    });

    describe('pointBreakdown', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildBoxscorePlayer(data);
          const expectedStats = PlayerStats.buildFromServer(
            pointStats.appliedStats, { usesPoints: true }
          );
          expect(player.pointBreakdown).toEqual(expectedStats);
        });
      });
    });

    describe('projectedPointBreakdown', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildBoxscorePlayer(data);
          const expectedStats = PlayerStats.buildFromServer(
            projectedStats.appliedStats, { usesPoints: true }
          );
          expect(player.projectedPointBreakdown).toEqual(expectedStats);
        });
      });
    });

    describe('rawStats', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildBoxscorePlayer(data);
          const expectedStats = PlayerStats.buildFromServer(
            pointStats.stats, { usesPoints: false }
          );
          expect(player.rawStats).toEqual(expectedStats);
        });
      });
    });

    describe('projectedRawStats', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildBoxscorePlayer(data);
          const expectedStats = PlayerStats.buildFromServer(
            projectedStats.stats, { usesPoints: false }
          );
          expect(player.projectedRawStats).toEqual(expectedStats);
        });
      });
    });
  });
});
