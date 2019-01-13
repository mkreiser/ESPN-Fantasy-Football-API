import _ from 'lodash';

import { Boxscore, League, Scoreboard } from '../index.js';

describe('Module functionality', () => {
  let leagueId, scoringPeriodId, seasonId, teamId;

  beforeEach(() => {
    leagueId = 336358;
    scoringPeriodId = 10;
    seasonId = 2017;
    teamId = 9;
  });

  afterEach(() => {
    leagueId = null;
    scoringPeriodId = null;
    seasonId = null;
    teamId = null;
  });

  test('can get multiple seasons of Leagues', async () => {
    expect.assertions(1);

    const promises = [
      League.read({ params: { leagueId, seasonId: 2016 } }),
      League.read({ params: { leagueId, seasonId: 2017 } }),
      League.read({ params: { leagueId, seasonId: 2018 } })
    ];

    const leagues = await Promise.all(promises);

    expect(leagues).toMatchSnapshot();
  });

  test('can get multiple Boxscores in the same season', async () => {
    expect.assertions(1);

    const promises = [
      Boxscore.read({ params: { leagueId, seasonId, teamId, scoringPeriodId: 10 } }),
      Boxscore.read({ params: { leagueId, seasonId, teamId, scoringPeriodId: 11 } }),
      Boxscore.read({ params: { leagueId, seasonId, teamId, scoringPeriodId: 12 } })
    ];

    const boxscores = await Promise.all(promises);

    expect(boxscores).toMatchSnapshot();
  });

  // TODO: Enable once 2018 player data stabilizes
  // test('can get Boxscores in different seasons', async () => {
  //   expect.assertions(1);

  //   const promises = [
  //     Boxscore.read({ params: { leagueId, seasonId: 2017, teamId, scoringPeriodId } }),
  //     Boxscore.read({ params: { leagueId, seasonId: 2018, teamId, scoringPeriodId } })
  //   ];

  //   const boxscores = await Promise.all(promises);

  //   expect(boxscores).toMatchSnapshot();
  // });

  test('can get multiple Scoreboards in the same season', async () => {
    expect.assertions(1);

    const promises = [
      Scoreboard.read({ params: { leagueId, seasonId, scoringPeriodId: 10 } }),
      Scoreboard.read({ params: { leagueId, seasonId, scoringPeriodId: 11 } }),
      Scoreboard.read({ params: { leagueId, seasonId, scoringPeriodId: 12 } })
    ];

    const scoreboards = await Promise.all(promises);

    expect(scoreboards).toMatchSnapshot();
  });

  test('can get Scoreboards in different seasons', async () => {
    expect.assertions(1);

    const promises = [
      Scoreboard.read({ params: { leagueId, seasonId: 2017, scoringPeriodId } }),
      Scoreboard.read({ params: { leagueId, seasonId: 2018, scoringPeriodId } })
    ];

    const scoreboards = await Promise.all(promises);

    expect(scoreboards).toMatchSnapshot();
  });

  test('uses cached Teams on Scoreboards and Boxscores when loading League first', async () => {
    expect.hasAssertions();

    const league = await League.read({ params: { leagueId, seasonId } });

    const boxscore = await Boxscore.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }
    });

    const scoreboard = await Scoreboard.read({ params: { leagueId, seasonId, scoringPeriodId } });

    expect(league).toMatchSnapshot();
    expect(boxscore).toMatchSnapshot();
    expect(scoreboard).toMatchSnapshot();

    const boxscoreHomeTeam = _.find(league.teams, { teamId: boxscore.homeTeam.team.teamId });
    const boxscoreAwayTeam = _.find(league.teams, { teamId: boxscore.awayTeam.team.teamId });

    expect(boxscore.homeTeam.team).toBe(boxscoreHomeTeam);
    expect(boxscore.awayTeam.team).toBe(boxscoreAwayTeam);

    _.forEach(scoreboard.matchups, (matchup) => {
      const scoreboardHomeTeam = _.find(league.teams, { teamId: matchup.homeTeam.teamId });
      const scoreboardAwayTeam = _.find(league.teams, { teamId: matchup.awayTeam.teamId });

      expect(matchup.homeTeam).toBe(scoreboardHomeTeam);
      expect(matchup.awayTeam).toBe(scoreboardAwayTeam);
    });
  });
});
