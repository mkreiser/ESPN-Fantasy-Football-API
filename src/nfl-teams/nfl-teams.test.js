import _ from 'lodash';

import nflTeams from './nfl-teams.js';

import { nflTeamIdToNFLTeam, nflTeamIdToNFLTeamAbbreviation } from '../constants.js';

describe('nflTeams', () => {
  test('seeds each team', () => {
    expect.hasAssertions();
    _.forEach(nflTeams, (team, key) => {
      expect(team.id).toBe(key);
      expect(team.name).toBe(_.get(nflTeamIdToNFLTeam, key));
      expect(team.abbreviation).toBe(_.get(nflTeamIdToNFLTeamAbbreviation, key));
    });
  });

  test('does not seed bye week team', () => {
    expect(_.get(nflTeams, -1)).toBeUndefined();
  });
});
