import ApiModel from '../api-model/api-model.js';
import Scoreboard from './scoreboard.js';

import { localObject, serverResponse } from './scoreboard.stubs.js';

describe('Scoreboard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  afterEach(() => {
    scoreboard = null;
  });

  test('extends ApiModel', () => {
    expect(scoreboard).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      scoreboard = Scoreboard.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(scoreboard).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      scoreboard = Scoreboard.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(scoreboard).toMatchSnapshot();
    });
  });
});
