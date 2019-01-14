import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';
import ScoreboardMatchup from '../scoreboard-matchup/scoreboard-matchup.js';

import Scoreboard from './scoreboard.js';

import { localObject, serverResponse } from './scoreboard.stubs.js';

describe('Scoreboard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard({
      leagueId: 342342,
      seasonId: 2018,
      matchupPeriodId: 11,
      scoringPeriodId: 11
    });
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

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new Scoreboard();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
      testPropIsUndefined('matchupPeriodId');
      testPropIsUndefined('scoringPeriodId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new Scoreboard({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
      testPropIsSetFromOptions('matchupPeriodId');
      testPropIsSetFromOptions('scoringPeriodId');
    });
  });

  describe('responseMap', () => {
    describe('matchups', () => {
      describe('manualParse', () => {
        describe('when there is no passed data', () => {
          test('returns an empty array', () => {
            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              undefined, undefined, scoreboard
            );

            expect(returnedMatchups).toEqual([]);
          });
        });

        describe('when the passed data is empty', () => {
          test('returns an empty array', () => {
            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              [], undefined, scoreboard
            );

            expect(returnedMatchups).toEqual([]);
          });
        });

        describe('when the passed data is populated', () => {
          test('returns an array of ScoreboardMatchups', () => {
            const responseData = [{}, {}, {}];

            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              responseData, undefined, scoreboard
            );

            expect.hasAssertions();
            _.forEach(returnedMatchups, (matchup) => {
              expect(matchup).toBeInstanceOf(ScoreboardMatchup);
              expect(matchup.leagueId).toBe(scoreboard.leagueId);
              expect(matchup.seasonId).toBe(scoreboard.seasonId);
            });
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      test('returns undefined', () => {
        expect(Scoreboard.getCacheId()).toBeUndefined();
      });
    });

    describe('read', () => {
      describe('when nothing is passed to read', () => {
        test('throws error', () => {
          expect(() => Scoreboard.read()).toThrowError(
            'Scoreboard: static read: cannot read without leagueId'
          );
        });
      });

      describe('when params are passed to read', () => {
        const testThrowsError = ({ params, errorMessage }) => {
          test('throws error', () => {
            expect(() => Scoreboard.read({ params })).toThrowError(errorMessage);
          });
        };

        const testDefersRead = ({ params }) => {
          test('defers to super.read', () => {
            jest.spyOn(BaseAPIObject, 'read').mockImplementation();

            const instance = new Scoreboard();
            const route = 'some route';
            const reload = false;

            Scoreboard.read({
              instance, route, params, reload
            });
            expect(BaseAPIObject.read).toBeCalledWith({
              instance, route, params, reload
            });

            BaseAPIObject.read.mockRestore();
          });
        };

        describe('when leagueId is passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when matchupPeriodId is passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testDefersRead({
                  params: {
                    leagueId: 21312, seasonId: 2017, matchupPeriodId: 1, scoringPeriodId: 1
                  }
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testDefersRead({ params: { leagueId: 21312, seasonId: 2017, matchupPeriodId: 1 } });
              });
            });

            describe('when matchupPeriodId is not passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testDefersRead({ params: { leagueId: 21312, seasonId: 2017, scoringPeriodId: 1 } });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 21312, seasonId: 2017 },
                  errorMessage: 'Scoreboard: static read: cannot read without one of ' +
                  'matchupPeriodId or scoringPeriodId'
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when matchupPeriodId is passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { leagueId: 21312, matchupPeriodId: 12, scoringPeriodId: 12 },
                  errorMessage: 'Scoreboard: static read: cannot read without seasonId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 21312, matchupPeriodId: 12 },
                  errorMessage: 'Scoreboard: static read: cannot read without seasonId'
                });
              });
            });

            describe('when matchupPeriodId is not passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { leagueId: 21312, scoringPeriodId: 12 },
                  errorMessage: 'Scoreboard: static read: cannot read without seasonId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 21312 },
                  errorMessage: 'Scoreboard: static read: cannot read without seasonId'
                });
              });
            });
          });
        });

        describe('when leagueId is not passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when matchupPeriodId is passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, matchupPeriodId: 11, scoringPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, matchupPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });
            });

            describe('when matchupPeriodId is not passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, scoringPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when matchupPeriodId is passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { matchupPeriodId: 11, scoringPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: { matchupPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });
            });

            describe('when matchupPeriodId is not passed on params', () => {
              describe('when scoringPeriodId is passed on params', () => {
                testThrowsError({
                  params: { scoringPeriodId: 11 },
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
                });
              });

              describe('when scoringPeriodId is not passed on params', () => {
                testThrowsError({
                  params: {},
                  errorMessage: 'Scoreboard: static read: cannot read without leagueId'
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
            const instance = new Scoreboard({
              leagueId: 4213,
              seasonId: 2018,
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
                matchupPeriodId: instance.matchupPeriodId,
                scoringPeriodId: instance.scoringPeriodId
              }),
              route: Scoreboard.route,
              reload
            });
          });
        });

        describe('when id params are undefined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Scoreboard();
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
            const instance = new Scoreboard({
              leagueId: 4213,
              seasonId: 2018,
              matchupPeriodId: 12,
              scoringPeriodId: 12
            });

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {
                leagueId: instance.leagueId,
                seasonId: instance.seasonId,
                matchupPeriodId: instance.matchupPeriodId,
                scoringPeriodId: instance.scoringPeriodId
              },
              route: Scoreboard.route,
              reload: true
            });
          });
        });

        describe('when id params are undefined on the instance', () => {
          test('calls super.read with only defined id params', () => {
            const instance = new Scoreboard();

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {},
              route: Scoreboard.route,
              reload: true
            });
          });
        });
      });
    });
  });
});
