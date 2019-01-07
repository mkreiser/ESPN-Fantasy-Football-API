import _ from 'lodash';

import { Roster } from '../index.js';

describe('Roster functionality', () => {
  let leagueId, scoringPeriodId, seasonId, teamId;

  beforeEach(() => {
    leagueId = 336358;
    scoringPeriodId = 4;
    seasonId = 2017;
    teamId = 9;

    Roster.clearCache();
  });

  afterEach(() => {
    leagueId = scoringPeriodId = seasonId = teamId = null;

    Roster.clearCache();
  });

  const testClassAndInstance = (params) => {
    test('from class', async () => {
      const roster = await Roster.read({ params });
      expect(roster).toMatchSnapshot();
    });

    test('from instance', async () => {
      const instance = new Roster(params);
      const roster = await instance.read();
      expect(roster).toMatchSnapshot();
    });
  };

  describe('can load Scoreboard with scoringPeriodId', () => {
    testClassAndInstance({ leagueId: 336358, seasonId: 2017, teamId: 9, scoringPeriodId: 11 });
  });

  describe('can load Scoreboard without scoringPeriodId', () => {
    testClassAndInstance({ leagueId: 336358, seasonId: 2017, teamId: 9 });
  });

  test('cannot load Roster without leagueId', async () => {
    expect.hasAssertions();

    try {
      await Roster.read({ params: { seasonId } });
    } catch (error) {
      expect(error.message).toBe('Roster: static read: cannot read without leagueId');
    }
  });

  test('cannot load Roster without seasonId', async () => {
    expect.hasAssertions();

    try {
      await Roster.read({ params: { leagueId } });
    } catch (error) {
      expect(error.message).toBe('Roster: static read: cannot read without seasonId');
    }
  });

  test('cannot load Roster without teamId', async () => {
    expect.hasAssertions();

    try {
      await Roster.read({ params: { leagueId, seasonId } });
    } catch (error) {
      expect(error.message).toBe('Roster: static read: cannot read without teamId');
    }
  });

  test('overrides a matching cached Roster on reload', async () => {
    const originalModel = await Roster.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }
    });
    const cachedModel = await Roster.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }
    });

    expect(originalModel).not.toBe(cachedModel);
  });

  test('uses a cached Roster on non-reloads when there is a matched cached Roster', async () => {
    const originalModel = await Roster.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }
    });
    const cachedModel = await Roster.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }, reload: false
    });

    expect(originalModel).toBe(cachedModel);
  });

  test('loads Roster on non-reloads when there is not a cached Roster', async () => {
    const leagueModel = await Roster.read({
      params: { leagueId, seasonId, teamId, scoringPeriodId }, reload: false
    });
    expect(leagueModel).toMatchSnapshot();
  });
});
