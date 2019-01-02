import _ from 'lodash';

import BaseCachableObject from './base-cachable-object.js';

class MappingTestBaseObject extends BaseCachableObject {
  static responseMap = {
    mappingId: 'mapping_id',
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static displayName = 'MappingTestBaseObject';

  static idName = 'mappingId';
}

class TestBaseCachableObject extends BaseCachableObject {
  constructor(options = {}) {
    super(options);

    this.constructorOption = options.constructorOption;
  }

  static responseMap = {
    testId: 'testId',
    someValue: 'some_value',
    someNestedData: 'nested.item',
    someModel: {
      key: 'map_model',
      BaseObject: MappingTestBaseObject
    },
    someModels: {
      key: 'map_models',
      BaseObject: MappingTestBaseObject,
      isArray: true
    },
    someManualModel: {
      key: 'manual',
      manualParse: jest.fn()
    },
    someManualAndBaseObject: {
      key: 'both',
      BaseObject: MappingTestBaseObject,
      manualParse: jest.fn()
    },
    someDeferredModel: {
      key: 'deferred',
      BaseObject: MappingTestBaseObject,
      defer: true,
      manualParse: jest.fn()
    }
  };

  static displayName = 'TestBaseCachableObject';

  static idName = 'testId';
}

describe('BaseCachableObject', () => {
  describe('class methods', () => {
    describe('get cache', () => {
      describe('when _cache is not set', () => {
        beforeEach(() => {
          TestBaseCachableObject._cache = undefined;
        });

        test('sets _cache to an empty object', () => {
          TestBaseCachableObject.cache;
          expect(TestBaseCachableObject._cache).toEqual({});
        });

        test('returns empty object', () => {
          expect(TestBaseCachableObject.cache).toEqual({});
        });
      });

      describe('when _cache is set', () => {
        test('does not mutate _cache', () => {
          const cache = { some: 'cache' };
          TestBaseCachableObject._cache = cache;

          TestBaseCachableObject.cache;
          expect(TestBaseCachableObject._cache).toBe(cache);
        });

        test('returns _cache', () => {
          const cache = { some: 'cache' };

          TestBaseCachableObject._cache = cache;
          expect(TestBaseCachableObject.cache).toBe(cache);
        });
      });
    });

    describe('set cache', () => {
      beforeEach(() => {
        TestBaseCachableObject._cache = undefined;
      });

      test('sets _cache', () => {
        const cache = { some: 'cache' };

        TestBaseCachableObject.cache = cache;
        expect(TestBaseCachableObject._cache).toBe(cache);
      });
    });

    describe('clearCache', () => {
      test('sets cache to empty object', () => {
        TestBaseCachableObject.cache = { some: 'cached items' };

        TestBaseCachableObject.clearCache();
        expect(TestBaseCachableObject.cache).toEqual({});
      });
    });

    describe('get', () => {
      describe('when there is a model with a matching id', () => {
        test('returns the model', () => {
          const id = 12;
          const model = new TestBaseCachableObject({ testId: id });
          TestBaseCachableObject.cache[id] = model;

          const cachedModel = TestBaseCachableObject.get(id);
          expect(cachedModel).toBe(model);

          TestBaseCachableObject.clearCache();
        });
      });

      describe('when there is not a model with a matching id', () => {
        test('returns undefined', () => {
          const id = 12;
          const model = new TestBaseCachableObject({ testId: id + 1 });
          TestBaseCachableObject.cache[id] = undefined;
          TestBaseCachableObject.cache[id + 1] = model;

          const cachedModel = TestBaseCachableObject.get(id);
          expect(cachedModel).toBeUndefined();

          TestBaseCachableObject.clearCache();
        });
      });
    });
  });

  describe('instance methods', () => {
    let baseCachableObject;

    beforeEach(() => {
      baseCachableObject = new TestBaseCachableObject();
    });

    afterEach(() => {
      baseCachableObject = null;
    });

    describe('getId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCachableObject.idName, id);

        expect(baseCachableObject.getId()).toBe(id);
      });
    });

    describe('setId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCachableObject.idName, null);

        baseCachableObject.setId(id);
        expect(_.get(baseCachableObject, TestBaseCachableObject.idName)).toBe(id);
      });
    });

    describe('getCacheId', () => {
      test('returns the result of getId', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCachableObject.idName, id);

        expect(baseCachableObject.getCacheId()).toBe(id);
      });
    });

    describe('getCacheId', () => {
      test('returns the result of getId', () => {
        const id = 'some id';
        _.set(baseCachableObject, TestBaseCachableObject.idName, id);

        expect(baseCachableObject.getCacheId()).toBe(id);
      });
    });
  });
});
