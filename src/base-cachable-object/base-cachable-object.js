import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

/**
 * The base class for all project objects that can be cached.
 * @extends BaseObject
 */
class BaseCachableObject extends BaseObject {
  static displayName = 'BaseCachableObject';

  /**
   * Denotes which attribute the ID of the model is defined on. This is typically the model name
   * appended by 'Id' (e.g. 'leagueId', 'teamId').
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
   * Defers to `BaseObject._populateObject` and then caches the model.
   * @private
   * @param  {object} options.data
   * @param  {BaseObject} options.model The model to populate. This model will be mutated.
   * @param  {boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally.
   * @return {BaseObject} The mutated BaseObject model.
   */
  static _populateObject({ data, model, isDataFromServer }) {
    const populatedModel = super._populateObject({ data, model, isDataFromServer });

    if (isDataFromServer && populatedModel.getCacheId()) {
      this.cache[populatedModel.getCacheId()] = populatedModel;
    }

    return populatedModel;
  }

  /**
   * Returns all cached models of an BaseCachableObject. If no cache exists, a cache object is
   * created. This implementation ensures each class has a unique cache of only instances of the
   * BaseCachableObject that does not overlap with other BaseCachableObject classes.
   * @return {object.<string, BaseCachableObject>} The cache of BaseAPIObjects.
   */
  static get cache() {
    if (!this._cache) {
      this._cache = {};
    }

    return this._cache;
  }

  /**
   * Sets the cache object.
   * @param {object.<string, BaseCachableObject>} cache
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
   * Returns a cached model matching the passed id if it exists. Otherwise, undefined.
   * @param  {number} id This id must match the format of the return of `getCacheId`.
   * @return {BaseCachableObject|undefined}
   */
  static get(id) {
    return _.get(this.cache, id);
  }

  /**
   * Constructs an id for the cache if possible from the passed params.
   * @param  {object} params
   * @return {string}
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

export default BaseCachableObject;
