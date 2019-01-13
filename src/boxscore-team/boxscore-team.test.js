import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Team from '../team/team.js';

import BoxscoreTeam from './boxscore-team.js';

import { localObject, serverResponse } from './boxscore-team.stubs.js';

describe('BoxscoreTeam', () => {
  let boxscoreTeam;

  beforeEach(() => {
    boxscoreTeam = new BoxscoreTeam({ leagueId: 234234, seasonId: 2017 });
  });

  afterEach(() => {
    boxscoreTeam = null;
  });

  test('extends BaseObject', () => {
    expect(boxscoreTeam).toBeInstanceOf(BaseObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      boxscoreTeam = BoxscoreTeam.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(boxscoreTeam).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      boxscoreTeam = new BoxscoreTeam(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscoreTeam).toMatchSnapshot();
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
    describe('team', () => {
      describe('manualParse', () => {
        describe('when the passed data is undefined', () => {
          test('returns undefined', () => {
            const returnedTeam = BoxscoreTeam.responseMap.team.manualParse();
            expect(returnedTeam).toBeUndefined();
          });
        });

        describe('when the passed data is empty', () => {
          test('returns undefined', () => {
            const returnedTeam = BoxscoreTeam.responseMap.team.manualParse({});
            expect(returnedTeam).toBeUndefined();
          });
        });

        describe('when the passed data is populated', () => {
          let ids, responseData, teamId;

          beforeEach(() => {
            Team.clearCache();

            teamId = 10;
            responseData = {
              teamId,
              team: { teamId }
            };
            ids = {
              leagueId: boxscoreTeam.leagueId,
              seasonId: boxscoreTeam.seasonId,
              teamId
            };
          });

          afterEach(() => {
            ids = null;
            responseData = null;
            teamId = null;

            Team.clearCache();
          });

          describe('when there is a cached team', () => {
            test('returns the cached team', () => {
              const cachedTeam = Team.buildFromServer({}, ids);

              const returnedTeam = BoxscoreTeam.responseMap.team.manualParse(
                responseData, undefined, boxscoreTeam
              );
              expect(returnedTeam).toBe(cachedTeam);
            });
          });

          describe('when there is not a cached team', () => {
            test('creates a new team', () => {
              const cachingId = Team.getCacheId(ids);

              const returnedTeam = BoxscoreTeam.responseMap.team.manualParse(
                responseData, undefined, boxscoreTeam
              );

              expect(returnedTeam).toBe(Team.get(cachingId));
            });
          });
        });
      });
    });
  });
});
