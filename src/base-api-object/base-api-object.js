import axios from 'axios';
import _ from 'lodash';

import BaseCacheableObject from '../base-cacheable-object/base-cacheable-object.js';

/**
 * The base class for all project objects that can communicate with the ESPN API. Provides `read`
 * functionality. Can connect to private leagues when cookies are set on this class.
 *
 * @extends {BaseCacheableObject}
 */
class BaseAPIObject extends BaseCacheableObject {
  static displayName = 'BaseAPIObject';

  /**
   * The "view" params passed to the main monoroute to populate the response with desired data.
   * @type {String}
   */
  static routeParams = '';

  /**
   * Sets ESPN cookies to allow access to private leagues. Not required to be set for public
   * leagues. By setting cookies on this class, every subclass (League, Boxscore, etc) will use the
   * cookies when making read calls.
   * @param {String} options.espnS2 Found at "Application > Cookies > espn.com > espn_s2" via Chrome
   *                                devtools.
   * @param {String} options.SWID Found at "Application > Cookies > espn.com > SWID" via Chrome
   *                              devtools.
   */
  static setCookies({ espnS2, SWID }) {
    this._espnS2 = espnS2;
    this._SWID = SWID;
  }

  /**
   * Must be overridden by subclasses. Constructs and returns an API route to which a request will
   * be made.
   * @throws {Error}
   */
  static getRoute() {
    throw new Error(`${this.displayName}: getRoute must be overridden!`);
  }

  /**
   * Makes a read request to get data to populate an instance. Uses `static getRoute` to get the
   * properly constructed route (including params) to call.
   *
   * If reload is true, then any matching cached instance is ignored and overridden on successful
   * read.
   * If reload is false and a matching instance is found in the cache, the cached instance is
   * returned in
   * an immediately resolving promise.
   * If reload is false but no cached instance is found, the request will be made to load the
   * instance for the first time.
   *
   * Populated instances are cached on succesful reads.
   *
   * Consumers of this project are responsible for catching errors.
   *
   * @async
   * @param  {BaseAPIObject} options.instance The instance to populate rather than creating a new
   *                                          instance.
   * @param  {Boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise<BaseAPIObject>}
   */
  static read({ instance, reload = true } = { reload: true }) {
    // Return cached instance if appropriate
    const cachingId = _.invoke(instance, 'getCacheId');
    if (!reload && _.get(this.cache, cachingId)) {
      return Promise.resolve(_.get(this.cache, cachingId));
    }

    // Build headers if appropriate
    const headers = (this._espnS2 && this._SWID) ?
      { Cookie: `espn_s2=${this._espnS2}; SWID=${this._SWID};` } :
      undefined;
    const axiosConfig = { headers, withCredentials: !_.isEmpty(headers) };

    // Make request
    return axios.get(instance.getRoute(), axiosConfig).then((response) => (
      instance ? this._populateObject({
        data: response.data,
        instance,
        isDataFromServer: true
      }) : this.buildFromServer(response.data)
    ));
  }

  /**
   * Must be overridden by subclasses. Defers to class method to construct and return an API route.
   * @returns {String} The constructed API route
   * @throws {Error} If class method is not overridden
   */
  getRoute() {
    return this.constructor.getRoute();
  }

  /**
   * Defers to `static read`.
   *
   * @async
   * @param  {Boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise<BaseAPIObject>}
   */
  read({ reload = true } = { reload: true }) {
    return this.constructor.read({ instance: this, reload });
  }
}

export default BaseAPIObject;
