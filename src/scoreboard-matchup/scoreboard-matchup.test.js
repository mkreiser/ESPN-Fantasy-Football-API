import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';
import Team from '../team/team.js';
import ScoreboardMatchup from './scoreboard-matchup.js';

import { localObject, serverResponse } from './scoreboard-matchup.stubs.js';

describe('ScoreboardMatchup', () => {
  let matchup;

  beforeEach(() => {
    matchup = new ScoreboardMatchup();
  });

  afterEach(() => {
    matchup = null;
  });

  test('extends ApiModel', () => {
    expect(matchup).toBeInstanceOf(ApiModel);
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
      matchup = ScoreboardMatchup.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(matchup).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    const testTeamBehavior = ({ isTeamHome }) => {
      const teamPrefix = isTeamHome ? 'home' : 'away';

      describe('when the team data does not exist on the response', () => {
        test('returns undefined', () => {
          const data = [];
          const returnedTeam = _.invoke(
            ScoreboardMatchup.responseMap, `${teamPrefix}Team.manualParse`, data
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
            const cachedTeam = Team.buildFromServer({ teamId });

            const returnedTeam = _.invoke(
              ScoreboardMatchup.responseMap, `${teamPrefix}Team.manualParse`, data
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
              ScoreboardMatchup.responseMap, `${teamPrefix}Team.manualParse`, data
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
            ScoreboardMatchup.responseMap, `${teamPrefix}TeamScore.manualParse`, data
          );
          expect(returnedScore).toBe(score);
        });
      });

      describe('when there is not matching team in the response data', () => {
        test('returns undefined', () => {
          const data = [];
          const returnedScore = _.invoke(
            ScoreboardMatchup.responseMap, `${teamPrefix}TeamScore.manualParse`, data
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
          const model = { homeTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, model
          );

          expect(returnedWinner).toBe(homeTeam);
        });
      });

      describe('when the winner is the away team', () => {
        test('returns the parsed awayTeam', () => {
          const response = { winner: 'away' };
          const awayTeam = new Team();
          const model = { awayTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, model
          );

          expect(returnedWinner).toBe(awayTeam);
        });
      });

      describe('when there is no winner', () => {
        test('returns undefined', () => {
          const response = { winner: '' };
          const homeTeam = new Team();
          const awayTeam = new Team();
          const model = { homeTeam, awayTeam };

          const returnedWinner = ScoreboardMatchup.responseMap.winner.manualParse(
            {}, response, model
          );

          expect(returnedWinner).toBeUndefined();
        });
      });
    });
  });

  describe('class methods', () => {
    test('throws error', () => {
      expect(() => ScoreboardMatchup.read()).toThrowError(
        `${ScoreboardMatchup.displayName}: read: Cannot call read.`
      );
    });
  });
});
