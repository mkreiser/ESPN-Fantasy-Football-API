import _ from 'lodash';

import { League } from '../index.js';

describe('League functionality', () => {
  let leagueId;
  let seasonId;

  beforeEach(() => {
    leagueId = 336358;
    seasonId = 2017;

    League.clearCache();
  });

  afterEach(() => {
    leagueId = null;
    seasonId = null;

    League.clearCache();
  });

  test('can load League from class', async () => {
    const league = await League.read({ params: { leagueId, seasonId } });
    expect(league).toMatchSnapshot();
  });

  test('can load League from an instance', async () => {
    const leagueInstance = new League({ leagueId, seasonId });

    const league = await leagueInstance.read();
    expect(league).toMatchSnapshot();
  });

  test('cannot load League without leagueId', async () => {
    expect.hasAssertions();

    try {
      await League.read({ params: { seasonId } });
    } catch (error) {
      expect(error.message).toBe('League: static read: cannot read without leagueId');
    }
  });

  test('can load League without seasonId', async () => {
    const league = await League.read({ params: { leagueId } });

    // Since this test is season/time dependent, this prevents failing snapshots when the season
    // changes.
    expect(league.leagueId).toBe(leagueId);
    _.forEach(League.responseMap, (value, key) => {
      expect(_.get(league, key)).not.toBeUndefined();
    });
  });

  test('overrides a matching cached League on reload', async () => {
    const originalLeague = await League.read({ params: { leagueId, seasonId } });
    const cachedLeague = await League.read({ params: { leagueId, seasonId } });

    expect(originalLeague).not.toBe(cachedLeague);
  });

  test('uses a cached League on non-reloads when there is a matched cached League', async () => {
    const originalLeague = await League.read({ params: { leagueId, seasonId } });
    const cachedLeague = await League.read({ params: { leagueId, seasonId }, reload: false });

    expect(originalLeague).toBe(cachedLeague);
  });

  test('loads League on non-reloads when there is not a cached League', async () => {
    const league = await League.read({ params: { leagueId, seasonId }, reload: false });
    expect(league).toMatchSnapshot();
  });

  test('can use Team object equality between attributes', async () => {
    const league = await League.read({ params: { leagueId, seasonId } });

    const teamId = 9;

    const teamInstance = _.find(league.teams, { teamId });
    const draftOrderInstance = _.find(league.draftOrder, { teamId });
    const playoffSeedInstance = _.find(league.playoffSeedOrder, { teamId });
    const rankingInstance = _.find(league.finalRankings, { teamId });

    expect(teamInstance).toBe(draftOrderInstance);
    expect(draftOrderInstance).toBe(playoffSeedInstance);
    expect(playoffSeedInstance).toBe(rankingInstance);
  });
});
