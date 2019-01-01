import axios from 'axios';
import _ from 'lodash';

/**
 * The base class for all models.
 * @class
 */
class ApiModel {
  /**
   * @param {object} options Properties to be assigned to the ApiModel. Must match the keys of the
   *                         ApiModel's `responseMap` or valid options defined by the subclass's
   *                         `constructor`.
   */
  constructor(options = {}) {
    this.constructor._populateApiModel({
      data: options,
      model: this,
      isDataFromServer: false
    });
  }

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
   * Helper method for `_populateApiModel` that houses the attribute mapping logic. Should not be
   * used by other methods.
   * @private
   * @param  {object} options.data
   * @param  {ApiModel} options.model The model to populate. This model will be mutated.
   * @param  {boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally (typically from another ApiModel).
   * @param  {string} options.key The key of the responseMap entry being parsed.
   * @param  {string} options.value The value of the responseMap entry being parsed.
   * @return {ApiModel} The mutated ApiModel model.
   */
  static _processResponseMapItem({ data, model, isDataFromServer, key, value }) {
    /**
     * @typedef {object} ResponseMapValueObject
     *
     * The `responseMap` can have two values: a string or a ResponseMapValueObject. When string, the
     * data found on that response is directly mapped to the ApiModel without mutation. When
     * ResponseMapValueObject, the data at the `key` will be used to create ApiModel(s) or manually
     * parsed with a provided `manualParse function`. Either result is attached to the ApiModel
     * being populated.
     * @property {string} key The key on the response data where the data can be found. This must be
     *                        defined.
     * @property {ApiModel} ApiModel The ApiModel to create with the response data.
     * @property {boolean} isArray Whether or not the response data is an array. Useful for
     *                             attributes such as "teams".
     * @property {boolean} defer Whether or not to wait to parse the entry until a second pass of
     *                           the map. This is useful for populating items with cached models
     *                           that are not guaranteed to be parsed/cached during initial parsing.
     *                           Example: Using Team instances on League.
     * @property {function} manualParse A function to manually apply logic to the response. This
     *                                  function must return its result to be attached to the
     *                                  populated ApiModel. The arguments to this function are:
     *                                  (data at the key), (the whole response),
     *                                  (the model being populated).
     * @example
     * static responseMap = {
     *   teamId: 'teamId',
     *   team: {
     *     key: 'team_on_response',
     *     ApiModel: true
     *   },
     *   teams: {
     *     key: 'teams_on_response',
     *     ApiModel: Team,
     *     isArray: true
     *   },
     *   manualTeams: {
     *     key: 'manual_teams_on_response',
     *     ApiModel: Team,
     *     manualParse: (keyData, allData, populatingModel) => Team.buildFromServer(keyData)
     *   }
     * };
     *
     */
    let item;

    if (!isDataFromServer) {
      item = _.get(data, key);
    } else if (_.isString(value)) {
      item = _.get(data, value);
    } else if (_.isPlainObject(value)) {
      if (!value.key) {
        throw new Error(
          `${this.displayName}: _populateApiModel: Invalid responseMap object. Object must ` +
          'define key. See docs for typedef of ResponseMapValueObject.'
        );
      }

      const responseData = _.get(data, value.key);
      if (_.isFunction(value.manualParse)) {
        item = value.manualParse(responseData, data, model);
      } else if (value.ApiModel) {
        const ValueApiModelClass = value.ApiModel;

        const buildModel = (passedData) => ValueApiModelClass.buildFromServer(passedData);
        item = value.isArray ? _.map(responseData, buildModel) : buildModel(responseData);
      } else {
        throw new Error(
          `${this.displayName}: _populateApiModel: Invalid responseMap object. Object must ` +
          'define `ApiModel` or `manualParse`. See docs for typedef of ResponseMapValueObject.'
        );
      }
    } else {
      throw new Error(
        `${this.displayName}: _populateApiModel: Did not recognize responseMap value type for ` +
        `key ${key}`
      );
    }

    if (!_.isUndefined(item)) {
      _.set(model, key, item);
    }
  }

  /**
   * Returns the passed instance of the ApiModel populated with the passed data, mapping the
   * attributes defined in the value of responseMap to the matching key.
   * @private
   * @param  {object} options.data
   * @param  {ApiModel} options.model The model to populate. This model will be mutated.
   * @param  {boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally (typically from another ApiModel).
   * @return {ApiModel} The mutated ApiModel model.
   */
  static _populateApiModel({ data, model, isDataFromServer }) {
    if (!model) {
      throw new Error(`${this.displayName}: _populateApiModel: Did not receive model to populate`);
    } else if (_.isEmpty(data)) {
      return model;
    }

    const deferredMapItems = {};
    _.forEach(this.responseMap, (value, key) => {
      if (_.isPlainObject(value) && value.defer) {
        _.set(deferredMapItems, key, value);
      } else {
        this._processResponseMapItem({ data, model, isDataFromServer, key, value });
      }
    });

    _.forEach(deferredMapItems, (value, key) => {
      this._processResponseMapItem({ data, model, isDataFromServer, key, value });
    });

    if (isDataFromServer) {
      this.cache[model.getId()] = model;
    }

    return model;
  }

  /**
   * Returns a new instance of an ApiModel populated with passed data.
   * @private
   * @param  {object} options.data
   * @param  {object} options.constructorParams Params to be passed to the instance's constructor.
   *                                            Useful for passing parent data, such as `leagueId`.
   * @param  {boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally (typically from another ApiModel).
   * @return {ApiModel} The mutated ApiModel model.
   */
  static _buildNewApiModel({ data, constructorParams, isDataFromServer }) {
    const model = new this(constructorParams);
    this._populateApiModel({ data, model, isDataFromServer });
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
    return this._buildNewApiModel({ data, constructorParams, isDataFromServer: true });
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
    return this._buildNewApiModel({ data, constructorParams, isDataFromServer: false });
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
   * Resets cache to an empty object
   */
  static clearCache() {
    this._cache = {};
  }

  /**
   * Returns a cached model matching the passed id if it exists. Otherwise, undefined.
   * @param  {number} id
   * @return {ApiModel|undefined}
   */
  static get(id) {
    return _.get(this.cache, id);
  }

  /**
   * Makes a call to the passed route with the passed params. If reload is true, then any matching
   * cached model is ignored and overridden on successful read. If reload is false and a matching
   * model is found in the cache, the cached model is returned in an immediately resolving promise.
   * If reload is false but no cached model is found, the request will be made to load the model for
   * the first time.
   * @async
   * @throws {Error} If route is not passed
   * @param  {ApiModel} options.model The model to populate rather than creating a new instance.
   * @param  {string} options.route   The route on the API to call.
   * @param  {Object} options.params  Params to pass on the GET call.
   * @param  {boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise}
   */
  static read(
    { model, route = this.route, params, reload = true } = { route: this.route, reload: true }
  ) {
    if (!route) {
      throw new Error(`${this.displayName}: static read: cannot read without route`);
    }

    const id = _.get(params, this.idName) || _.get(model, this.idName);
    if (id && !reload && _.get(this.cache, id)) {
      return Promise.resolve(_.get(this.cache, id));
    }

    return axios.get(route, { params }).then((response) => {
      return model ? this._populateApiModel({
        data: response.data,
        model,
        isDataFromServer: true
      }) : this.buildFromServer(response.data);
    });
  }

  /**
   * Makes a call to the passed route with the passed params. Defers actual GET call to
   * `static read` Automatically includes the id of the instance in the params. On successful read,
   * populates the instance with the new response data.
   * @async
   * @throws {Error} If route is not passed
   * @param  {string} options.route   The route on the API to call.
   * @param  {Object} options.params  Params to pass on the GET call.
   * @param  {boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise}
   */
  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    const id = this.getId();
    if (!id) {
      throw new Error(
        `${this.constructor.displayName}: static read: cannot read on instance without an id`
      );
    }

    const paramsWithId = _.assign({}, params, { [this.constructor.idName]: id });
    return this.constructor.read({
      route,
      model: this,
      params: paramsWithId,
      reload
    });
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
}

export default ApiModel;
