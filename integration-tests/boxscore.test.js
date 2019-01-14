import { Boxscore } from '../index.js';

describe('Boxscore functionality', () => {
  let leagueId;
  let seasonId;
  let teamId;

  beforeEach(() => {
    leagueId = 336358;
    seasonId = 2017;
    teamId = 9;
  });

  afterEach(() => {
    leagueId = null;
    seasonId = null;
    teamId = null;
  });

  const testClassAndInstance = (params) => {
    test('from class', async () => {
      const scoreboard = await Boxscore.read({ params });
      expect(scoreboard).toMatchSnapshot();
    });

    test('from instance', async () => {
      const instance = new Boxscore(params);
      const scoreboard = await instance.read();
      expect(scoreboard).toMatchSnapshot();
    });
  };

  describe('can load Boxscore with matchupPeriodId', () => {
    testClassAndInstance({
      leagueId: 336358, seasonId: 2017, teamId: 9, matchupPeriodId: 11
    });
  });

  describe('can load Boxscore with scoringPeriodId', () => {
    testClassAndInstance({
      leagueId: 336358, seasonId: 2017, teamId: 9, scoringPeriodId: 11
    });
  });

  describe('can load Boxscore with matchupPeriodId and scoringPeriodId', () => {
    testClassAndInstance({
      leagueId: 336358, seasonId: 2017, teamId: 9, matchupPeriodId: 11, scoringPeriodId: 11
    });
  });


  test('cannot load Boxscore without leagueId', async () => {
    expect.hasAssertions();

    try {
      await Boxscore.read({ params: { seasonId } });
    } catch (error) {
      expect(error.message).toBe('Boxscore: static read: cannot read without leagueId');
    }
  });

  test('cannot load Boxscore without seasonId', async () => {
    expect.hasAssertions();

    try {
      await Boxscore.read({ params: { leagueId } });
    } catch (error) {
      expect(error.message).toBe('Boxscore: static read: cannot read without seasonId');
    }
  });

  test('cannot load Boxscore without teamId', async () => {
    expect.hasAssertions();

    try {
      await Boxscore.read({ params: { leagueId, seasonId } });
    } catch (error) {
      expect(error.message).toBe('Boxscore: static read: cannot read without teamId');
    }
  });

  test('cannot load Boxscore without one of matchupPeriodId or scoringPeriodId', async () => {
    expect.hasAssertions();

    try {
      await Boxscore.read({ params: { leagueId, seasonId, teamId } });
    } catch (error) {
      expect(error.message).toBe(
        'Boxscore: static read: cannot read without one of matchupPeriodId or scoringPeriodId'
      );
    }
  });
});
