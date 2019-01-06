import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Player from '../player/player.js';

import SlottedPlayer from './slotted-player.js';

import { localObject, serverResponse } from './slotted-player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('SlottedPlayer', () => {
  let slottedPlayer;

  beforeEach(() => {
    slottedPlayer = new SlottedPlayer();
  });

  afterEach(() => {
    slottedPlayer = null;
  });

  test('extends BaseObject', () => {
    expect(slottedPlayer).toBeInstanceOf(BaseObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      slottedPlayer = SlottedPlayer.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(slottedPlayer).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      slottedPlayer = new SlottedPlayer(localObject);
    });

    test('parses data correctly', () => {
      expect(slottedPlayer).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('player', () => {
      describe('manualParse', () => {
        describe('when the passed data is undefined', () => {
          test('returns undefined', () => {
            const returnedPlayer = SlottedPlayer.responseMap.player.manualParse();
            expect(returnedPlayer).toBeUndefined();
          });
        });

        describe('when the passed data is empty', () => {
          test('returns undefined', () => {
            const returnedPlayer = SlottedPlayer.responseMap.player.manualParse({});
            expect(returnedPlayer).toBeUndefined();
          });
        });

        describe('when there is a cached player', () => {
          test('returns the cached player', () => {
            const playerId = 10;
            const cachedPlayer = Player.buildFromServer({ playerId });

            const returnedPlayer = SlottedPlayer.responseMap.player.manualParse({ playerId });
            expect(returnedPlayer).toBe(cachedPlayer);

            Player.clearCache();
          });
        });

        describe('when there is not a cached player', () => {
          test('creates a new player', () => {
            const playerId = 10;
            Player.clearCache();

            const returnedPlayer = SlottedPlayer.responseMap.player.manualParse({ playerId });
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

          const returnedPosition = SlottedPlayer.responseMap.position.manualParse(position);
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
              const isLocked = SlottedPlayer.responseMap.isLocked.manualParse(numKey);
              expect(isLocked).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const isLocked = SlottedPlayer.responseMap.isLocked.manualParse(2);
            expect(isLocked).toBeUndefined();
          });
        });
      });
    });
  });
});
