import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Player from '../player/player.js';

import BoxscorePlayer from './boxscore-player.js';

import { localObject, serverResponse } from './boxscore-player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('BoxscorePlayer', () => {
  let boxscorePlayer;

  beforeEach(() => {
    boxscorePlayer = new BoxscorePlayer();
  });

  afterEach(() => {
    boxscorePlayer = null;
  });

  test('extends BaseObject', () => {
    expect(boxscorePlayer).toBeInstanceOf(BaseObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      boxscorePlayer = BoxscorePlayer.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayer).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      boxscorePlayer = new BoxscorePlayer(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayer).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('player', () => {
      describe('manualParse', () => {
        describe('when the passed data is undefined', () => {
          test('returns undefined', () => {
            const returnedPlayer = BoxscorePlayer.responseMap.player.manualParse();
            expect(returnedPlayer).toBeUndefined();
          });
        });

        describe('when the passed data is empty', () => {
          test('returns undefined', () => {
            const returnedPlayer = BoxscorePlayer.responseMap.player.manualParse({});
            expect(returnedPlayer).toBeUndefined();
          });
        });

        describe('when there is a cached player', () => {
          test('returns the cached player', () => {
            const playerId = 10;
            const cachedPlayer = Player.buildFromServer({ playerId });

            const returnedPlayer = BoxscorePlayer.responseMap.player.manualParse({ playerId });
            expect(returnedPlayer).toBe(cachedPlayer);

            Player.clearCache();
          });
        });

        describe('when there is not a cached player', () => {
          test('creates a new player', () => {
            const playerId = 10;
            Player.clearCache();

            const returnedPlayer = BoxscorePlayer.responseMap.player.manualParse({ playerId });
            expect(returnedPlayer).toBe(Player.get(playerId));

            Player.clearCache();
          });
        });
      });
    });

    describe('position', () => {
      describe('manualParse', () => {
        test('returns the mapped position', () => {
          const position = 2;

          const returnedPosition = BoxscorePlayer.responseMap.position.manualParse(position);
          expect(returnedPosition).toBe(_.get(slotCategoryIdToPositionMap, position));
        });
      });
    });

    describe('isLocked', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const lockedStatuses = {
              0: false,
              4: true
            };

            expect.hasAssertions();
            _.forEach(lockedStatuses, (value, key) => {
              const numKey = _.toNumber(key);
              const isLocked = BoxscorePlayer.responseMap.isLocked.manualParse(numKey);
              expect(isLocked).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const isLocked = BoxscorePlayer.responseMap.isLocked.manualParse(2);
            expect(isLocked).toBeUndefined();
          });
        });
      });
    });
  });
});
