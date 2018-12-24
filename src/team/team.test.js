import ApiModel from '../api-model/api-model.js';
import Team from './team.js';

import { localObject, serverResponse } from './team.stubs.js';

describe('Team', () => {
  let team;

  beforeEach(() => {
    team = new Team();
  });

  afterEach(() => {
    team = null;
  });

  test('extends ApiModel', () => {
    expect(team).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      team = Team.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      team = Team.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('class methods', () => {
    describe('read', () => {
      describe('when leagueId is not passed on params', () => {
        test('throws error ', () => {
          expect(() => Team.read({ params: {} })).toThrowError(
            `${Team.displayName}: static read: cannot read without leagueId param`
          );
        });
      });

      describe('when no parameters are passed', () => {
        test('throws error ', () => {
          expect(() => Team.read()).toThrowError(
            `${Team.displayName}: static read: cannot read without leagueId param`
          );
        });
      });

      describe('when leagueId is passed on params', () => {
        test('defers to static super.read', () => {
          // Super lazy way to test
          jest.spyOn(ApiModel, 'read').mockImplementation();

          const params = { leagueId: 123 };

          Team.read({ params });
          expect(ApiModel.read).toBeCalledWith({
            route: Team.route,
            params,
            reload: true,
            model: undefined
          });

          ApiModel.read.mockRestore();
        });
      });
    });
  });

  describe('instance methods', () => {
    describe('when params are passed', () => {
      test('adds leagueId and seasonId to params passed to super read', () => {
        const leagueId = 321312;
        const seasonId = 2017;
        team.leagueId = leagueId;
        team.seasonId = seasonId;

        jest.spyOn(ApiModel.prototype, 'read').mockImplementation();

        team.read({ params: { some: 'params' } });

        expect(ApiModel.prototype.read).toBeCalledWith({
          params: {
            leagueId,
            seasonId,
            some: 'params'
          },
          model: team,
          route: Team.route,
          reload: true
        });

        ApiModel.prototype.read.mockRestore();
      });
    });

    describe('when not params are passed', () => {
      test('passes leagueId and seasonId as params to super read', () => {
        const leagueId = 321312;
        const seasonId = 2017;
        team.leagueId = leagueId;
        team.seasonId = seasonId;

        jest.spyOn(ApiModel.prototype, 'read').mockImplementation();

        team.read();

        expect(ApiModel.prototype.read).toBeCalledWith({
          params: {
            leagueId,
            seasonId
          },
          model: team,
          route: Team.route,
          reload: true
        });

        ApiModel.prototype.read.mockRestore();
      });
    });
  });
});
