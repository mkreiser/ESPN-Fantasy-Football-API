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
  });
});
