import _ from 'lodash';

import { flattenObject } from '../../utils.js';

/**
 * The base class for all project objects. Provides data mapping functionality.
 */
class BaseObject {
  /**
   * @param {Object} options Properties to be assigned to the BaseObject. Must match the keys of the
   *                         BaseObject's `responseMap` or valid options defined by the class's
   *                         `constructor`.
   */
  constructor(options = {}) {
    if (!_.isEmpty(options)) {
      this.constructor._populateObject({
        data: options,
        instance: this,
        isDataFromServer: false
      });
    }
  }

  /**
   * The class name. Minification will break `this.constructor.name`; this allows for readable
   * logging even in minified code.
   * @type {String}
   */
  static displayName = 'BaseObject';

  /**
   * Helper for processing items on `responseMap`s that are objects.
   * @private
   *
   * @param  {Object} options.data
   * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
   * @param  {Object} options.constructorParams Params to be passed to the instance's constructor.
   *                                            Useful for passing parent data, such as `leagueId`.
   * @param  {String} options.value The value of the responseMap entry being parsed.
   * @return {*}
   */
  static _processObjectValue({
    data, constructorParams, instance, value
  }) {
    if (!value.key) {
      throw new Error(
        `${this.displayName}: _populateObject: Invalid responseMap object. Object must define ` +
        'key. See docs for typedef of ResponseMapValueObject.'
      );
    }

    const responseData = _.get(data, value.key);
    if (_.isFunction(value.manualParse)) {
      return value.manualParse(responseData, data, constructorParams, instance);
    } else if (value.BaseObject) {
      const buildInstance = (passedData) => (
        value.BaseObject.buildFromServer(passedData, constructorParams)
      );

      return value.isArray ? _.map(responseData, buildInstance) : buildInstance(responseData);
    }

    throw new Error(
      `${this.displayName}: _populateObject: Invalid responseMap object. Object must define ` +
      '`BaseObject` or `manualParse`. See docs for typedef of ResponseMapValueObject.'
    );
  }

  /**
   * Helper method for `_populateObject` that houses the attribute mapping logic. Should never be
   * used by other methods. See {@link ResponseMapValueObject} for `responseMap` documentation.
   * @private
   *
   * @param  {Object} options.data
   * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
   * @param  {Object} options.constructorParams Params to be passed to the instance's constructor.
   *                                            Useful for passing parent data, such as `leagueId`.
   * @param  {Boolean} options.isDataFromServer When true, the data came from the ESPN API over the
   *                                            wire. When false, the data came locally.
   * @param  {String} options.key The key of the responseMap entry being parsed.
   * @param  {String} options.value The value of the responseMap entry being parsed.
   */
  static _processResponseMapItem({
    data, constructorParams, instance, isDataFromServer, key, value
  }) {
    /**
     * @typedef {Object} BaseObject~ResponseMapValueObject
     *
     * The `responseMap` can have two values: a string or a ResponseMapValueObject. When string, the
     * data found on that response is directly mapped to the BaseObject without mutation. When
     * ResponseMapValueObject, the data at the `key` will be used to create BaseObject(s) or
     * manually parsed with a provided `manualParse function`. Either result is attached to the
     * BaseObject being populated.
     *
     * @property {String} key The key on the response data where the data can be found. This must be
     *                        defined.
     * @property {BaseObject} BaseObject The BaseObject to create with the response data.
     * @property {Boolean} isArray Whether or not the response data is an array. Useful for
     *                             attributes such as "teams".
     * @property {Boolean} defer Whether or not to wait to parse the entry until a second pass of
     *                           the map. This is useful for populating items with cached instances
     *                           that are not guaranteed to be parsed/cached during initial parsing.
     *                           Example: Using Team instances on League.
     * @property {function} manualParse A function to manually apply logic to the response. This
     *                                  function must return its result to be attached to the
     *                                  populated BaseObject. The arguments to this function are:
     *                                  (data at the key), (the whole response), (the instance being
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
     *     manualParse: (responseData, response, constructorParams, instance) => (
     *       Team.buildFromServer(responseData)
     *     )
     *   }
     * };
     */

    let item;

    if (!isDataFromServer) {
      item = _.get(data, key);
    } else if (_.isString(value)) {
      item = _.get(data, value);
    } else if (_.isPlainObject(value)) {
      item = this._processObjectValue({
        data, constructorParams, instance, value
      });
    } else {
      throw new Error(
        `${this.displayName}: _populateObject: Did not recognize responseMap value type for key ` +
        `${key}`
      );
    }

    if (!_.isUndefined(item)) {
      _.set(instance, key, item);
    }
  }

  /**
   * Returns the passed instance of the BaseObject populated with the passed data, mapping the
   * attributes defined in the value of responseMap to the matching key.
   * @private
   *
   * @param  {Object} options.data The data to map onto the passed instance.
   * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
   * @param  {Boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
   *                                            data came locally.
   * @return {BaseObject} The mutated BaseObject instance.
   */
  static _populateObject({
    data, constructorParams, instance, isDataFromServer
  }) {
    if (!instance) {
      throw new Error(`${this.displayName}: _populateObject: Did not receive instance to populate`);
    } else if (_.isEmpty(data)) {
      return instance;
    }

    const deferredMapItems = {};
    _.forEach(this.responseMap, (value, key) => {
      if (_.isPlainObject(value) && value.defer) {
        _.set(deferredMapItems, key, value);
      } else {
        this._processResponseMapItem({
          data, constructorParams, instance, isDataFromServer, key, value
        });
      }
    });

    _.forEach(deferredMapItems, (value, key) => {
      this._processResponseMapItem({
        data, constructorParams, instance, isDataFromServer, key, value
      });
    });

    return instance;
  }

  /**
   * Returns a new instance of the BaseObject populated with the passed data that came from ESPN,
   * mapping the attributes defined in the value of responseMap to the matching key. Use this method
   * when constructing BaseObjects with server responses.
   * @param  {Object} data Data originating from the server.
   * @param  {Object} constructorParams Params to be passed to the instance's constructor. Useful
   *                                    for passing parent data, such as `leagueId`.
   * @return {BaseObject} A new instance of the BaseObject populated with the passed data.
   */
  static buildFromServer(data, constructorParams) {
    const instance = new this(constructorParams);

    const dataToUse = this.flattenResponse ? flattenObject(data) : data;
    this._populateObject({
      data: dataToUse, constructorParams, instance, isDataFromServer: true
    });

    return instance;
  }
}

export default BaseObject;
