import BaseObject from '../base-classes/base-object/base-object.js';

import MatchupScore from './matchup-score';

describe('MatchupScore', () => {
  test('extends BaseObject', () => {
    const instance = new MatchupScore();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    const buildMatchupScore = (data, options) => MatchupScore.buildFromServer(data, options);

    let data;

    beforeEach(() => {
      data = {
        matchupPeriodId: 1,
        home: {
          totalPoints: 123,
          teamId: 3
        },
        away: {
          totalPoints: 324,
          teamId: 2
        }
      };
    });

    describe('homeScore', () => {
      describe('manualParse', () => {
        describe('when matchup is in progress live points are populated on the team\'s response', () => {
          test('maps to totalPointsLive and totalProjectedPointsLive', () => {
            data.home.totalPointsLive = data.home.totalPoints + 12;
            data.home.totalProjectedPointsLive = 100;

            const boxscore = buildMatchupScore(data);
            expect(boxscore.homeScore).toBe(data.home.totalPoints);
            expect(boxscore.homeScoreLive).toBe(data.home.totalPointsLive);
            expect(boxscore.homeScoreProjected).toBe(data.home.totalProjectedPointsLive);
          });
        });

        describe('when matchup is not in progress on the team\'s response', () => {
          test('maps to totalPoints', () => {
            delete data.home.totalPointsLive;
            delete data.home.totalProjectedPointsLive;

            const boxscore = buildMatchupScore(data);
            expect(boxscore.homeScore).toBe(data.home.totalPoints);
          });
        });
      });
    });

    describe('awayScore', () => {
      describe('manualParse', () => {
        describe('when matchup is in progress live points are populated on the team\'s response', () => {
          test('maps to totalPointsLive and totalProjectedPointsLive', () => {
            data.away.totalPointsLive = data.away.totalPoints + 12;
            data.away.totalProjectedPointsLive = 150;

            const boxscore = buildMatchupScore(data);
            expect(boxscore.awayScore).toBe(data.away.totalPoints);
            expect(boxscore.awayScoreLive).toBe(data.away.totalPointsLive);
            expect(boxscore.awayScoreProjected).toBe(data.away.totalProjectedPointsLive);
          });
        });

        describe('when matchup is not in progress on the team\'s response', () => {
          test('maps to totalPoints', () => {
            delete data.away.totalPointsLive;
            delete data.away.totalProjectedPointsLive;

            const boxscore = buildMatchupScore(data);
            expect(boxscore.awayScore).toBe(data.away.totalPoints);
          });
        });
      });
    });
  });
});
