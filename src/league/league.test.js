import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import Team from '../team/team.js';

import League from './league.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

import { localObject, serverResponse } from './league.stubs.js';

describe('League', () => {
  test('extends BaseAPIObject', () => {
    const instance = new League();
    expect(instance).toBeInstanceOf(BaseAPIObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = League.buildFromServer(serverResponse, { leagueId: 336358, seasonId: 2017 });
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new League(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    const buildLeague = (data, options) => League.buildFromServer(data, options);

    describe('teams', () => {
      describe('when constructorParams includes seasonId', () => {
        test('builds teams with constructorParams.seasonId', () => {
          const data = {
            leaguesettings: {
              teams: [
                { teamId: 4 },
                { teamId: 5 },
                { teamId: 6 }
              ]
            }
          };
          const options = { leagueId: 123213, seasonId: 2017 };

          const league = buildLeague(data, options);

          expect.hasAssertions();
          _.forEach(league.teams, (team, index) => {
            expect(team).toBeInstanceOf(Team);
            expect(team.teamId).toBe(data.leaguesettings.teams[index].teamId);
            expect(team.getCacheId()).toBe(
              `${team.teamId}-${options.leagueId}-${options.seasonId}`
            );
          });
        });
      });

      describe('when constructorParams does not include seasonId', () => {
        test('builds teams with seasonId provided on response', () => {
          const seasonId = 2015;
          const data = {
            leaguesettings: {
              season: seasonId,
              teams: [
                { teamId: 4 },
                { teamId: 5 },
                { teamId: 6 }
              ]
            }
          };
          const options = { leagueId: 123213 };

          const league = buildLeague(data, options);

          expect.hasAssertions();
          _.forEach(league.teams, (team, index) => {
            expect(team).toBeInstanceOf(Team);
            expect(team.teamId).toBe(data.leaguesettings.teams[index].teamId);
            expect(team.getCacheId()).toBe(`${team.teamId}-${options.leagueId}-${seasonId}`);
          });
        });
      });
    });

    describe('positionLimits', () => {
      describe('manualParse', () => {
        describe('when no limit data is populated', () => {
          test('sets an empty array', () => {
            const data = { leaguesettings: {} };

            const league = buildLeague(data);
            expect(league.lineupPositionLimits).toEqual([]);
          });
        });

        describe('when limit data is an empty array', () => {
          test('sets an empty array', () => {
            const data = {
              leaguesettings: { slotCategoryItems: [] }
            };

            const league = buildLeague(data);
            expect(league.lineupPositionLimits).toEqual([]);
          });
        });

        describe('when limit data is populated', () => {
          test('maps to limit and position using slotCategoryIdToPositionMap', () => {
            const slotCategoryItems = [
              { num: 1, slotCategoryId: 0 },
              { num: 0, slotCategoryId: 1 },
              { num: 2, slotCategoryId: 2 }
            ];
            const data = {
              leaguesettings: { slotCategoryItems }
            };

            const league = buildLeague(data);

            expect.hasAssertions();
            _.forEach(league.lineupPositionLimits, (limitData, index) => {
              expect(limitData.limit).toBe(slotCategoryItems[index].num);
              expect(limitData.position).toBe(
                _.get(slotCategoryIdToPositionMap, slotCategoryItems[index].slotCategoryId)
              );
            });
          });
        });
      });
    });

    const testUsesCachedTeamInstances = ({ dataKey, modelKey }) => {
      describe('when constructorParams has seasonId defined', () => {
        test('maps data to cached Team instances', () => {
          const teamIds = [1, 2, 3];
          const teams = [
            { teamId: 1, nickname: 'some team 1' },
            { teamId: 2, nickname: 'some team 2' },
            { teamId: 3, nickname: 'some team 3' }
          ];

          const data = { leaguesettings: { teams } };
          _.set(data, dataKey, teamIds);

          const league = buildLeague(data, { leagueId: 336358, seasonId: 2017 });

          expect.hasAssertions();
          _.forEach(league[modelKey], (team) => {
            const initialTeam = _.find(league.teams, { teamId: team.teamId });
            expect(team).toBe(initialTeam);
          });
        });
      });

      describe('when constructorParams does not have seasonId defined', () => {
        test('maps data to cached Team instances', () => {
          const seasonId = 2017;
          const teamIds = [1, 2, 3];
          const teams = [
            { teamId: 1, nickname: 'some team 1' },
            { teamId: 2, nickname: 'some team 2' },
            { teamId: 3, nickname: 'some team 3' }
          ];

          const data = {
            leaguesettings: {
              season: seasonId,
              teams
            }
          };
          _.set(data, dataKey, teamIds);

          const league = buildLeague(data, { leagueId: 336358 });

          expect.hasAssertions();
          _.forEach(league[modelKey], (team) => {
            const initialTeam = _.find(league.teams, { teamId: team.teamId });
            expect(team).toBe(initialTeam);
          });
        });
      });
    };

    describe('draftOrder', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances({
          dataKey: 'leaguesettings.draftOrder',
          modelKey: 'draftOrder'
        });
      });
    });

    describe('playoffSeedOrder', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances({
          dataKey: 'leaguesettings.playoffSeedings',
          modelKey: 'playoffSeedOrder'
        });
      });
    });

    describe('finalRankings', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances({
          dataKey: 'leaguesettings.finalCalculatedRanking',
          modelKey: 'finalRankings'
        });
      });
    });

    describe('regularSeasonTiebreaker', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const tiebreakers = {
              0: 'None',
              1: 'Home team wins',
              2: 'Most bench points',
              3: 'Most QB points',
              4: 'Most RB points'
            };

            _.forEach(tiebreakers, (value, key) => {
              const numKey = _.toNumber(key);
              const data = {
                leaguesettings: { tieRule: numKey }
              };

              const league = buildLeague(data);
              expect(league.regularSeasonTiebreaker).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const data = {
              leaguesettings: { tieRule: -231 }
            };

            const league = buildLeague(data);
            expect(league.regularSeasonTiebreaker).toBe(
              'ERROR: regularSeasonTiebreaker not recognized'
            );
          });
        });
      });
    });

    describe('playoffTiebreaker', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const tiebreakers = {
              '-1': 'Head to head record',
              0: 'Total points for',
              1: 'Intra-division record',
              2: 'Total points against'
            };

            _.forEach(tiebreakers, (value, key) => {
              const numKey = _.toNumber(key);
              const data = {
                leaguesettings: { playoffTieRuleRawStatId: numKey }
              };

              const league = buildLeague(data);
              expect(league.playoffTiebreaker).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const data = {
              leaguesettings: { playoffTieRuleRawStatId: -231 }
            };

            const league = buildLeague(data);
            expect(league.playoffTiebreaker).toBe('ERROR: playoffTiebreaker not recognized');
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      const testReturnsUndefined = (params) => {
        test('returns undefined', () => {
          expect(League.getCacheId(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        testReturnsUndefined();
      });

      describe('when leagueId is defined', () => {
        describe('when seasonId is defined', () => {
          test('returns a valid caching id', () => {
            const params = { leagueId: 132123, seasonId: 2017 };

            const returnedCachingId = League.getCacheId(params);
            expect(returnedCachingId).toBe(`${params.leagueId}-${params.seasonId}`);
          });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({ leagueId: 132123 });
        });
      });

      describe('when leagueId is undefined', () => {
        describe('when seasonId is defined', () => {
          testReturnsUndefined({ seasonId: 2017 });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({});
        });
      });
    });

    describe('read', () => {
      describe('when nothing is passed to read', () => {
        test('throws error', () => {
          expect(() => League.read()).toThrowError(
            `${League.displayName}: static read: cannot read without leagueId`
          );
        });
      });

      describe('when params are passed to read', () => {
        describe('when leagueId is passed on params', () => {
          test('defers to super.read', () => {
            jest.spyOn(BaseAPIObject, 'read').mockImplementation();

            const instance = new League();
            const route = 'some route';
            const params = { leagueId: 1231232 };
            const reload = false;

            League.read({
              instance, route, params, reload
            });
            expect(BaseAPIObject.read).toBeCalledWith({
              instance, route, params, reload
            });

            BaseAPIObject.read.mockRestore();
          });
        });

        describe('when leagueId is not passed on params', () => {
          test('throws error', () => {
            expect(() => League.read({ params: {} })).toThrowError(
              `${League.displayName}: static read: cannot read without leagueId`
            );
          });
        });
      });
    });
  });

  describe('instance methods', () => {
    describe('when params are passed', () => {
      test('adds seasonId to params passed to super read', () => {
        const seasonId = 2017;
        const league = new League({ seasonId });

        // Super lazy way to test
        jest.spyOn(BaseAPIObject.prototype, 'read').mockImplementation();

        league.read({ params: { some: 'params' } });
        expect(BaseAPIObject.prototype.read).toBeCalledWith({
          params: {
            seasonId,
            some: 'params'
          },
          route: League.route,
          reload: true
        });

        BaseAPIObject.prototype.read.mockRestore();
      });
    });

    describe('when not params are passed', () => {
      test('passes seasonId as params to super read', () => {
        const seasonId = 2017;
        const league = new League({ seasonId });

        // Super lazy way to test
        jest.spyOn(BaseAPIObject.prototype, 'read').mockImplementation();

        league.read();
        expect(BaseAPIObject.prototype.read).toBeCalledWith({
          params: { seasonId },
          route: League.route,
          reload: true
        });

        BaseAPIObject.prototype.read.mockRestore();
      });
    });
  });
});
