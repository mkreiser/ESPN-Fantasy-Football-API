import ApiModel from '../api-model/api-model.js';
import Team from '../team/team.js';

import BoxscoreTeam from './boxscore-team.js';

import { localObject, serverResponse } from './boxscore-team.stubs.js';

describe('BoxscoreTeam', () => {
  let boxscoreTeam;

  beforeEach(() => {
    boxscoreTeam = new BoxscoreTeam();
  });

  afterEach(() => {
    boxscoreTeam = null;
  });

  test('extends ApiModel', () => {
    expect(boxscoreTeam).toBeInstanceOf(ApiModel);
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
      boxscoreTeam = BoxscoreTeam.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscoreTeam).toMatchSnapshot();
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

        describe('when there is a cached team', () => {
          test('returns the cached team', () => {
            const teamId = 10;
            const cachedTeam = Team.buildFromServer({ teamId });

            const returnedTeam = BoxscoreTeam.responseMap.team.manualParse({
              teamId,
              team: {
                teamId,
                firstName: 'Test',
                lastName: 'Player'
              }
            });
            expect(returnedTeam).toBe(cachedTeam);

            Team.clearCache();
          });
        });

        describe('when there is not a cached team', () => {
          test('creates a new team', () => {
            const teamId = 10;
            Team.clearCache();

            const returnedTeam = BoxscoreTeam.responseMap.team.manualParse({
              teamId,
              team: {
                teamId,
                firstName: 'Test',
                lastName: 'Player'
              }
            });
            expect(returnedTeam).toBe(Team.get(teamId));

            Team.clearCache();
          });
        });
      });
    });
  });

  describe('class methods', () => {
    test('throws error', () => {
      expect(() => BoxscoreTeam.read()).toThrowError(
        `${BoxscoreTeam.displayName}: read: Cannot call read.`
      );
    });
  });
});
