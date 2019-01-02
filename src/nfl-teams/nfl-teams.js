import _ from 'lodash';

import { nflTeamIdToNFLTeam, nflTeamIdToNFLTeamAbbreviation } from '../constants.js';

/**
 * Represents a NFL team, mapping from an id to name and abbreviation.
 */
class NFLTeam {
  constructor(options) {
    this.id = options.id;

    this.name = _.get(nflTeamIdToNFLTeam, this.id);

    this.abbreviation = _.get(nflTeamIdToNFLTeamAbbreviation, this.id);
  }
}

// Seed teams in cache.
const nflTeams = {};
_.forEach(nflTeamIdToNFLTeam, (value, key) => {
  if (key !== '-1') {
    _.set(nflTeams, key, new NFLTeam({ id: key }));
  }
});

export default nflTeams;
