import BaseObject from '../base-classes/base-object/base-object';

import Player from '../player/player';
import PlayerStats from '../player-stats/player-stats';

import FreeAgentPlayer from './free-agent-player';

describe('FreeAgentPlayer', () => {
  test('extends BaseObject', () => {
    const instance = new FreeAgentPlayer();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    const buildFreeAgentPlayer = (data, options) => FreeAgentPlayer.buildFromServer(data, options);

    let data;
    let pointStats;
    let projectedStats;
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
          const player = buildFreeAgentPlayer(data, { seasonId });
          expect(player.player).toBeInstanceOf(Player);
        });
      });
    });

    describe('rawStats', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            pointStats.stats, { usesPoints: false, seasonId }
          );
          expect(player.rawStats).toEqual(expectedStats);
        });
      });
    });

    describe('projectedRawStats', () => {
      describe('manualParse', () => {
        test('maps points to a PlayerStats instance', () => {
          const player = buildFreeAgentPlayer(data, { seasonId });
          const expectedStats = PlayerStats.buildFromServer(
            projectedStats.stats, { usesPoints: false, seasonId }
          );
          expect(player.projectedRawStats).toEqual(expectedStats);
        });
      });
    });
  });
});
