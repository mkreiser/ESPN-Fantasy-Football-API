import BaseObject from '../base-object/base-object.js';

import BoxscorePlayerPointStats from './boxscore-player-point-stats.js';

import { localObject, serverResponse } from './boxscore-player-point-stats.stubs.js';

describe('BoxscorePlayerPointStats', () => {
  test('extends BaseObject', () => {
    const instance = new BoxscorePlayerPointStats();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = BoxscorePlayerPointStats.buildFromServer(serverResponse);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new BoxscorePlayerPointStats(localObject);
      expect(instance).toMatchSnapshot();
    });
  });
});
