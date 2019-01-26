import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Team from './team.js';

import { localObject, serverResponse } from './team.stubs.js';

describe('Team', () => {
  test('extends BaseObject', () => {
    const instance = new Team();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = Team.buildFromServer(serverResponse, { leagueId: 312312, seasonId: 2017 });
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new Team(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new Team();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new Team({ [prop]: value });
          expect(newInstance[prop]).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const buildTeam = (data, options) => Team.buildFromServer(data, options);

    describe('streakType', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const streakTypes = {
              1: 'W',
              2: 'L'
            };

            _.forEach(streakTypes, (value, key) => {
              const numKey = _.toNumber(key);
              const data = {
                record: { streakType: numKey }
              };

              const team = buildTeam(data);
              expect(team.streakType).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const data = {
              record: { streakType: -231 }
            };

            const team = buildTeam(data);
            expect(team.streakType).toBe('ERROR: streakType not recognized');
          });
        });
      });
    });

    const testSetsPercentage = ({ dataKey, modelKey }) => {
      test(`sets ${modelKey} to the correct percentage`, () => {
        const value = 0.75;
        const data = {};
        _.set(data, dataKey, value);

        const team = buildTeam(data);
        expect(team[modelKey]).toBe(value * 100);
      });
    };

    describe('winningPercentage', () => {
      describe('manualParse', () => {
        testSetsPercentage({ dataKey: 'record.overallPercentage', modelKey: 'winningPercentage' });
      });
    });

    describe('divisionWinningPercentage', () => {
      describe('manualParse', () => {
        testSetsPercentage({
          dataKey: 'record.divisionPercentage',
          modelKey: 'divisionWinningPercentage'
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      const testReturnsUndefined = ({ leagueId, seasonId, teamId }) => {
        test('returns undefined', () => {
          const params = { leagueId, seasonId, teamId };
          expect(Team.getCacheId(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(Team.getCacheId()).toBeUndefined();
        });
      });

      describe('when leagueId is defined', () => {
        describe('when seasonId is defined', () => {
          describe('when teamId is defined', () => {
            test('returns a valid caching id', () => {
              const params = { leagueId: 341243, seasonId: 2017, teamId: 9 };

              const returnedCachingId = Team.getCacheId(params);
              expect(returnedCachingId).toBe(
                `${params.teamId}-${params.leagueId}-${params.seasonId}`
              );
            });
          });

          describe('when teamId is undefined', () => {
            testReturnsUndefined({ leagueId: 341243, seasonId: 2017 });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when teamId is defined', () => {
            testReturnsUndefined({ leagueId: 341243, teamId: 9 });
          });

          describe('when teamId is undefined', () => {
            testReturnsUndefined({ leagueId: 341243 });
          });
        });
      });

      describe('when leagueId is undefined', () => {
        describe('when seasonId is defined', () => {
          describe('when teamId is defined', () => {
            testReturnsUndefined({ seasonId: 2017, teamId: 9 });
          });

          describe('when teamId is undefined', () => {
            testReturnsUndefined({ seasonId: 2017 });
          });
        });

        describe('when seasonId is undefined', () => {
          describe('when teamId is defined', () => {
            testReturnsUndefined({ teamId: 9 });
          });

          describe('when teamId is undefined', () => {
            testReturnsUndefined({});
          });
        });
      });
    });
  });
});
