import _ from 'lodash';

const setWithWarning = (objValue, newValue, key, object) => {
  // istanbul ignore next
  if (process.env.NODE_ENV === 'development' && object[key] && newValue !== objValue) {
    console.warn(`espn-fantasy-football-api: Assigning non-empty key ${key}. Set value: ${objValue}, new value: ${newValue}!`);
  }

  return newValue;
};

const flattenObject = (object) => {
  const flatObject = {};

  _.forEach(object, (value, key) => {
    if (_.isPlainObject(value)) {
      _.assignWith(flatObject, flattenObject(value), setWithWarning);
    } else {
      // istanbul ignore next
      if (process.env.NODE_ENV === 'development' && flatObject[key] && value !== flatObject[key]) {
        console.warn(`espn-fantasy-football-api: Assigning non-empty key ${key}. Set value: ${flatObject[key]}, new value: ${value}!`);
      }

      _.set(flatObject, key, value);
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
      // istanbul ignore next
      if (process.env.NODE_ENV === 'development' && flatObject[key] && value !== flatObject[key]) {
        console.warn(`espn-fantasy-football-api: Assigning non-empty key ${key}. Set value: ${flatObject[key]}, new value: ${value}!`);
      }

      _.set(flatObject, key, value);
    }
  });

  return flatObject;
};

export {
  flattenObject,
  flattenObjectSansNumericKeys
};
