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

  describe('instance methods', () => {
    describe('when params are passed', () => {
      test('adds seasonId to params passed to super read', () => {
        const seasonId = 2017;
        league.seasonId = seasonId;

        // Super lazy way to test
        jest.spyOn(ApiModel.prototype, 'read').mockImplementation();

        league.read({ params: { some: 'params' } });

        expect(ApiModel.prototype.read).toBeCalledWith({
          params: {
            seasonId,
            some: 'params'
          },
          model: league,
          route: League.route,
          reload: true
        });

        ApiModel.prototype.read.mockRestore();
      });
    });

    describe('when not params are passed', () => {
      test('passes seasonId as params to super read', () => {
        const seasonId = 2017;
        league.seasonId = seasonId;

        // Super lazy way to test
        jest.spyOn(ApiModel.prototype, 'read').mockImplementation();

        league.read();

        expect(ApiModel.prototype.read).toBeCalledWith({
          params: { seasonId },
          model: league,
          route: League.route,
          reload: true
        });

        ApiModel.prototype.read.mockRestore();
      });
    });
  });
});
