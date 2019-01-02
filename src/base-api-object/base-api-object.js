import axios from 'axios';
import _ from 'lodash';

import BaseCachableObject from '../base-cachable-object/base-cachable-object.js';

/**
 * The base class for all project objects that can communicate with the ESPN API. Provides `read`
 * capability and caching functionality.
 * @extends BaseCachableObject
 */
class BaseAPIObject extends BaseCachableObject {
  static displayName = 'BaseAPIObject';

  /**
   * Makes a call to the passed route with the passed params. If reload is true, then any matching
   * cached model is ignored and overridden on successful read. If reload is false and a matching
   * model is found in the cache, the cached model is returned in an immediately resolving promise.
   * If reload is false but no cached model is found, the request will be made to load the model for
   * the first time.
   * @async
   * @throws {Error} If route is not passed
   * @param  {BaseAPIObject} options.model The model to populate rather than creating a new
   *                                       instance.
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

    const id = _.invoke(model, 'getCacheId') || this.getCacheId(params);
    if (id && !reload && _.get(this.cache, id)) {
      return Promise.resolve(_.get(this.cache, id));
    }

    return axios.get(route, { params }).then((response) => {
      return model ? this._populateObject({
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
}

export default BaseAPIObject;
