import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';
import Team from '../team/team.js';
import League from './league.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

import { localObject, serverResponse } from './league.stubs.js';

describe('League', () => {
  let league;

  beforeEach(() => {
    league = new League();
  });

  afterEach(() => {
    league = null;
  });

  test('extends BaseAPIObject', () => {
    expect(league).toBeInstanceOf(BaseAPIObject);
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
      league = new League(localObject);
    });

    test('parses data correctly', () => {
      expect(league).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    const testUsesCachedTeamInstances = (method) => {
      test('maps data to cached Team instances', () => {
        const ids = [1, 2, 3];
        jest.spyOn(Team, 'get');

        expect.hasAssertions();
        _.invoke(League.responseMap, `${method}.manualParse`, ids);

        _.forEach(ids, (id) => expect(Team.get).toBeCalledWith(id));

        Team.get.mockRestore();
      });
    };

    describe('teams', () => {
      describe('manualParse', () => {
        test('maps teams data to Team instances', () => {
          const responseData = {
            1: { teamId: 1 },
            2: { teamId: 2 },
            3: { teamId: 3 }
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
              1: { teamId: 1 }
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
              1: { teamId: 1 }
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
              1: { teamId: 1 }
            };
            const response = {
              leaguesettings: { season: seasonId }
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
              1: { teamId: 1 }
            };
            const response = {
              leaguesettings: { season: seasonId }
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

    describe('positionLimits', () => {
      describe('manualParse', () => {
        test('maps to limit and position using slotCategoryIdToPositionMap', () => {
          const limitData = [{
            num: 1,
            slotCategoryId: 0
          }, {
            num: 0,
            slotCategoryId: 1
          }, {
            num: 2,
            slotCategoryId: 2
          }];

          const returnedLimits = League.responseMap.lineupPositionLimits.manualParse(limitData);

          expect.hasAssertions();
          _.forEach(limitData, (value, index) => {
            expect(returnedLimits[index].limit).toBe(limitData[index].num);
            expect(returnedLimits[index].position).toBe(
              _.get(slotCategoryIdToPositionMap, limitData[index].slotCategoryId)
            );
          });
        });
      });
    });

    describe('draftOrder', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances('draftOrder');
      });
    });

    describe('playoffSeedOrder', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances('playoffSeedOrder');
      });
    });

    describe('finalRankings', () => {
      describe('manualParse', () => {
        testUsesCachedTeamInstances('finalRankings');
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

            expect.hasAssertions();
            _.forEach(tiebreakers, (value, key) => {
              const numKey = _.toNumber(key);
              const tieString = League.responseMap.regularSeasonTiebreaker.manualParse(numKey);
              expect(tieString).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const tieString = League.responseMap.regularSeasonTiebreaker.manualParse(-231);
            expect(tieString).toBe('ERROR: regularSeasonTiebreaker not recognized');
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

            expect.hasAssertions();
            _.forEach(tiebreakers, (value, key) => {
              const numKey = _.toNumber(key);
              const tieString = League.responseMap.playoffTiebreaker.manualParse(numKey);
              expect(tieString).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const tieString = League.responseMap.playoffTiebreaker.manualParse(-231);
            expect(tieString).toBe('ERROR: playoffTiebreaker not recognized');
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
        jest.spyOn(BaseAPIObject.prototype, 'read').mockImplementation();

        league.read({ params: { some: 'params' } });

        expect(BaseAPIObject.prototype.read).toBeCalledWith({
          params: {
            seasonId,
            some: 'params'
          },
          model: league,
          route: League.route,
          reload: true
        });

        BaseAPIObject.prototype.read.mockRestore();
      });
    });

    describe('when not params are passed', () => {
      test('passes seasonId as params to super read', () => {
        const seasonId = 2017;
        league.seasonId = seasonId;

        // Super lazy way to test
        jest.spyOn(BaseAPIObject.prototype, 'read').mockImplementation();

        league.read();

        expect(BaseAPIObject.prototype.read).toBeCalledWith({
          params: { seasonId },
          model: league,
          route: League.route,
          reload: true
        });

        BaseAPIObject.prototype.read.mockRestore();
      });
    });
  });
});
