import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

/**
 * The base class for all project objects that can be cached. This class is extremely useful for
 * classes which have identifiers but cannot make API calls (e.g. Team, Player).
 *
 * Note: The id used for caching may be different than any id used by the model over the wire. This
 * allows for caching of a model with the same id but different season data. Example: League with
 * different `seasonId`s can all be cached using this functionality. See the `getCacheId` method
 * for implementation.
 *
 * When managing the cache, never set an object to an `undefined` id. Always check that the result
 * from `getCacheId` is valid (see `_populateObject` for an example). Otherwise the cache will not
 * be in the correct state.
 *
 * @extends BaseObject
 */
class BaseCacheableObject extends BaseObject {
  static displayName = 'BaseCacheableObject';

  /**
   * Denotes which attribute the identifier of the model is defined on. In this project, this is
   * typically the model name appended by 'id' (e.g. 'leagueId', 'teamId').
   *
   * Note: When multiple ids or parameters are needed for `read`s, override the `read` method to
   * ensure all necessary parameters are passed. When multiple ids are needed for caching, override
   * the `getCacheId` method. In either of the previous cases, the class's `constructor` should be
   * overridden to accept these parameters.
   *
   * @type {string}
   */
  static idName = 'id';

  /**
   * Defers to `BaseObject._populateObject` and then caches the model using the caching id from
   * `getCacheId`.
   * @override
   */
  static _populateObject({ data, model, isDataFromServer }) {
    const populatedModel = super._populateObject({ data, model, isDataFromServer });

    if (isDataFromServer && populatedModel.getCacheId()) {
      this.cache[populatedModel.getCacheId()] = populatedModel;
    }

    return populatedModel;
  }

  /**
   * Returns all cached models of an BaseCacheableObject. If no cache exists, a cache object is
   * created. This implementation ensures each class has a unique cache of only instances of the
   * BaseCacheableObject that does not overlap with other BaseCacheableObject classes. The keys of
   * the cache should use the caching id implemented in `getCacheId`.
   * @return {object.<string, BaseCacheableObject>} The cache of BaseAPIObjects.
   */
  static get cache() {
    if (!this._cache) {
      this._cache = {};
    }

    return this._cache;
  }

  /**
   * Sets the cache object.
   * @param {object.<string, BaseCacheableObject>} cache
   */
  static set cache(cache) {
    this._cache = cache;
  }

  /**
   * Resets cache to an empty object.
   */
  static clearCache() {
    this._cache = {};
  }

  /**
   * Returns a cached model matching the passed caching id if it exists. Otherwise, returns
   * undefined.
   * @param  {number} id This id must match the form of the caching id provided by `getCacheId`.
   * @return {BaseCacheableObject|undefined}
   */
  static get(id) {
    return _.get(this.cache, id);
  }

  /**
   * Constructs and returns an id for the cache if possible from the passed params. If construction
   * is not possible, returns undefined.
   * @param  {object} params
   * @return {string|undefined}
   */
  static getCacheId(params) {
    return _.get(params, this.idName);
  }

  /**
   * Gets the instance's id, using `static idName` to get the correct attribute.
   * @return {number}
   */
  getId() {
    return _.get(this, this.constructor.idName);
  }

  /**
   * Gets the instance's id, using `static idName` to set the correct attribute.
   * @param {number} id
   */
  setId(id) {
    _.set(this, this.constructor.idName, id);
  }

  /**
   * Returns the id used for caching. Important for classes that have multiple identifiers. Example:
   * League is identified by its `leagueId` and its `seasonId`. This method prevents separate
   * seasons from overriding each other's data.
   * @return {string}
   */
  getCacheId() {
    return this.getId();
  }
}

export default BaseCacheableObject;
