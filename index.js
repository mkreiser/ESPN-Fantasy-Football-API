import axios from 'axios';

import BaseObject from './src/base-object/base-object.js';
import BaseCacheableObject from './src/base-cacheable-object/base-cacheable-object.js';
import BaseAPIObject from './src/base-api-object/base-api-object.js';

axios.defaults.baseURL = 'http://fantasy.espn.com/apis/v3/games/ffl/';

export {
  BaseObject,
  BaseCacheableObject,
  BaseAPIObject
};
