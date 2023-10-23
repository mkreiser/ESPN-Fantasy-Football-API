import 'dotenv/config'; // Create a root .env file defining LEAGUE_ID, ESPN_S2, and SWID

import { Client } from '../../src/index';

jest.setTimeout(10000);

describe('2016 season integration tests', () => {
  let client;
  let leagueId;
  let seasonId;
  let scoringPeriodId;

  beforeEach(() => {
    leagueId = process.env.LEAGUE_ID;
    seasonId = 2016;
    scoringPeriodId = 1;

    client = new Client({
      leagueId,
      espnS2: process.env.ESPN_S2,
      SWID: process.env.SWID
    });
  });

  describe('getBoxscoreForWeek', () => {
    test('throws an error', async () => {
      expect.assertions(1);

      try {
        await client.getBoxscoreForWeek({
          seasonId,
          matchupPeriodId: scoringPeriodId,
          scoringPeriodId
        });
      } catch (ex) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ex).toMatchSnapshot();
      }
    });
  });

  describe('getDraftInfo', () => {
    test('throws an error', async () => {
      expect.assertions(1);

      try {
        await client.getDraftInfo({ seasonId });
      } catch (ex) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ex).toMatchSnapshot();
      }
    });
  });

  describe('getFreeAgents', () => {
    test('throws an error', async () => {
      expect.assertions(1);

      try {
        await client.getFreeAgents({ seasonId, scoringPeriodId });
      } catch (ex) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ex).toMatchSnapshot();
      }
    });
  });

  describe('getTeamsAtWeek', () => {
    test('throws an error', async () => {
      expect.assertions(1);

      try {
        await client.getTeamsAtWeek({ seasonId, scoringPeriodId });
      } catch (ex) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ex).toMatchSnapshot();
      }
    });
  });

  describe('getLeagueInfo', () => {
    test('throws an error', async () => {
      expect.assertions(1);

      try {
        await client.getLeagueInfo({ seasonId });
      } catch (ex) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ex).toMatchSnapshot();
      }
    });
  });

  describe('getNFLGamesForPeriod', () => {
    test('returns a populated array of NFLGames', async () => {
      const nflGames = await client.getNFLGamesForPeriod({
        startDate: '20161003',
        endDate: '20161008'
      });

      expect(nflGames).toMatchSnapshot();
    });
  });

  describe('getHistoricalScoreboardForWeek', () => {
    test('returns a populated array of Boxscores', async () => {
      const scoreboards = await client.getHistoricalScoreboardForWeek({
        seasonId,
        matchupPeriodId: scoringPeriodId,
        scoringPeriodId
      });

      expect(scoreboards).toMatchSnapshot();
    });
  });

  describe('getHistoricalTeamsAtWeek', () => {
    test('returns a populated array of Teams', async () => {
      const teams = await client.getHistoricalTeamsAtWeek({ seasonId, scoringPeriodId });
      expect(teams).toMatchSnapshot();
    });
  });
});
