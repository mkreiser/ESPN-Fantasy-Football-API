import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Player from '../player/player.js';

import SlottedPlayer from './slotted-player.js';

import { localObject, serverResponse } from './slotted-player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('SlottedPlayer', () => {
  test('extends BaseObject', () => {
    const slottedPlayer = new SlottedPlayer();
    expect(slottedPlayer).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const slottedPlayer = SlottedPlayer.buildFromServer(serverResponse);
      expect(slottedPlayer).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const slottedPlayer = new SlottedPlayer(localObject);
      expect(slottedPlayer).toMatchSnapshot();
    });
  });


  describe('responseMap', () => {
    const buildSlottedPlayer = (data, options) => SlottedPlayer.buildFromServer(data, options);

    describe('player', () => {
      describe('manualParse', () => {
        describe('when the passed data is undefined', () => {
          test('sets undefined', () => {
            const slottedPlayer = buildSlottedPlayer({});
            expect(slottedPlayer.player).toBeUndefined();
          });
        });

        describe('when the passed data is empty', () => {
          test('sets undefined', () => {
            const data = { player: {} };

            const slottedPlayer = buildSlottedPlayer(data);
            expect(slottedPlayer.player).toBeUndefined();
          });
        });

        describe('when the passed data is populated', () => {
          test('sets a new player', () => {
            const playerId = 10;
            const data = {
              player: { playerId }
            };

            const slottedPlayer = buildSlottedPlayer(data);
            expect(slottedPlayer.player).toEqual(Player.buildFromServer({ playerId }));
          });
        });
      });
    });

    describe('position', () => {
      describe('manualParse', () => {
        test('sets the mapped position', () => {
          const position = 2;
          const data = { slotCategoryId: position };

          const slottedPlayer = buildSlottedPlayer(data);
          expect(slottedPlayer.position).toBe(_.get(slotCategoryIdToPositionMap, position));
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

            _.forEach(lockedStatuses, (value, key) => {
              const numKey = _.toNumber(key);
              const data = { lockStatus: numKey };

              const slottedPlayer = buildSlottedPlayer(data);
              expect(slottedPlayer.isLocked).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('sets error string', () => {
            const data = { lockStatus: 2 };

            const slottedPlayer = buildSlottedPlayer(data);
            expect(slottedPlayer.isLocked).toBeUndefined();
          });
        });
      });
    });
  });
});
