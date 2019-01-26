import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import SlottedPlayer from '../slotted-player/slotted-player.js';
import Team from '../team/team.js';

import Roster from './roster.js';

import { localObject, serverResponse } from './roster.stubs.js';

describe('Roster', () => {
  test('extends BaseAPIObject', () => {
    const instance = new Roster();
    expect(instance).toBeInstanceOf(BaseAPIObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = Roster.buildFromServer(serverResponse, {
        leagueId: 2234123, seasonId: 2017, teamId: 9, scoringPeriodId: 12
      });
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new Roster(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newRoster = new Roster();
          expect(_.get(newRoster, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
      testPropIsUndefined('teamId');
      testPropIsUndefined('scoringPeriodId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newRoster = new Roster({ [prop]: value });
          expect(_.get(newRoster, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
      testPropIsSetFromOptions('teamId');
      testPropIsSetFromOptions('scoringPeriodId');
    });
  });

  describe('responseMap', () => {
    const buildRoster = (data, options) => Roster.buildFromServer(data, options);

    describe('team', () => {
      describe('manualParse', () => {
        const testSetsUndefined = ({ teamId, value, valueString }) => {
          describe(`when the passed data is ${valueString}`, () => {
            test('sets undefined', () => {
              const leagueId = 342343;
              const seasonId = 2017;

              const data = {
                leagueRosters: {
                  teams: value
                }
              };

              const roster = buildRoster(data, { leagueId, seasonId, teamId });
              expect(roster.teams).toBeUndefined();
            });
          });
        };

        describe('when the passed constructorParams do not have a teamId', () => {
          testSetsUndefined({ value: undefined, valueString: 'undefined' });
          testSetsUndefined({ value: null, valueString: 'null' });
          testSetsUndefined({ value: [], valueString: 'empty array' });
          testSetsUndefined({
            value: [{ teamId: 4 }, { teamId: 5 }, { teamId: 6 }],
            valueString: 'populated array'
          });
        });

        describe('when the passed constructorParams have a teamId', () => {
          testSetsUndefined({ teamId: 10, value: undefined, valueString: 'undefined' });
          testSetsUndefined({ teamId: 10, value: null, valueString: 'null' });
          testSetsUndefined({ teamId: 10, value: [], valueString: 'empty array' });

          describe('when the passed data is a populated array', () => {
            let data;
            let teamId;

            beforeEach(() => {
              teamId = 10;

              const teams = [{
                teamId,
                team: { teamId }
              }, {
                teamId: teamId + 1,
                team: { teamId: teamId + 1 }
              }];

              data = { leagueRosters: { teams } };
            });

            afterEach(() => {
              data = null;
              teamId = null;
            });

            describe('when there is a cached team', () => {
              test('sets the cached team', () => {
                const leagueId = 312312;
                const seasonId = 2017;
                const cachedTeam = Team.buildFromServer({ teamId }, { leagueId, seasonId, teamId });

                const roster = buildRoster(data, { leagueId, seasonId, teamId });
                expect(roster.team).toBe(cachedTeam);
              });
            });

            describe('when there is not a cached team', () => {
              test('sets a new team', () => {
                const leagueId = 312312;
                const seasonId = 2017;

                const roster = buildRoster(data, { leagueId, seasonId, teamId });
                expect(roster.team).toEqual(
                  Team.buildFromServer({ teamId }, { leagueId, seasonId })
                );
              });
            });
          });
        });
      });
    });

    describe('player', () => {
      describe('manualParse', () => {
        const testReturnsEmptyArray = ({ teamId, value, valueString }) => {
          describe(`when the slots data is ${valueString}`, () => {
            test('sets an empty array', () => {
              const leagueId = 342343;
              const seasonId = 2017;

              const data = {
                leagueRosters: {
                  teams: [{
                    teamId: teamId || 9,
                    slots: value
                  }]
                }
              };

              const roster = buildRoster(data, { leagueId, seasonId, teamId });
              expect(roster.players).toEqual([]);
            });
          });
        };

        describe('when the passed constructorParams do not have a teamId', () => {
          testReturnsEmptyArray({ value: undefined, valueString: 'undefined' });
          testReturnsEmptyArray({ value: null, valueString: 'null' });
          testReturnsEmptyArray({ value: [], valueString: 'empty array' });
          testReturnsEmptyArray({
            value: [{ teamId: 4 }, { teamId: 5 }, { teamId: 6 }],
            valueString: 'populated array'
          });
        });

        describe('when the passed constructorParams have a teamId', () => {
          testReturnsEmptyArray({ teamId: 10, value: undefined, valueString: 'undefined' });
          testReturnsEmptyArray({ teamId: 10, value: null, valueString: 'null' });
          testReturnsEmptyArray({ teamId: 10, value: [], valueString: 'empty array' });

          describe('when the passed data is a populated array', () => {
            test('returns an array of SlottedPlayers', () => {
              const leagueId = 342343;
              const seasonId = 2017;
              const teamId = 10;

              const teams = [{
                teamId,
                slots: [{
                  player: {},
                  isKeeper: true
                }, {
                  player: {},
                  isKeeper: false
                }]
              }];

              const data = { leagueRosters: { teams } };
              const roster = buildRoster(data, { leagueId, seasonId, teamId });

              expect.hasAssertions();
              _.forEach(roster.players, (slottedPlayer) => {
                expect(slottedPlayer).toBeInstanceOf(SlottedPlayer);
              });
            });
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      const testReturnsUndefined = (params) => {
        test('returns undefined', () => {
          expect(Roster.getCacheId(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(Roster.getCacheId()).toBeUndefined();
        });
      });

      describe('when leagueId is defined', () => {
        describe('when seasonId is defined', () => {
          describe('when teamId is defined', () => {
            describe('when scoringPeriodId is defined', () => {
              test('returns a valid caching id', () => {
                const params = {
                  leagueId: 132123, seasonId: 2017, teamId: 9, scoringPeriodId: 8
                };

                const returnedCachingId = Roster.getCacheId(params);
                expect(returnedCachingId).toBe(
                  `${params.teamId}-${params.leagueId}-${params.seasonId}-${params.scoringPeriodId}`
                );
              });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ leagueId: 132123, seasonId: 2017, teamId: 9 });
            });
          });

          describe('when teamId is undefined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ leagueId: 132123, seasonId: 2017, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ leagueId: 132123, seasonId: 2017 });
            });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when teamId is defined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ leagueId: 132123, teamId: 9, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ leagueId: 132123, teamId: 9 });
            });
          });

          describe('when teamId is undefined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ leagueId: 132123, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ leagueId: 132123 });
            });
          });
        });
      });

      describe('when leagueId is undefined', () => {
        describe('when seasonId is defined', () => {
          describe('when teamId is defined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ seasonId: 2017, teamId: 9, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ seasonId: 2017, teamId: 9 });
            });
          });

          describe('when teamId is undefined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ seasonId: 2017, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ seasonId: 2017 });
            });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when teamId is defined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ teamId: 9, scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({ teamId: 9 });
            });
          });

          describe('when teamId is undefined', () => {
            describe('when scoringPeriodId is defined', () => {
              testReturnsUndefined({ scoringPeriodId: 8 });
            });

            describe('when scoringPeriodId is undefined', () => {
              testReturnsUndefined({});
            });
          });
        });
      });
    });

    describe('read', () => {
      describe('when nothing is passed to read', () => {
        test('throws error', () => {
          expect(() => Roster.read()).toThrowError(
            `${Roster.displayName}: static read: cannot read without leagueId`
          );
        });
      });

      describe('when params are passed to read', () => {
        const testDefersRead = ({ params, expectedParams }) => {
          test('defers to super.read', () => {
            jest.spyOn(BaseAPIObject, 'read').mockImplementation();

            const instance = new Roster();
            const route = 'some route';
            const reload = false;

            Roster.read({
              instance, route, params, reload
            });
            expect(BaseAPIObject.read).toBeCalledWith({
              instance, route, params: expectedParams, reload
            });

            BaseAPIObject.read.mockRestore();
          });
        };

        const testThrowsError = ({ params, errorMessage }) => {
          test('throws error', () => {
            expect(() => Roster.read({ params })).toThrowError(errorMessage);
          });
        };

        describe('when leagueId is passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when teamIds is passed on params', () => {
              describe('when teamId is passed on params', () => {
                const params = {
                  leagueId: 3213, seasonId: 2017, teamId: 9, teamIds: 9
                };

                testDefersRead({
                  params,
                  expectedParams: params
                });
              });

              describe('when teamId is not passed on params', () => {
                const params = { leagueId: 3213, seasonId: 2017, teamIds: 9 };

                testDefersRead({
                  params,
                  expectedParams: params
                });
              });
            });

            describe('when teamIds is not passed on params', () => {
              describe('when teamId is passed on params', () => {
                testDefersRead({
                  params: { leagueId: 3213, seasonId: 2017, teamId: 9 },
                  expectedParams: {
                    leagueId: 3213, seasonId: 2017, teamId: 9, teamIds: 9
                  }
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 1231232, seasonId: 2017 },
                  errorMessage: 'Roster: static read: cannot read without teamId'
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when teamIds is passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { leagueId: 1231232, teamId: 9, teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without seasonId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 1231232, teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without seasonId'
                });
              });
            });

            describe('when teamIds is not passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { leagueId: 1231232, teamId: 9 },
                  errorMessage: 'Roster: static read: cannot read without seasonId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { leagueId: 1231232 },
                  errorMessage: 'Roster: static read: cannot read without seasonId'
                });
              });
            });
          });
        });

        describe('when leagueId is not passed on params', () => {
          describe('when seasonId is passed on params', () => {
            describe('when teamIds is passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, teamId: 9, teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });
            });

            describe('when teamIds is not passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017, teamId: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { seasonId: 2017 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });
            });
          });

          describe('when seasonId is not passed on params', () => {
            describe('when teamIds is passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { teamId: 9, teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: { teamIds: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });
            });

            describe('when teamIds is not passed on params', () => {
              describe('when teamId is passed on params', () => {
                testThrowsError({
                  params: { teamId: 9 },
                  errorMessage: 'Roster: static read: cannot read without leagueId'
                });
              });

              describe('when teamId is not passed on params', () => {
                testThrowsError({
                  params: {},
                  errorMessage: 'Roster: static read: cannot read without leagueId'
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
        describe('when all id params are defined on the instance', () => {
          test('calls super.read with passed pararms merged with all id params', () => {
            const leagueId = 4213;
            const seasonId = 2018;
            const teamId = 4;
            const scoringPeriodId = 1;

            const instance = new Roster({
              leagueId, seasonId, teamId, scoringPeriodId
            });
            const params = { some: 'params' };
            const reload = false;

            instance.read({ params, reload });
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: _.assign({}, params, {
                leagueId,
                scoringPeriodId,
                seasonId,
                teamId,
                teamIds: teamId
              }),
              route: Roster.route,
              reload
            });
          });
        });

        describe('when some id params are undefined on the instance', () => {
          test('calls super.read with passed pararms merged with only defined id params', () => {
            const leagueId = 4213;
            const seasonId = 2018;
            const teamId = 4;

            const instance = new Roster({ leagueId, seasonId, teamId });
            const params = { some: 'params' };
            const route = 'some route';

            instance.read({ params, route });
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: _.assign({}, params, {
                leagueId, teamId, seasonId, teamIds: teamId
              }),
              route,
              reload: true
            });
          });
        });

        describe('when all id params are undefined on the instance', () => {
          test('calls super.read with passed params without id params', () => {
            const instance = new Roster();
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
        describe('when all id params are defined on the instance', () => {
          test('calls super.read with all defined id params', () => {
            const leagueId = 4213;
            const seasonId = 2018;
            const teamId = 4;
            const scoringPeriodId = 1;

            const instance = new Roster({
              leagueId, seasonId, teamId, scoringPeriodId
            });

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {
                leagueId,
                scoringPeriodId,
                seasonId,
                teamId,
                teamIds: teamId
              },
              route: Roster.route,
              reload: true
            });
          });
        });

        describe('when some id params are undefined on the instance', () => {
          test('calls super.read with all defined id params', () => {
            const leagueId = 4213;
            const seasonId = 2018;
            const teamId = 4;

            const instance = new Roster({ leagueId, seasonId, teamId });

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {
                leagueId,
                seasonId,
                teamId,
                teamIds: teamId
              },
              route: Roster.route,
              reload: true
            });
          });
        });

        describe('when all id params are undefined on the instance', () => {
          test('calls super.read without id params', () => {
            const instance = new Roster();

            instance.read();
            expect(BaseAPIObject.prototype.read).toBeCalledWith({
              params: {},
              route: Roster.route,
              reload: true
            });
          });
        });
      });
    });
  });
});
