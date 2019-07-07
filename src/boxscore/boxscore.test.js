import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object.js';

import BoxscorePlayer from '../boxscore-player/boxscore-player';

import Boxscore from './boxscore';

describe('Boxscore', () => {
  test('extends BaseObject', () => {
    const instance = new Boxscore();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    const buildBoxscore = (data, options) => Boxscore.buildFromServer(data, options);

    let data;
    let playerData;

    beforeEach(() => {
      playerData = {
        lineupSlotId: 2,
        playerPoolEntry: {
          player: {
            stats: [{
              appliedStats: {
                24: 2.3,
                25: 6
              },
              statSourceId: 0,
              statSplitTypeId: 1
            }]
          }
        }
      };

      data = {
        home: {
          totalPoints: 123,
          teamId: 3,
          rosterForCurrentScoringPeriod: {
            entries: [playerData]
          }
        },
        away: {
          totalPoints: 324,
          teamId: 2,
          rosterForCurrentScoringPeriod: {
            entries: [playerData]
          }
        }
      };
    });

    describe('homeRoster', () => {
      describe('manualParse', () => {
        test('maps to BoxscorePlayer instances', () => {
          const boxscore = buildBoxscore(data);

          expect.hasAssertions();
          _.forEach(boxscore.homeRoster, (player) => {
            expect(player).toBeInstanceOf(BoxscorePlayer);
          });
        });
      });
    });

    describe('awayRoster', () => {
      describe('manualParse', () => {
        test('maps to BoxscorePlayer instances', () => {
          const boxscore = buildBoxscore(data);

          expect.hasAssertions();
          _.forEach(boxscore.awayRoster, (player) => {
            expect(player).toBeInstanceOf(BoxscorePlayer);
          });
        });
      });
    });
  });
});
