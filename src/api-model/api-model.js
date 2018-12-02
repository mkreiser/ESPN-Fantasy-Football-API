import axios from 'axios';
import _ from 'lodash';

class ApiModel {
  static idName = 'id';

  static _buildApiModel({ data, isDataFromServer }) {
    const model = new this();

    _.forEach(this.responseMap, (value, key) => {
      const item = _.get(data, isDataFromServer ? value : key);
      _.set(model, key, item);
    });

    return model;
  }

  static buildFromServer(data) {
    return this._buildApiModel({ data, isDataFromServer: true });
  }

  static buildFromLocal(data) {
    return this._buildApiModel({ data, isDataFromServer: false });
  }

  static get cache() {
    if (!this._cache) {
      this._cache = {};
    }

    return this._cache;
  }

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
