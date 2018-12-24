import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';
import Team from '../team/team.js';
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

  describe('responseMap', () => {
    describe('teams', () => {
      describe('manualParse', () => {
        test('maps teams data to Team instances', () => {
          const responseData = {
            1: {
              teamId: 1
            },
            2: {
              teamId: 2
            },
            3: {
              teamId: 3
            }
          };

          const returnedTeams = League.responseMap.teams.manualParse(responseData);

          expect.assertions(1 * 3);
          _.forEach(returnedTeams, (team) => {
            expect(team).toBeInstanceOf(Team);
          });
        });

        describe('when leagueId is passed on the response', () => {
          test('passes leagueId as a number', () => {
            const leagueId = '123133';
            const responseData = {
              1: {
                teamId: 1
              }
            };
            const response = {
              leaguesettings: { id: leagueId }
            };

            const returnedTeams = League.responseMap.teams.manualParse(responseData, response);
            expect.assertions(1 * 1);
            _.forEach(returnedTeams, (team) => {
              expect(team.leagueId).toBe(_.toNumber(leagueId));
            });
          });
        });

        describe('when leagueId is not passed on the response', () => {
          test('passes undefined for leagueId', () => {
            const leagueId = undefined;
            const responseData = {
              1: {
                teamId: 1
              }
            };
            const response = {
              leaguesettings: { id: leagueId }
            };

            const returnedTeams = League.responseMap.teams.manualParse(responseData, response);
            expect.assertions(1 * 1);
            _.forEach(returnedTeams, (team) => {
              expect(team.leagueId).toBeUndefined();
            });
          });
        });

        describe('when seasonId is passed on the response', () => {
          test('passes seasonId as a number', () => {
            const seasonId = '123133';
            const responseData = {
              1: {
                teamId: 1
              }
            };
            const response = {
              metadata: { seasonId }
            };

            const returnedTeams = League.responseMap.teams.manualParse(responseData, response);
            expect.assertions(1 * 1);
            _.forEach(returnedTeams, (team) => {
              expect(team.seasonId).toBe(_.toNumber(seasonId));
            });
          });
        });

        describe('when seasonId is not passed on the response', () => {
          test('passes seasonId as a number', () => {
            const seasonId = undefined;
            const responseData = {
              1: {
                teamId: 1
              }
            };
            const response = {
              metadata: { seasonId }
            };

            const returnedTeams = League.responseMap.teams.manualParse(responseData, response);
            expect.assertions(1 * 1);
            _.forEach(returnedTeams, (team) => {
              expect(team.seasonId).toBeUndefined();
            });
          });
        });
      });
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
