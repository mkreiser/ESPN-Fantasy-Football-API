import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';

import NFLTeam from './nfl-team.js';

import { nflTeamIdToNFLTeam, nflTeamIdToNFLTeamAbbreviation } from '../constants.js';

describe('NFLTeam', () => {
  let nflTeam;

  beforeEach(() => {
    nflTeam = new NFLTeam();
  });

  afterEach(() => {
    nflTeam = null;
  });

  test('does not extend ApiModel', () => {
    expect(nflTeam).not.toBeInstanceOf(ApiModel);
  });

  test('seeds NFL teams in cache', () => {
    expect(NFLTeam.get('-1')).toBeUndefined();
    _.forEach(nflTeamIdToNFLTeam, (value, key) => {
      if (key !== '-1') {
        const cachedTeam = NFLTeam.get(key);
        expect(cachedTeam).toBeInstanceOf(NFLTeam);
      }
    });
  });

  describe('constructor', () => {
    test('sets instance in the cache', () => {
      const id = 123123;
      const newTeam = new NFLTeam({ id });
      expect(NFLTeam.get(id)).toBe(newTeam);
    });

    describe('id', () => {
      test('maps id from passed options', () => {
        const id = 7;

        const newTeam = new NFLTeam({ id });
        expect(newTeam.id).toBe(id);
      });
    });

    describe('name', () => {
      describe('when a matching NFL team is found in the map', () => {
        test('sets name to the matching team name', () => {
          const id = 1;

          const newTeam = new NFLTeam({ id });
          expect(newTeam.name).toBe(_.get(nflTeamIdToNFLTeam, id));
        });
      });

      describe('when a matching NFL team is not found in the map', () => {
        test('sets name to undefined', () => {
          const id = 1237812;

          const newTeam = new NFLTeam({ id });
          expect(newTeam.name).toBeUndefined();
        });
      });
    });

    describe('abbreviation', () => {
      describe('when a matching NFL team is found in the map', () => {
        test('sets abbreviation to the matching team abbreviation', () => {
          const id = 1;

          const newTeam = new NFLTeam({ id });
          expect(newTeam.abbreviation).toBe(_.get(nflTeamIdToNFLTeamAbbreviation, id));
        });
      });

      describe('when a matching NFL team is not found in the map', () => {
        test('sets abbreviation to undefined', () => {
          const id = 1237812;

          const newTeam = new NFLTeam({ id });
          expect(newTeam.abbreviation).toBeUndefined();
        });
      });
    });
  });

  describe('class methods', () => {
    describe('get cache', () => {
      describe('when _cache is not set', () => {
        beforeEach(() => {
          NFLTeam._cache = undefined;
        });

        test('sets _cache to an empty object', () => {
          NFLTeam.cache;
          expect(NFLTeam._cache).toEqual({});
        });

        test('returns empty object', () => {
          expect(NFLTeam.cache).toEqual({});
        });
      });

      describe('when _cache is set', () => {
        test('does not mutate _cache', () => {
          const cache = { some: 'cache' };
          NFLTeam._cache = cache;

          NFLTeam.cache;
          expect(NFLTeam._cache).toBe(cache);
        });

        test('returns _cache', () => {
          const cache = { some: 'cache' };

          NFLTeam._cache = cache;
          expect(NFLTeam.cache).toBe(cache);
        });
      });
    });

    describe('set cache', () => {
      beforeEach(() => {
        NFLTeam._cache = undefined;
      });

      test('sets _cache', () => {
        const cache = { some: 'cache' };

        NFLTeam.cache = cache;
        expect(NFLTeam._cache).toBe(cache);
      });
    });

    describe('clearCache', () => {
      test('sets cache to empty object', () => {
        NFLTeam.cache = { some: 'cached items' };

        NFLTeam.clearCache();
        expect(NFLTeam.cache).toEqual({});
      });
    });

    describe('get', () => {
      describe('when there is a model with a matching id', () => {
        test('returns the model', () => {
          const id = 12;
          const model = new NFLTeam({ id });
          NFLTeam.cache[id] = model;

          const cachedModel = NFLTeam.get(id);
          expect(cachedModel).toBe(model);

          NFLTeam.clearCache();
        });
      });

      describe('when there is not a model with a matching id', () => {
        test('returns undefined', () => {
          const id = 12;
          const model = new NFLTeam({ id: id + 1 });
          NFLTeam.cache[id] = undefined;
          NFLTeam.cache[id + 1] = model;

          const cachedModel = NFLTeam.get(id);
          expect(cachedModel).toBeUndefined();

          NFLTeam.clearCache();
        });
      });
    });
  });
});
