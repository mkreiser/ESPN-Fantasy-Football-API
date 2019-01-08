import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';
import BoxscoreTeam from '../boxscore-team/boxscore-team.js';
import NFLGame from '../nfl-game/nfl-game.js';

import Boxscore from './boxscore.js';

import { localObject, serverResponse } from './boxscore.stubs.js';

describe('Boxscore', () => {
  let boxscore;

  beforeEach(() => {
    boxscore = new Boxscore({
      leagueId: 234123,
      seasonId: 2014,
      teamId: 3,
      matchupPeriodId: 11,
      scoringPeriodId: 11
    });
  });

  afterEach(() => {
    boxscore = null;
  });

  test('extends BaseAPIObject', () => {
    expect(boxscore).toBeInstanceOf(BaseAPIObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      boxscore = Boxscore.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(boxscore).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      boxscore = new Boxscore(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscore).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newBoxscore = new Boxscore();
          expect(_.get(newBoxscore, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
      testPropIsUndefined('teamId');
      testPropIsUndefined('matchupPeriodId');
      testPropIsUndefined('scoringPeriodId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newBoxscore = new Boxscore({ [prop]: value });
          expect(_.get(newBoxscore, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
      testPropIsSetFromOptions('teamId');
      testPropIsSetFromOptions('matchupPeriodId');
      testPropIsSetFromOptions('scoringPeriodId');
    });
  });

  describe('responseMap', () => {
    describe('nflGames', () => {
      describe('manualParse', () => {
        test('returns an array of NFLGames', () => {
          const data = [{
            gameId: 234
          }, {
            gameId: 432
          }];

          const returnedTeams = Boxscore.responseMap.nflGames.manualParse(data);

          expect.hasAssertions();
          _.forEach(returnedTeams, (team, index) => {
            expect(team).toBeInstanceOf(NFLGame);
            expect(team.gameId).toBe(data[index].gameId);
          });
        });
      });
    });

    const testTeamBehavior = ({ prefix }) => {
      describe('when no response is passed', () => {
        test('returns a sparse BoxscoreTeam', () => {
          const expectedTeam = BoxscoreTeam.buildFromServer(
            { matchupScore: 0 },
            { leagueId: boxscore.leagueId, seasonId: boxscore.seasonId }
          );
          const returnedTeam = _.invoke(
            Boxscore.responseMap, `${prefix}Team.manualParse`, undefined, undefined, boxscore
          );
          expect(returnedTeam).toEqual(expectedTeam);
        });
      });

      describe('when response is passed', () => {
        test('returns a populated BoxscoreTeam', () => {
          const teamId = 12;
          const scores = [100, 100];
          const team = { teamId };

          const response = {
            boxscore: {
              scheduleItems: [{
                matchups: [{
                  [`${prefix}TeamScores`]: scores,
                  [`${prefix}TeamId`]: teamId
                }]
              }],
              teams: [{}, team]
            }
          };

          const returnedTeam = _.invoke(
            Boxscore.responseMap, `${prefix}Team.manualParse`, undefined, response, boxscore
          );
          const expectedTeam = BoxscoreTeam.buildFromServer(
            { matchupScore: _.sum(scores), teamBoxscore: team },
            { leagueId: boxscore.leagueId, seasonId: boxscore.seasonId }
          );
          expect(returnedTeam).toEqual(expectedTeam);
        });
      });
    };

    describe('homeTeam', () => {
      describe('manualParse', () => {
        testTeamBehavior({ prefix: 'home' });
      });
    });

    describe('awayTeam', () => {
      describe('manualParse', () => {
        testTeamBehavior({ prefix: 'away' });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      test('returns undefined', () => {
        expect(Boxscore.getCacheId()).toBeUndefined();
      });
    });

    describe('read', () => {
      describe('when nothing is passed to read', () => {
        test('throws error', () => {
          expect(() => Boxscore.read()).toThrowError(
            'Boxscore: static read: cannot read without leagueId'
          );
        });
      });

      describe('when params are passed to read', () => {
        const testDefersRead = ({ params }) => {
          test('defers to super.read', () => {
            jest.spyOn(BaseAPIObject, 'read').mockImplementation();

            const instance = new Boxscore();
            const route = 'some route';
            const reload = false;

            Boxscore.read({ instance, route, params, reload });
            expect(BaseAPIObject.read).toBeCalledWith({ instance, route, params, reload });

            BaseAPIObject.read.mockRestore();
          });
        };

        const testThrowsError = ({ params, errorMessage }) => {
          test('throws error', () => {
            expect(() => Boxscore.read({ params })).toThrowError(errorMessage);
          });
        };

        describe('when leagueId is passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when teamId is passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testDefersRead({
                    params: {
                      leagueId: 232131,
                      seasonId: 2017,
                      teamId: 9,
                      matchupPeriodId: 11,
                      scoringPeriodId: 11
                    }
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testDefersRead({
                    params: { leagueId: 232131, seasonId: 2017, teamId: 9, matchupPeriodId: 11 }
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testDefersRead({
                    params: { leagueId: 232131, seasonId: 2017, teamId: 9, scoringPeriodId: 11 }
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, seasonId: 2017, teamId: 9 },
                    errorMessage: 'Boxscore: static read: cannot read without one of ' +
                      'matchupPeriodId or scoringPeriodId'
                  });
                });
              });
            });

            describe('when teamId is not passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: {
                      leagueId: 232131, seasonId: 2017, matchupPeriodId: 11, scoringPeriodId: 11
                    },
                    errorMessage: 'Boxscore: static read: cannot read without teamId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, seasonId: 2017, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without teamId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, seasonId: 2017, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without teamId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, seasonId: 2017 },
                    errorMessage: 'Boxscore: static read: cannot read without teamId'
                  });
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when teamId is passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: {
                      leagueId: 232131, teamId: 9, matchupPeriodId: 11, scoringPeriodId: 11
                    },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, teamId: 9, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, teamId: 9, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, teamId: 9 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });
              });
            });

            describe('when teamId is not passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, matchupPeriodId: 11, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { leagueId: 232131 },
                    errorMessage: 'Boxscore: static read: cannot read without seasonId'
                  });
                });
              });
            });
          });
        });

        describe('when leagueId is not passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when teamId is passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, teamId: 9, matchupPeriodId: 11, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, teamId: 9, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, teamId: 9, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, teamId: 9 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });
            });

            describe('when teamId is not passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, matchupPeriodId: 11, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { seasonId: 2017 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when teamId is passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { teamId: 9, matchupPeriodId: 11, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { teamId: 9, matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { teamId: 9, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { teamId: 9 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });
            });

            describe('when teamId is not passed on params', () => {
              describe('when matchupPeriodId is passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { matchupPeriodId: 11, scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: { matchupPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });

              describe('when matchupPeriodId is not passed on params', () => {
                describe('when scoringPeriodId is passed on params', () => {
                  testThrowsError({
                    params: { scoringPeriodId: 11 },
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });

                describe('when scoringPeriodId is not passed on params', () => {
                  testThrowsError({
                    params: {},
                    errorMessage: 'Boxscore: static read: cannot read without leagueId'
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('instance methods', () => {
    describe('read', () => {
      beforeEach(() => {
        jest.spyOn(BaseAPIObject.prototype, 'read').mockImplementation();
      });

      afterEach(() => {
        BaseAPIObject.prototype.read.mockRestore();
      });

      describe('when params are passed to the method', () => {
        describe('when id params are defined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Boxscore({
              leagueId: 4213,
              seasonId: 2018,
              teamId: 4,
              matchupPeriodId: 12,
              scoringPeriodId: 12
            });
            const params = { some: 'params' };
            const reload = false;

            instance.read({ params, reload });
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: _.assign({}, params, {
                leagueId: instance.leagueId,
                seasonId: instance.seasonId,
                teamId: instance.teamId,
                matchupPeriodId: instance.matchupPeriodId,
                scoringPeriodId: instance.scoringPeriodId
              }),
              route: Boxscore.route,
              reload
            });
          });
        });

        describe('when id params are undefined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Boxscore();
            const params = { some: 'params' };
            const route = 'some route';

            instance.read({ params, route });
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params,
              route,
              reload: true
            });
          });
        });
      });

      describe('when no params are passed to the method', () => {
        describe('when id params are defined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Boxscore({
              leagueId: 4213,
              seasonId: 2018,
              teamId: 4,
              matchupPeriodId: 12,
              scoringPeriodId: 12
            });

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {
                leagueId: instance.leagueId,
                seasonId: instance.seasonId,
                teamId: instance.teamId,
                matchupPeriodId: instance.matchupPeriodId,
                scoringPeriodId: instance.scoringPeriodId
              },
              route: Boxscore.route,
              reload: true
            });
          });
        });

        describe('when id params are undefined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Boxscore();

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {},
              route: Boxscore.route,
              reload: true
            });
          });
        });
      });
    });
  });
});
