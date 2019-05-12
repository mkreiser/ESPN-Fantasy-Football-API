import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

/**
 * The base class for all project objects that can be cached. This class is extremely useful for
 * classes which have identifiers but cannot make API calls (e.g. Team, Player).
 *
 * Note: The id used for caching may be different than any id used by the response from the wire.
 * This allows for caching of an instance with the same id but different season data. Example:
 * League with different `seasonId`s can all be cached using this functionality. See the
 * `getCacheId` method for implementation.
 *
 * When managing the cache, never set an object to an `undefined` id. Always check that the result
 * from `getCacheId` is valid (see `_populateObject` for an example). Otherwise the cache will not
 * be in the correct state.
 *
 * @extends {BaseObject}
 */
class BaseCacheableObject extends BaseObject {
  static displayName = 'BaseCacheableObject';

  /**
   * Denotes which attribute the identifier of the object is defined on. In this project, this is
   * typically the object name appended by 'id' (e.g. 'leagueId', 'teamId').
   *
   * Note: When multiple ids or parameters are needed for `read`s, override the `read` method to
   * ensure all necessary parameters are passed. When multiple ids are needed for caching, override
   * the `getCacheId` method. In either of the previous cases, the class's `constructor` should be
   * overridden to accept these parameters.
   *
   * @type {String}
   */
  static idName = 'id';

  /**
   * Defers to `BaseObject._populateObject` and then caches the instance using the caching id from
   * `getCacheId`.
   * @override
   */
  static _populateObject({
    data, constructorParams, instance, isDataFromServer
  }) {
    const populatedInstance = super._populateObject({
      data, constructorParams, instance, isDataFromServer
    });

    if (isDataFromServer && populatedInstance.getCacheId()) {
      this.cache[populatedInstance.getCacheId()] = populatedInstance;
    }

    return populatedInstance;
  }

  /**
   * Returns all cached instances of an BaseCacheableObject. If no cache exists, a cache object is
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
   * Returns a cached instance matching the passed caching id if it exists. Otherwise, returns
   * undefined.
   * @param  {Number} id This id must match the form of the caching id provided by `getCacheId`.
   * @return {BaseCacheableObject|undefined}
   */
  static get(id) {
    return _.get(this.cache, id);
  }

  /**
   * Constructs and returns an id for the cache if possible from the passed params. If construction
   * is not possible, returns undefined.
   * @param  {Object} params
   * @return {string|undefined}
   */
  static getCacheId(params) {
    return _.get(params, this.idName);
  }

  /**
   * Gets the instance's id, using `static idName` to get the correct attribute.
   * @return {Number}
   */
  getId() {
    return _.get(this, this.constructor.idName);
  }

  /**
   * Gets the instance's id, using `static idName` to set the correct attribute.
   * @param {Number} id
   */
  setId(id) {
    _.set(this, this.constructor.idName, id);
  }

  /**
   * Returns the id used for caching. Important for classes that have multiple identifiers. Example:
   * League is identified by its `leagueId` and its `seasonId`. This method prevents separate
   * seasons from overriding each other's data.
   * @return {String}
   */
  getCacheId() {
    return this.constructor.getCacheId(this);
  }
}

export default BaseCacheableObject;
