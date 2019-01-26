import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Team from '../team/team.js';

import BoxscoreTeam from './boxscore-team.js';

import { localObject, serverResponse } from './boxscore-team.stubs.js';

describe('BoxscoreTeam', () => {
  test('extends BaseObject', () => {
    const instance = new BoxscoreTeam();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = BoxscoreTeam.buildFromServer(serverResponse, {
        leagueId: 2234123, seasonId: 2017
      });
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new BoxscoreTeam(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new BoxscoreTeam();
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
          const newInstance = new BoxscoreTeam({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const buildBoxscoreTeam = (data, options) => BoxscoreTeam.buildFromServer(data, options);

    describe('team', () => {
      describe('manualParse', () => {
        describe('when the passed data is undefined', () => {
          test('sets undefined', () => {
            const boxscoreTeam = buildBoxscoreTeam({});
            expect(boxscoreTeam.team).toBeUndefined();
          });
        });

        describe('when the passed data is empty', () => {
          test('sets undefined', () => {
            const data = { teamBoxscore: undefined };

            const boxscoreTeam = buildBoxscoreTeam(data);
            expect(boxscoreTeam.team).toBeUndefined();
          });
        });

        describe('when the passed data is populated', () => {
          let options;

          beforeEach(() => {
            options = { leagueId: 123321, seasonId: 2017 };
          });

          afterEach(() => {
            options = null;
          });

          describe('when there is a cached team', () => {
            test('returns the cached team', () => {
              const teamId = 9;

              const cachedTeam = Team.buildFromServer({ teamId }, options);
              const data = {
                teamBoxscore: {
                  teamId,
                  team: { teamId }
                }
              };

              const boxscoreTeam = buildBoxscoreTeam(data, options);
              expect(boxscoreTeam.team).toBe(cachedTeam);
            });
          });

          describe('when there is not a cached team', () => {
            test('creates a new team', () => {
              const teamId = 9;

              const data = {
                teamBoxscore: {
                  teamId,
                  team: { teamId }
                }
              };

              const boxscoreTeam = buildBoxscoreTeam(data, options);
              expect(boxscoreTeam.team).toEqual(
                Team.buildFromServer({ teamId }, options)
              );
            });
          });
        });
      });
    });
  });
});
