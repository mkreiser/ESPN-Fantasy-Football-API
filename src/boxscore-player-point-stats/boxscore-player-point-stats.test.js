import ApiModel from '../api-model/api-model.js';
import BoxscorePlayerPointStats from './boxscore-player-point-stats.js';

import { localObject, serverResponse } from './boxscore-player-point-stats.stubs.js';

describe('BoxscorePlayerPointStats', () => {
  let boxscorePlayerPointStats;

  beforeEach(() => {
    boxscorePlayerPointStats = new BoxscorePlayerPointStats();
  });

  afterEach(() => {
    boxscorePlayerPointStats = null;
  });

  test('extends ApiModel', () => {
    expect(boxscorePlayerPointStats).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      boxscorePlayerPointStats = BoxscorePlayerPointStats.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayerPointStats).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      boxscorePlayerPointStats = BoxscorePlayerPointStats.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayerPointStats).toMatchSnapshot();
    });
  });

  describe('class methods', () => {
    test('throws error', () => {
      expect(() => BoxscorePlayerPointStats.read()).toThrowError(
        `${BoxscorePlayerPointStats.displayName}: read: Cannot call read.`
      );
    });
  });
});
