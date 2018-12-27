import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';
import Player from './player.js';

import { localObject, serverResponse } from './player.stubs.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  afterEach(() => {
    player = null;
  });

  test('extends ApiModel', () => {
    expect(player).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      player = Player.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(player).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      player = Player.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(player).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('streakType', () => {
      describe('manualParse', () => {
        test('maps ids to positions', () => {
          const ids = [0, 1, 2];

          const returnedPositions = Player.responseMap.eligiblePositions.manualParse(ids);

          expect.hasAssertions();
          _.forEach(returnedPositions, (position, index) => {
            expect(position).toBe(_.get(slotCategoryIdToPositionMap, ids[index]));
          });
        });
      });
    });
  });
});
