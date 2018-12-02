import axios from 'axios';
import _ from 'lodash';

/**
 * The base class for all models.
 * @class
 */
class ApiModel {
  /**
   * The class name. Minification will break `this.constructor.name`, so this allows for verbose
   * printing even in minified code.
   * @type {String}
   */
  static displayName = 'ApiModel';

  /**
   * Denotes which attribute the ID of the model is defined on. This is typically the model name
   * appended by 'Id' (e.g. 'leagueId', 'teamId').
   * @type {String}
   */
  static idName = 'id';

  /**
   * @private
   */
  static _buildApiModel({ data, constructorParams, isDataFromServer }) {
    const model = new this(constructorParams);

    _.forEach(this.responseMap, (value, key) => {
      const item = _.get(data, isDataFromServer ? value : key);
      _.set(model, key, item);
    });

    return model;
  }

  /**
   * Returns a new instance of the ApiModel populated with the passed data that came from ESPN,
   * mapping the attributes defined in the value of responseMap to the matching key. Use this method
   * when constructing ApiModels with responses.
   * @param  {object} data Data originating from the server.
   * @param  {object} constructorParams Params to be passed to the instance's constructor. Useful
   *                                    for passing parent data, such as `leagueId`.
   * @return {ApiModel} A new instance of the ApiModel populated with the passed data.
   */
  static buildFromServer(data, constructorParams) {
    return this._buildApiModel({ data, constructorParams, isDataFromServer: true });
  }

  /**
   * Returns a new instance of the ApiModel populated with the passed data that originated locally.
   * Passed data attributes are excepted to be matching the keys of the responseMap. Use this method
   * when constructing ApiModels with local data.
   * @param  {object} data Data originating locally.
   * @param  {object} constructorParams Params to be passed to the instance's constructor. Useful
   *                                    for passing parent data, such as `leagueId`.
   * @return {ApiModel} A new instance of the ApiModel populated with the passed data.
   */
  static buildFromLocal(data, constructorParams) {
    return this._buildApiModel({ data, constructorParams, isDataFromServer: false });
  }

  /**
   * Returns all cached models of an ApiModel. If no cache exists, a cache object is created. This
   * implementation ensures each class has a unique cache of only instances of the ApiModel that
   * does not overlap with other ApiModel classes.
   * @return {object} All cached models of the ApiModel type.
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
   * Makes a call to the passed route with the passed params.
   * @async
   * @throws {Error} If route is not passed
   * @param  {string} options.route
   * @param  {Object} options.params Params to pass on the GET call.
   * @return {Promise}
   */
  static read({ route, params } = {}) {
    if (!route) {
      throw new Error(`${this.displayName}: static read: cannot read without route`);
    }

    return axios.get(route, params);
  }

  /**
   * Makes a call to the passed route with the passed params. Defers actual GET call to
   * `static read` Automatically includes the id of the instance in the params.
   * @async
   * @throws {Error} If route is not passed
   * @param  {string} options.route
   * @param  {Object} options.params Params to pass on the GET call.
   * @return {Promise}
   */
  read({ route, params } = {}) {
    const paramsWithId = _.assign({}, params, { [this.constructor.idName]: this.getId() });

    return this.constructor.read({
      route,
      params: paramsWithId
    });
  }

  /**
   * Gets the instance's id, using `static idName` to set the correct attribute.
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
}

export default ApiModel;
