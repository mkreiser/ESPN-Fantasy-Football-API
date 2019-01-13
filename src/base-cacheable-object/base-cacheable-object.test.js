import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import BaseCacheableObject from './base-cacheable-object.js';

class MappingTestBaseObject extends BaseCacheableObject {
  static responseMap = {
    mappingId: 'mapping_id',
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static displayName = 'MappingTestBaseObject';

  static idName = 'mappingId';
}

class TestBaseCacheableObject extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    this.constructorOption = options.constructorOption;
  }

  static responseMap = {
    testId: 'testId',
    someValue: 'some_value',
    someNestedData: 'nested.item',
    someObject: {
      key: 'map_object',
      BaseObject: MappingTestBaseObject
    },
    someObjects: {
      key: 'map_objects',
      BaseObject: MappingTestBaseObject,
      isArray: true
    },
    someManualObject: {
      key: 'manual',
      manualParse: jest.fn()
    },
    someManualAndBaseObject: {
      key: 'both',
      BaseObject: MappingTestBaseObject,
      manualParse: jest.fn()
    },
    someDeferredObject: {
      key: 'deferred',
      BaseObject: MappingTestBaseObject,
      defer: true,
      manualParse: jest.fn()
    }
  };

  static displayName = 'TestBaseCacheableObject';

  static idName = 'testId';
}

