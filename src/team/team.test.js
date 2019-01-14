import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
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

  test('extends BaseObject', () => {
    expect(team).toBeInstanceOf(BaseObject);
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
      team = new Team(localObject);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('streakType', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const streakTypes = {
              1: 'W',
              2: 'L'
            };

            expect.hasAssertions();
            _.forEach(streakTypes, (value, key) => {
              const numKey = _.toNumber(key);
              const streakString = Team.responseMap.streakType.manualParse(numKey);
              expect(streakString).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const streakString = Team.responseMap.streakType.manualParse(-231);
            expect(streakString).toBe('ERROR: streakType not recognized');
          });
        });
      });
    });
  });

  describe('class methods', () => {
    describe('getCacheId', () => {
      let leagueId;
      let seasonId;
      let teamId;

      afterEach(() => {
        leagueId = null;
        seasonId = null;
        teamId = null;
      });

      const testReturnsUndefined = () => {
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
        beforeEach(() => {
          leagueId = 132123;
        });

        describe('when seasonId is defined', () => {
          beforeEach(() => {
            seasonId = 2017;
          });

          describe('when teamId is defined', () => {
            beforeEach(() => {
              teamId = 4;
            });

            test('returns a valid caching id', () => {
              const params = { leagueId, seasonId, teamId };

              const returnedCachingId = Team.getCacheId(params);
              expect(returnedCachingId).toBe(
                `${teamId}-${leagueId}-${seasonId}`
              );
            });
          });

          describe('when teamId is undefined', () => {
            beforeEach(() => {
              teamId = undefined;
            });

            testReturnsUndefined();
          });
        });

        describe('when seasonId is undefined', () => {
          beforeEach(() => {
            seasonId = undefined;
          });

          describe('when teamId is defined', () => {
            beforeEach(() => {
              teamId = 4;
            });

            testReturnsUndefined();
          });

          describe('when teamId is undefined', () => {
            beforeEach(() => {
              teamId = undefined;
            });

            testReturnsUndefined();
          });
        });
      });

      describe('when leagueId is undefined', () => {
        beforeEach(() => {
          leagueId = undefined;
        });

        describe('when seasonId is defined', () => {
          beforeEach(() => {
            seasonId = 2017;
          });

          describe('when teamId is defined', () => {
            beforeEach(() => {
              teamId = 4;
            });

            testReturnsUndefined();
          });

          describe('when teamId is undefined', () => {
            beforeEach(() => {
              teamId = undefined;
            });

            testReturnsUndefined();
          });
        });

        describe('when seasonId is undefined', () => {
          beforeEach(() => {
            seasonId = undefined;
          });

          describe('when teamId is defined', () => {
            beforeEach(() => {
              teamId = 4;
            });

            testReturnsUndefined();
          });

          describe('when teamId is undefined', () => {
            beforeEach(() => {
              teamId = undefined;
            });

            testReturnsUndefined();
          });
        });
      });
    });
  });
});
