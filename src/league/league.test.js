import ApiModel from '../api-model/api-model.js';
import League from './league.js';

import { localObject, serverResponse } from './league.stubs.js';

describe('League', () => {
  let league;

  beforeEach(() => {
    league = new League();
  });

  afterEach(() => {
    league = null;
  });

  test('extends ApiModel', () => {
    expect(league).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      league = League.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(league).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      league = League.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(league).toMatchSnapshot();
    });
  });
});
