import _ from 'lodash';

import { League } from '../index.js';

describe('League functionality', () => {
  let leagueId, seasonId;

  beforeEach(() => {
    leagueId = 336358;
    seasonId = 2017;

    League.clearCache();
  });

  afterEach(() => {
    leagueId = seasonId = null;

    League.clearCache();
  });

  test('can load League from class', async () => {
    const leagueModel = await League.read({ params: { leagueId, seasonId } });
    expect(leagueModel).toMatchSnapshot();
  });

  test('can load League from an instance', async () => {
    const leagueInstance = new League({ leagueId, seasonId });

    const leagueModel = await leagueInstance.read();
    expect(leagueModel).toMatchSnapshot();
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
    const leagueModel = await League.read({ params: { leagueId } });

    // Since this test is season/time dependent, this prevents failing snapshots when the season
    // changes.
    expect(leagueModel.leagueId).toBe(leagueId);
    _.forEach(League.responseMap, (value, key) => {
      expect(_.get(leagueModel, key)).not.toBeUndefined();
    });
  });

  test('overrides a matching cached League on reload', async () => {
    const originalModel = await League.read({ params: { leagueId, seasonId } });
    const cachedModel = await League.read({ params: { leagueId, seasonId } });

    expect(originalModel).not.toBe(cachedModel);
  });

  test('uses a cached League on non-reloads when there is a matched cached League', async () => {
    const originalModel = await League.read({ params: { leagueId, seasonId } });
    const cachedModel = await League.read({ params: { leagueId, seasonId }, reload: false });

    expect(originalModel).toBe(cachedModel);
  });

  test('loads League on non-reloads when there is not a cached League', async () => {
    const leagueModel = await League.read({ params: { leagueId, seasonId }, reload: false });
    expect(leagueModel).toMatchSnapshot();
  });

  test('can use Team object equality between attributes', async () => {
    const leagueModel = await League.read({ params: { leagueId, seasonId } });

    const teamId = 9;

    const teamInstance = _.find(leagueModel.teams, { teamId });
    const draftOrderInstance = _.find(leagueModel.draftOrder, { teamId });
    const playoffSeedInstance = _.find(leagueModel.playoffSeedOrder, { teamId });
    const rankingInstance = _.find(leagueModel.finalRankings, { teamId });

    expect(teamInstance).toBe(draftOrderInstance);
    expect(draftOrderInstance).toBe(playoffSeedInstance);
    expect(playoffSeedInstance).toBe(rankingInstance);
  });
});
