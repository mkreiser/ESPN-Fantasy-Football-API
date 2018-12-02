import axios from 'axios';
import _ from 'lodash';

/**
 * The base class for all models.
 * @class
 */
class ApiModel {
  /**
   * Denotes which attribute the ID of the model is defined on. This is typically the model name
   * appended by 'Id' (e.g. 'leagueId', 'teamId').
   * @type {String}
   */
  static idName = 'id';

  static _buildApiModel({ data, isDataFromServer }) {
    const model = new this();

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
   * @param  {*} data Data originating from the server.
   * @return {ApiModel} A new instance of the ApiModel populated with the passed data.
   */
  static buildFromServer(data) {
    return this._buildApiModel({ data, isDataFromServer: true });
  }

  /**
   * Returns a new instance of the ApiModel populated with the passed data that originated locally.
   * Passed data attributes are excepted to be matching the keys of the responseMap. Use this method
   * when constructing ApiModels with local data.
   * @param  {*} data Data originating locally.
   * @return {ApiModel} A new instance of the ApiModel populated with the passed data.
   */
  static buildFromLocal(data) {
    return this._buildApiModel({ data, isDataFromServer: false });
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

  // TODO: error hanlding when route is undefined
  static read({ route, params } = {}) {
    return axios.get(route, params);
  }

  // TODO: error hanlding when route is undefined
  read({ route, params } = {}) {
    const paramsWithId = _.assign({}, params, { [this.constructor.idName]: this.id });

    return this.constructor.read({
      route,
      params: paramsWithId
    });
  }
}

export default ApiModel;
