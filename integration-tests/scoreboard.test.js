import { Scoreboard } from '../index.js';

describe('Scoreboard functionality', () => {
  let leagueId, seasonId;

  beforeEach(() => {
    leagueId = 336358;
    seasonId = 2017;
  });

  afterEach(() => {
    leagueId = seasonId = null;
  });

  const testClassAndInstance = (params) => {
    test('from class', async () => {
      const scoreboard = await Scoreboard.read({ params });
      expect(scoreboard).toMatchSnapshot();
    });

    test('from instance', async () => {
      const instance = new Scoreboard(params);
      const scoreboard = await instance.read();
      expect(scoreboard).toMatchSnapshot();
    });
  };

  describe('can load Scoreboard with matchupPeriodId', () => {
    testClassAndInstance({ leagueId: 336358, seasonId: 2017, matchupPeriodId: 11 });
  });

  describe('can load Scoreboard with scoringPeriodId', () => {
    testClassAndInstance({ leagueId: 336358, seasonId: 2017, scoringPeriodId: 11 });
  });

  test('cannot load Scoreboard without leagueId', async () => {
    expect.hasAssertions();

    try {
      await Scoreboard.read({ params: { seasonId } });
    } catch (error) {
      expect(error.message).toBe('Scoreboard: static read: cannot read without leagueId');
    }
  });

  test('cannot load Scoreboard without seasonId', async () => {
    expect.hasAssertions();

    try {
      await Scoreboard.read({ params: { leagueId } });
    } catch (error) {
      expect(error.message).toBe('Scoreboard: static read: cannot read without seasonId');
    }
  });

  test('cannot load Scoreboard without one of matchupPeriodId or scoringPeriodId', async () => {
    expect.hasAssertions();

    try {
      await Scoreboard.read({ params: { leagueId, seasonId } });
    } catch (error) {
      expect(error.message).toBe(
        'Scoreboard: static read: cannot read without one of matchupPeriodId or scoringPeriodId'
      );
    }
  });
});
