import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Player from './player.js';

import { localObject, serverResponse } from './player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('Player', () => {
  test('extends BaseObject', () => {
    const instance = new Player();
    expect(instance).toBeInstanceOf(BaseObject);
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
      test('returns undefined', () => {
        expect(Player.getCacheId()).toBeUndefined();
      });
    });
  });
});
