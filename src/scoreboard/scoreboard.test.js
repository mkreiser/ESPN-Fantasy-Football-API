import BaseAPIObject from '../base-api-object/base-api-object.js';
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

  test('extends BaseAPIObject', () => {
    expect(scoreboard).toBeInstanceOf(BaseAPIObject);
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
      scoreboard = new Scoreboard(localObject);
    });

    test('parses data correctly', () => {
      expect(scoreboard).toMatchSnapshot();
    });
  });
});