describe('BaseCacheableObject', () => {
  describe('class methods', () => {
    describe('_populateObject', () => {
      let data, isDataFromServer, instance;

      beforeEach(() => {
        data = {};
        isDataFromServer = true;
        instance = new TestBaseCacheableObject();
      });

      afterEach(() => {
        data = null;
        isDataFromServer = null;
        instance = null;
      });

      test('defers to BaseObject\'s _populateObject for data mapping functionality', () => {
        // Super lazy way to test
        jest.spyOn(BaseObject, '_populateObject');

        BaseCacheableObject._populateObject({ data, instance, isDataFromServer });

        expect(BaseObject._populateObject).toBeCalledWith({ data, instance, isDataFromServer });

        BaseObject._populateObject.mockRestore();
      });

      const testDoesNotCache = () => {
        test('does not cache the instance', () => {
          TestBaseCacheableObject.clearCache();

          TestBaseCacheableObject._populateObject({ data, instance, isDataFromServer });

          expect(TestBaseCacheableObject.cache).toEqual({});
        });
      };

      describe('when isDataFromServer is true', () => {
        beforeEach(() => {
          isDataFromServer = true;
        });

        describe('when a caching id is returned by the populated instance', () => {
          test('caches populated instance', () => {
            const id = 'someCacheId23';
            jest.spyOn(instance, 'getCacheId').mockReturnValue(id);

            TestBaseCacheableObject._populateObject({ data, instance, isDataFromServer });

            expect(TestBaseCacheableObject.get(id)).toBe(instance);
          });
        });

        describe('when a caching id is not returned by the populated instance', () => {
          beforeEach(() => {
            jest.spyOn(instance, 'getCacheId').mockReturnValue();
          });

          testDoesNotCache();
        });
      });

      describe('when isDataFromServer is false', () => {
        beforeEach(() => {
          isDataFromServer = false;
        });

        describe('when a caching id is returned by the populated instance', () => {
          beforeEach(() => {
            jest.spyOn(instance, 'getCacheId').mockReturnValue('someCacheId23');
          });

          testDoesNotCache();
        });

        describe('when a caching id is not returned by the populated instance', () => {
          beforeEach(() => {
            jest.spyOn(instance, 'getCacheId').mockReturnValue();
          });

          testDoesNotCache();
        });
      });

      test('returns populated instance', () => {
        const returnedInstance = TestBaseCacheableObject._populateObject({
          data, instance, isDataFromServer
        });

        expect(returnedInstance).toBe(instance);
      });
    });

    describe('get cache', () => {
      describe('when _cache is not set', () => {
        beforeEach(() => {
          TestBaseCacheableObject._cache = undefined;
        });

        test('sets _cache to an empty object', () => {
          const returnedCache = TestBaseCacheableObject.cache;

          expect(returnedCache).toEqual({});
        });

        test('returns empty object', () => {
          expect(TestBaseCacheableObject.cache).toEqual({});
        });
      });

      describe('when _cache is set', () => {
        test('does not mutate _cache', () => {
          const cache = { some: 'cache' };
          TestBaseCacheableObject._cache = cache;

          const returnedCache = TestBaseCacheableObject.cache;

          expect(returnedCache).toEqual(cache);
        });

        test('returns _cache', () => {
          const cache = { some: 'cache' };

          TestBaseCacheableObject._cache = cache;
          expect(TestBaseCacheableObject.cache).toBe(cache);
        });
      });
    });

    describe('set cache', () => {
      beforeEach(() => {
        TestBaseCacheableObject._cache = undefined;
      });

      test('sets _cache', () => {
        const cache = { some: 'cache' };

        TestBaseCacheableObject.cache = cache;
        expect(TestBaseCacheableObject._cache).toBe(cache);
      });
    });

    describe('clearCache', () => {
      test('sets cache to empty object', () => {
        TestBaseCacheableObject.cache = { some: 'cached items' };

        TestBaseCacheableObject.clearCache();
        expect(TestBaseCacheableObject.cache).toEqual({});
      });
    });

    describe('get', () => {
      describe('when there is a instance with a matching id', () => {
        test('returns the instance', () => {
          const id = 12;
          const instance = new TestBaseCacheableObject({ testId: id });
          TestBaseCacheableObject.cache[id] = instance;

          const cachedInstance = TestBaseCacheableObject.get(id);
          expect(cachedInstance).toBe(instance);

          TestBaseCacheableObject.clearCache();
        });
      });

      describe('when there is not a instance with a matching id', () => {
        test('returns undefined', () => {
          const id = 12;
          const instance = new TestBaseCacheableObject({ testId: id + 1 });
          TestBaseCacheableObject.cache[id] = undefined;
          TestBaseCacheableObject.cache[id + 1] = instance;

          const cachedInstance = TestBaseCacheableObject.get(id);
          expect(cachedInstance).toBeUndefined();

          TestBaseCacheableObject.clearCache();
        });
      });
    });

    describe('getCacheId', () => {
      describe('when the passed params includes the id', () => {
        test('returns the id', () => {
          const id = 'someId';
          const params = { [TestBaseCacheableObject.idName]: id };

          const cacheId = TestBaseCacheableObject.getCacheId(params);
          expect(cacheId).toBe(id);
        });
      });

      describe('when the passed params does not include the id', () => {
        test('returns undefined', () => {
          const cacheId = TestBaseCacheableObject.getCacheId({});
          expect(cacheId).toBeUndefined();
        });
      });

      describe('when the params are undefined', () => {
        test('returns undefined', () => {
          const cacheId = TestBaseCacheableObject.getCacheId();
          expect(cacheId).toBeUndefined();
        });
      });
    });
  });

  describe('instance methods', () => {
    let baseCachableObject;

    beforeEach(() => {
      baseCachableObject = new TestBaseCacheableObject();
    });

    afterEach(() => {
      baseCachableObject = null;
    });

    describe('getId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCacheableObject.idName, id);

        expect(baseCachableObject.getId()).toBe(id);
      });
    });

    describe('setId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCacheableObject.idName, null);

        baseCachableObject.setId(id);
        expect(_.get(baseCachableObject, TestBaseCacheableObject.idName)).toBe(id);
      });
    });

    describe('getCacheId', () => {
      test('calls static getCacheId with the instance', () => {
        jest.spyOn(TestBaseCacheableObject, 'getCacheId');

        baseCachableObject.getCacheId();
        expect(TestBaseCacheableObject.getCacheId).toBeCalledWith(baseCachableObject);
      });

      test('returns the result of static getCacheId', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCacheableObject.idName, id);

        expect(baseCachableObject.getCacheId()).toBe(id);
      });
    });
  });
});
