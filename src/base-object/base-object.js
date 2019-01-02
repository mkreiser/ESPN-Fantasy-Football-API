import _ from 'lodash';

/**
 * The base class for all project objects. Provides data mapping functionality.
 * @class
 */
class BaseObject {
  /**
   * @param {object} options Properties to be assigned to the BaseObject. Must match the keys of the
   *                         BaseObject's `responseMap` or valid options defined by the subclass's
   *                         `constructor`.
   */
  constructor(options = {}) {
    if (!_.isEmpty(options)) {
      this.constructor._populateObject({
        data: options,
        model: this,
        isDataFromServer: false
      });
    }
  }

  /**
   * The class name. Minification will break `this.constructor.name`, so this allows for verbose
   * printing even in minified code.
   * @type {String}
   */
  static displayName = 'BaseObject';

  /**
   * Helper method for `_populateObject` that houses the attribute mapping logic. Should not be used
   * by other methods.
   * @private
   * @param  {object} options.data
   * @param  {BaseObject} options.model The model to populate. This model will be mutated.
   * @param  {boolean} options.isDataFromServer When true, the data came from the ESPN API over the
   *                                            wire. When false, the data came locally.
   * @param  {string} options.key The key of the responseMap entry being parsed.
   * @param  {string} options.value The value of the responseMap entry being parsed.
   */
  static _processResponseMapItem({ data, model, isDataFromServer, key, value }) {
    /**
     * @typedef {object} ResponseMapValueObject
     *
     * The `responseMap` can have two values: a string or a ResponseMapValueObject. When string, the
     * data found on that response is directly mapped to the BaseObject without mutation. When
     * ResponseMapValueObject, the data at the `key` will be used to create BaseObject(s) or
     * manually parsed with a provided `manualParse function`. Either result is attached to the
     * BaseObject being populated.
     * @property {string} key The key on the response data where the data can be found. This must be
     *                        defined.
     * @property {BaseObject} BaseObject The BaseObject to create with the response data.
     * @property {boolean} isArray Whether or not the response data is an array. Useful for
     *                             attributes such as "teams".
     * @property {boolean} defer Whether or not to wait to parse the entry until a second pass of
     *                           the map. This is useful for populating items with cached models
     *                           that are not guaranteed to be parsed/cached during initial parsing.
     *                           Example: Using Team instances on League.
     * @property {function} manualParse A function to manually apply logic to the response. This
     *                                  function must return its result to be attached to the
     *                                  populated BaseObject. The arguments to this function are:
     *                                  (data at the key), (the whole response), (the model being
     *                                  populated).
     * @example
     * static responseMap = {
     *   teamId: 'teamId',
     *   team: {
     *     key: 'team_on_response',
     *     BaseObject: true
     *   },
     *   teams: {
     *     key: 'teams_on_response',
     *     BaseObject: Team,
     *     isArray: true
     *   },
     *   manualTeams: {
     *     key: 'manual_teams_on_response',
     *     BaseObject: Team,
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
          `${this.displayName}: _populateObject: Invalid responseMap object. Object must define ` +
          'key. See docs for typedef of ResponseMapValueObject.'
        );
      }

      const responseData = _.get(data, value.key);
      if (_.isFunction(value.manualParse)) {
        item = value.manualParse(responseData, data, model);
      } else if (value.BaseObject) {
        const ValueBaseObjectClass = value.BaseObject;

        const buildModel = (passedData) => ValueBaseObjectClass.buildFromServer(passedData);
        const builtItem = (
          value.isArray ? _.map(responseData, buildModel) : buildModel(responseData)
        );

        if (builtItem && !_.isEmpty(builtItem)) {
          item = builtItem;
        }
      } else {
        throw new Error(
          `${this.displayName}: _populateObject: Invalid responseMap object. Object must define ` +
          '`BaseObject` or `manualParse`. See docs for typedef of ResponseMapValueObject.'
        );
      }
    } else {
      throw new Error(
        `${this.displayName}: _populateObject: Did not recognize responseMap value type for key ` +
        `${key}`
      );
    }

    if (!_.isUndefined(item)) {
      _.set(model, key, item);
    }
  }

  /**
   * Returns the passed instance of the BaseObject populated with the passed data, mapping the
   * attributes defined in the value of responseMap to the matching key.
   * @private
   * @param  {object} options.data
   * @param  {BaseObject} options.model The model to populate. This model will be mutated.
   * @param  {boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally.
   * @return {BaseObject} The mutated BaseObject model.
   */
  static _populateObject({ data, model, isDataFromServer }) {
    if (!model) {
      throw new Error(`${this.displayName}: _populateObject: Did not receive model to populate`);
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

    // if (isDataFromServer) {
    //   this.cache[model.getId()] = model;
    // }

    return model;
  }

  /**
   * Returns a new instance of the BaseObject populated with the passed data that came from ESPN,
   * mapping the attributes defined in the value of responseMap to the matching key. Use this method
   * when constructing BaseObjects with responses.
   * @param  {object} data Data originating from the server.
   * @param  {object} constructorParams Params to be passed to the instance's constructor. Useful
   *                                    for passing parent data, such as `leagueId`.
   * @return {BaseObject} A new instance of the BaseObject populated with the passed data.
   */
  static buildFromServer(data, constructorParams) {
    const model = new this(constructorParams);
    this._populateObject({ data, model, isDataFromServer: true });
    return model;
  }
}

export default BaseObject;
