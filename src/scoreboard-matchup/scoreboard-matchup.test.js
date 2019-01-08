import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Team from '../team/team.js';
import ScoreboardMatchup from './scoreboard-matchup.js';

import { localObject, serverResponse } from './scoreboard-matchup.stubs.js';

describe('ScoreboardMatchup', () => {
  let matchup;

  beforeEach(() => {
    matchup = new ScoreboardMatchup({
      leagueId: 513422,
      seasonId: 2015
    });
  });

  afterEach(() => {
    matchup = null;
  });

  test('extends BaseObject', () => {
    expect(matchup).toBeInstanceOf(BaseObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      matchup = ScoreboardMatchup.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(matchup).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      matchup = new ScoreboardMatchup(localObject);
    });

    test('parses data correctly', () => {
      expect(matchup).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new ScoreboardMatchup();
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
          const newInstance = new ScoreboardMatchup({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const testTeamBehavior = ({ isTeamHome }) => {
      const teamPrefix = isTeamHome ? 'home' : 'away';

      describe('when the team data does not exist on the response', () => {
        test('returns undefined', () => {
          const data = [];
          const returnedTeam = _.invoke(
            ScoreboardMatchup.responseMap,
            `${teamPrefix}Team.manualParse`,
            data,
            undefined,
            matchup
          );
          expect(returnedTeam).toBeUndefined();
        });
      });

      describe('when the team data does exist on the response', () => {
        describe('when a matching team is in the cache', () => {
          test('returns cached team', () => {
            const teamId = 5;
            const data = [{
              teamId,
              team: { teamId },
              home: isTeamHome
            }];
            const cachedTeam = Team.buildFromServer(
              { teamId },
              { leagueId: matchup.leagueId, seasonId: matchup.seasonId }
            );

            const returnedTeam = _.invoke(
              ScoreboardMatchup.responseMap,
              `${teamPrefix}Team.manualParse`,
              data,
              undefined,
              matchup
            );
            expect(returnedTeam).toBe(cachedTeam);

            Team.clearCache();
          });
        });

        describe('when a matching team is not in the cache', () => {
          test('returns cached team', () => {
            const teamId = 5;
            const data = [{
              teamId,
              team: { teamId },
              home: isTeamHome
            }];
            jest.spyOn(Team, 'buildFromServer');

            const returnedTeam = _.invoke(
              ScoreboardMatchup.responseMap,
              `${teamPrefix}Team.manualParse`,
              data,
              undefined,
              matchup
            );
            expect(returnedTeam).toBeInstanceOf(Team);
            expect(returnedTeam.teamId).toBe(teamId);
            expect(Team.buildFromServer).toBeCalledWith(_.first(data).team);

            Team.clearCache();
          });
        });
      });
    };

    describe('homeTeam', () => {
      describe('manualParse', () => {
        testTeamBehavior({ isTeamHome: true });
      });
    });

    describe('awayTeam', () => {
      describe('manualParse', () => {
        testTeamBehavior({ isTeamHome: false });
      });
    });

    const testTeamScoreBehavior = ({ isTeamHome }) => {
      const teamPrefix = isTeamHome ? 'home' : 'away';

      describe('when there is matching team in the response data', () => {
        test('returns the team\'s score', () => {
          const score = 213.43;
          const data = [{
            score,
            home: isTeamHome
          }];
          const returnedScore = _.invoke(
            ScoreboardMatchup.responseMap,
            `${teamPrefix}TeamScore.manualParse`,
            data,
            undefined,
            matchup
          );
          expect(returnedScore).toBe(score);
        });
      });

      describe('when there is not matching team in the response data', () => {
        test('returns undefined', () => {
          const data = [];
          const returnedScore = _.invoke(
            ScoreboardMatchup.responseMap,
            `${teamPrefix}TeamScore.manualParse`,
            data,
            undefined,
            matchup
          );
          expect(returnedScore).toBeUndefined();
        });
      });
    };

    describe('homeTeamScore', () => {
      describe('manualParse', () => {
        testTeamScoreBehavior({ isTeamHome: true });
      });
    });

    describe('awayTeamScore', () => {
      describe('manualParse', () => {
        testTeamScoreBehavior({ isTeamHome: false });
      });
    });

    describe('winner', () => {
      describe('when the winner is the home team', () => {
        test('returns the parsed homeTeam', () => {
          const response = { winner: 'home' };
          const homeTeam = new Team();
          const instance = { homeTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, instance
          );

          expect(returnedWinner).toBe(homeTeam);
        });
      });

      describe('when the winner is the away team', () => {
        test('returns the parsed awayTeam', () => {
          const response = { winner: 'away' };
          const awayTeam = new Team();
          const instance = { awayTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, instance
          );

          expect(returnedWinner).toBe(awayTeam);
        });
      });

      describe('when there is no winner', () => {
        test('returns undefined', () => {
          const response = { winner: '' };
          const homeTeam = new Team();
          const awayTeam = new Team();
          const instance = { homeTeam, awayTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, instance
          );

          expect(returnedWinner).toBeUndefined();
        });
      });
    });
  });
});
