import _ from 'lodash';

const setWithWarning = (objValue, newValue, key, object) => {
  if (object[key]) {
    console.warn(`espn-fantasy-football-api: Duplicate key ${key} in flatten response!`);
  }

  _.set(object, key, newValue);
};

const flattenObject = (object) => {
  const flatObject = {};

  _.forEach(object, (value, key) => {
    if (_.isPlainObject(value)) {
      _.assignWith(flatObject, flattenObject(value), setWithWarning);
    } else {
      setWithWarning(flatObject, key, value);
    }
  });

  return flatObject;
};

const flattenObjectSansNumericKeys = (object) => {
  const flatObject = {};

  _.forEach(object, (value, key) => {
    if (_.isPlainObject(value) && !_.some(_.keys(value), (k) => !_.isNaN(Number(k)))) {
      _.assignWith(flatObject, flattenObjectSansNumericKeys(value), setWithWarning);
    } else {
      setWithWarning(flatObject, key, value);
    }
  });

  return flatObject;
};

export {
  flattenObject,
  flattenObjectSansNumericKeys
};
