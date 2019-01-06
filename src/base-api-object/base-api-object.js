import axios from 'axios';
import _ from 'lodash';

import BaseCacheableObject from '../base-cacheable-object/base-cacheable-object.js';

/**
 * The base class for all project objects that can communicate with the ESPN API. Provides `read`
 * functionality.
 * @extends BaseCacheableObject
 */
class BaseAPIObject extends BaseCacheableObject {
  static displayName = 'BaseAPIObject';

  /**
   * Makes a call to the passed route with the passed params.
   *
   * If reload is true, then any matching cached model is ignored and overridden on successful read.
   * If reload is false and a matching model is found in the cache, the cached model is returned in
   * an immediately resolving promise. If reload is false but no cached model is found, the request
   * will be made to load the model for the first time.
   *
   * Populated models are cached on succesful reads.
   *
   * Consumers of this project are responsible for catching errors.
   *
   * @async
   * @throws {Error} If route is not defined
   * @param  {BaseAPIObject} options.model The model to populate rather than creating a new
   *                                       instance.
   * @param  {string} options.route The route on the API to call.
   * @param  {object} options.params Params to pass on the GET call.
   * @param  {boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise}
   */
  static read(
    { model, route = this.route, params, reload = true } = { route: this.route, reload: true }
  ) {
    if (!route) {
      throw new Error(`${this.displayName}: static read: cannot read without route`);
    }

    const cachingId = _.invoke(model, 'getCacheId') || this.getCacheId(params);
    if (cachingId && !reload && _.get(this.cache, cachingId)) {
      return Promise.resolve(_.get(this.cache, cachingId));
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
   * Makes a call to the passed route with the passed params. Automatically includes the id of the
   * instance in the params. Defers actual GET call and data population to `static read`.
   *
   * @async
   * @throws {Error} If route is not defined.
   * @throws {Error} If id is not defined on the instance.
   * @param  {string} options.route   The route on the API to call.
   * @param  {object} options.params  Params to pass on the GET call.
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
