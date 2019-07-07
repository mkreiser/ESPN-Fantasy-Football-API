import _ from 'lodash';

const flattenObject = (object) => {
  const flatObject = {};

  _.forEach(object, (value, key) => {
    if (_.isPlainObject(value)) {
      _.assign(flatObject, flattenObject(value));
    } else {
      _.set(flatObject, key, value);
    }
  });

  return flatObject;
};

export {
  flattenObject
};
