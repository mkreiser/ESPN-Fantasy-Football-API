import BaseObject from '../base-object/base-object.js';

import BaseCacheableObject from './base-cacheable-object.js';

class TestBaseCacheableObject extends BaseCacheableObject {
  static displayName = 'TestBaseCacheableObject';
}

describe('BaseCacheableObject', () => {
  describe('class methods', () => {
    describe('_populateObject', () => {
      let data;
      let isDataFromServer;
      let instance;

      beforeEach(() => {
        data = {};
        isDataFromServer = true;
        instance = new TestBaseCacheableObject();
      });

      test('defers to BaseObject\'s _populateObject for data mapping functionality', () => {
        // Super lazy way to test
        jest.spyOn(BaseObject, '_populateObject');

        TestBaseCacheableObject._populateObject({ data, instance, isDataFromServer });

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

    describe('getIDParams', () => {
      test('returns empty object', () => {
        expect(TestBaseCacheableObject.getIDParams()).toEqual({});
      });
    });

    describe('getCacheId', () => {
      describe('when getIDParams returns a non-empty object', () => {
        test('returns a key-value string', () => {
          jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue({ a: 1, b: 2 });

          expect(TestBaseCacheableObject.getCacheId()).toBe('a=1;b=2;');
        });
      });

      describe('when getIDParams returns an empty object', () => {
        test('returns undefined', () => {
          jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue({});

          expect(TestBaseCacheableObject.getCacheId()).toBeUndefined();
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

    describe('getIDParams', () => {
      test('calls static getIDParams with the instance', () => {
        jest.spyOn(TestBaseCacheableObject, 'getIDParams');

        baseCachableObject.getIDParams();
        expect(TestBaseCacheableObject.getIDParams).toBeCalledWith(baseCachableObject);
      });

      test('returns the result of static getIDParams', () => {
        const idParams = {};
        jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue(idParams);

        expect(baseCachableObject.getIDParams()).toBe(idParams);
      });
    });

    describe('getCacheId', () => {
      test('calls static getCacheId with the instance', () => {
        jest.spyOn(TestBaseCacheableObject, 'getCacheId');

        baseCachableObject.getCacheId();
        expect(TestBaseCacheableObject.getCacheId).toBeCalledWith(baseCachableObject);
      });

      test('returns the result of static getCacheId', () => {
        const cacheId = 'some cache id';
        jest.spyOn(TestBaseCacheableObject, 'getCacheId').mockReturnValue(cacheId);

        expect(baseCachableObject.getCacheId()).toBe(cacheId);
      });
    });
  });
});
