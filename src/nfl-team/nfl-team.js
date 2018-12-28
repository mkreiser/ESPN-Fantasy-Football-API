import _ from 'lodash';

import { nflTeamIdToNFLTeam, nflTeamIdToNFLTeamAbbreviation } from '../constants.js';

/**
 * Represents a NFL team, mapping from an id to name and abbreviation.
 */
class NFLTeam {
  constructor(options = {}) {
    this.id = options.id;

    this.name = _.get(nflTeamIdToNFLTeam, this.id);

    this.abbreviation = _.get(nflTeamIdToNFLTeamAbbreviation, this.id);

    this.constructor.cache[this.id] = this;
  }

  /**
   * Returns all cached models of a NFLTeam. If no cache exists, a cache object is created. This
   * implementation ensures each class has a unique cache of only instances of NFLTeam.
   * @return {object} All cached NFLTeams.
   */
  static get cache() {
    if (!this._cache) {
      this._cache = {};
    }

    return this._cache;
  }

  /**
   * Sets the cache object.
   * @param  {object} cache
   */
  static set cache(cache) {
    this._cache = cache;
  }

  /**
   * Resets cache to an empty object
   */
  static clearCache() {
    this._cache = {};
  }

  /**
   * Returns a cached NFLTeam.
   * @param  {number} id Id of the cached NFLTeam to find.
   * @return {NFLTeam|undefined} The cached team if found. Otherwise, undefined.
   */
  static get(id) {
    return _.get(this.cache, id);
  }
}

// Seed teams in cache.
_.forEach(nflTeamIdToNFLTeam, (value, key) => {
  if (key !== '-1') {
    new NFLTeam({ id: key }); // eslint-disable-line no-new
  }
});

export default NFLTeam;
