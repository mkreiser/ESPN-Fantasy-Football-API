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

  describe('getHistoricalScoreboardForWeek', () => {
    test('returns a populated array of Boxscores', async () => {
      const scoreboards = await client.getHistoricalScoreboardForWeek({
        seasonId, matchupPeriodId: scoringPeriodId, scoringPeriodId
      });

      expect(scoreboards).toMatchSnapshot();
    });
  });
});
