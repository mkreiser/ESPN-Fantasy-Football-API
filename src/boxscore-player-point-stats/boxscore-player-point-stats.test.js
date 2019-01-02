import BaseObject from '../base-object/base-object.js';
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

  test('extends BaseObject', () => {
    expect(boxscorePlayerPointStats).toBeInstanceOf(BaseObject);
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
      boxscorePlayerPointStats = new BoxscorePlayerPointStats(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayerPointStats).toMatchSnapshot();
    });
  });
});
