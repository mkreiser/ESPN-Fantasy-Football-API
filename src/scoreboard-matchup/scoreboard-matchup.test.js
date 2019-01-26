import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import Team from '../team/team.js';
import ScoreboardMatchup from './scoreboard-matchup.js';

import { localObject, serverResponse } from './scoreboard-matchup.stubs.js';

describe('ScoreboardMatchup', () => {
  let leagueId;
  let seasonId;

  beforeEach(() => {
    leagueId = 513422;
    seasonId = 2017;
  });

  afterEach(() => {
    leagueId = null;
    seasonId = null;
  });

  test('extends BaseObject', () => {
    const instance = new ScoreboardMatchup();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = ScoreboardMatchup.buildFromServer(serverResponse, { leagueId, seasonId });
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new ScoreboardMatchup(localObject);
      expect(instance).toMatchSnapshot();
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
          expect(newInstance[prop]).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });

  describe('responseMap', () => {
    const buildScoreboardMatchup = (data, options) => (
      ScoreboardMatchup.buildFromServer(data, options)
    );

    const testTeamBehavior = ({ isTeamHome }) => {
      const teamPrefix = isTeamHome ? 'home' : 'away';

      describe('when the team data does not exist on the response', () => {
        test(`sets ${teamPrefix}Team to undefined`, () => {
          const data = { teams: [] };

          const returnedMatchup = buildScoreboardMatchup(data);
          expect(_.get(returnedMatchup, `${teamPrefix}Team`)).toBeUndefined();
        });
      });

      describe('when the team data does exist on the response', () => {
        describe('when a matching team is in the cache', () => {
          test(`sets ${teamPrefix}Team to the matching cached team`, () => {
            const teamId = 5;
            const data = {
              teams: [{
                teamId,
                team: { teamId },
                home: isTeamHome
              }, {
                teamId: teamId + 1,
                team: { teamId: teamId + 1 },
                home: !isTeamHome
              }]
            };

            const cachedTeam = Team.buildFromServer({ teamId }, { leagueId, seasonId });

            const returnedMatchup = buildScoreboardMatchup(data, { leagueId, seasonId });
            expect(_.get(returnedMatchup, `${teamPrefix}Team`)).toBe(cachedTeam);
          });
        });

        describe('when a matching team is not in the cache', () => {
          test(`sets ${teamPrefix}Team to a new team instance`, () => {
            const teamId = 5;
            const data = {
              teams: [{
                teamId,
                team: { teamId },
                home: isTeamHome
              }, {
                teamId: teamId + 1,
                team: { teamId: teamId + 1 },
                home: !isTeamHome
              }]
            };

            const returnedMatchup = buildScoreboardMatchup(data, { leagueId, seasonId });
            expect(_.get(returnedMatchup, `${teamPrefix}Team`)).toEqual(
              Team.buildFromServer(data.teams[0], { leagueId, seasonId })
            );
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
        test(`sets ${teamPrefix}TeamScore to the correct score`, () => {
          const score = 213.43;
          const data = {
            teams: [{
              score,
              home: isTeamHome
            }, {
              score: score * 0.75,
              home: !isTeamHome
            }]
          };

          const returnedMatchup = buildScoreboardMatchup(data, { leagueId, seasonId });
          expect(_.get(returnedMatchup, `${teamPrefix}TeamScore`)).toBe(score);
        });
      });

      describe('when there is not matching team in the response data', () => {
        test(`sets ${teamPrefix}TeamScore to undefined`, () => {
          const data = {
            teams: [{
              score: 213.43,
              home: !isTeamHome
            }]
          };

          const returnedMatchup = buildScoreboardMatchup(data, { leagueId, seasonId });
          expect(_.get(returnedMatchup, `${teamPrefix}TeamScore`)).toBeUndefined();
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
      const callWinner = (response, instance) => ScoreboardMatchup.responseMap.winner.manualParse(
        undefined, response, undefined, instance
      );

      describe('when the winner is the home team', () => {
        test('returns the parsed homeTeam', () => {
          const response = { winner: 'home' };
          const homeTeam = new Team();
          const instance = new ScoreboardMatchup({ homeTeam });

          const returnedWinner = callWinner(response, instance);
          expect(returnedWinner).toBe(homeTeam);
        });
      });

      describe('when the winner is the away team', () => {
        test('returns the parsed awayTeam', () => {
          const response = { winner: 'away' };
          const awayTeam = new Team();
          const instance = new ScoreboardMatchup({ awayTeam });

          const returnedWinner = callWinner(response, instance);
          expect(returnedWinner).toBe(awayTeam);
        });
      });

      describe('when there is no winner', () => {
        test('returns undefined', () => {
          const response = { winner: '' };
          const homeTeam = new Team();
          const awayTeam = new Team();
          const instance = new ScoreboardMatchup({ homeTeam, awayTeam });

          const returnedWinner = callWinner(response, instance);
          expect(returnedWinner).toBeUndefined();
        });
      });
    });
  });
});
