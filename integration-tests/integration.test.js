import { Client } from '../src/index';

jest.setTimeout(10000);

describe('client integration tests', () => {
  let client;
  let leagueId;
  let seasonId;
  let scoringPeriodId;

  beforeEach(() => {
    leagueId = process.env.LEAGUE_ID;
    seasonId = 2018;
    scoringPeriodId = 1;

    client = new Client({
      leagueId,
      espnS2: process.env.ESPN_S2,
      SWID: process.env.SWID
    });
  });

  describe('getBoxscoreForWeek', () => {
    test('returns a populated array of Boxscores', async () => {
      const boxscores = await client.getBoxscoreForWeek({
        seasonId, matchupPeriodId: scoringPeriodId, scoringPeriodId
      });

      expect(boxscores).toMatchSnapshot();
    });
  });

  describe('getHistoricalScoreboardForWeek', () => {
    beforeEach(() => {
      seasonId = 2016;
    });

    test('returns a populated array of Boxscores', async () => {
      const scoreboards = await client.getHistoricalScoreboardForWeek({
        seasonId, matchupPeriodId: scoringPeriodId, scoringPeriodId
      });

      expect(scoreboards).toMatchSnapshot();
    });
  });

  describe('getFreeAgents', () => {
    test('returns a populated array of FreeAgentPlayers', async () => {
      const players = await client.getFreeAgents({
        seasonId, scoringPeriodId
      });

      expect(players).toMatchSnapshot();
    });
  });

  describe('getTeamsAtWeek', () => {
    test('returns a populated array of Teams', async () => {
      const teams = await client.getTeamsAtWeek({
        seasonId, scoringPeriodId
      });

      expect(teams).toMatchSnapshot();
    });
  });

  describe('getNFLGamesForPeriod', () => {
    test('returns a populated array of NFLGames', async () => {
      const nflGames = await client.getNFLGamesForPeriod({
        startDate: '20181003', endDate: '20181008'
      });

      expect(nflGames).toMatchSnapshot();
    });
  });

  describe('getLeagueInfo', () => {
    test('returns a populated League instance', async () => {
      const league = await client.getLeagueInfo({ seasonId });

      expect(league).toMatchSnapshot();
    });
  });
});
