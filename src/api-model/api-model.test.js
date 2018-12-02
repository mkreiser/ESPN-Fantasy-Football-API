import axios from 'axios';
import _ from 'lodash';

import ApiModel from './api-model.js';

class TestApiModel extends ApiModel {
  constructor(options = {}) {
    super(options);

    this.constructorOption = options.constructorOption;
  }

  static responseMap = {
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static idName = 'testId';
}

describe('ApiModel', () => {
  let apiModel;

  beforeEach(() => {
    apiModel = new ApiModel();
  });

  afterEach(() => {
    apiModel = null;
  });

  describe('class methods', () => {
    describe('_buildApiModel', () => {
      let data;

      beforeEach(() => {
        data = {
          some_value: 'some item',
          nested: {
            item: 'some nested item'
          }
        };
      });

      afterEach(() => {
        data = null;
      });

      test('returns an instance of the class', () => {
        const model = TestApiModel._buildApiModel({ data });
        expect(model).toBeInstanceOf(TestApiModel);
      });

      test('passes constructorParams to instance constructor', () => {
        const constructorParams = { constructorOption: 'some option' };

        const model = TestApiModel._buildApiModel({ data, constructorParams });
        expect(model.constructorOption).toBe(constructorParams.constructorOption);
      });

      test('does not map keys not defined in responseMap', () => {
        data = { notInMap: 'some wack stuff' };

        const model = TestApiModel._buildApiModel({ data });
        expect(model.notInMap).toBeUndefined();
      });

      describe('when isDataFromServer is true', () => {
        test('maps passed data onto the instance using responseMap', () => {
          const model = TestApiModel._buildApiModel({ data, isDataFromServer: true });
          expect(model.someValue).toBe(data.some_value);
          expect(model.someNestedData).toBe(data.nested.item);
        });

        test('does not map data passed in the form of a local object', () => {
          data = { someValue: 'some server data' };

          const model = TestApiModel._buildApiModel({ data, isDataFromServer: true });
          expect(model.someValue).toBeUndefined();
          expect(model.some_value).toBeUndefined();
        });
      });

      describe('when isDataFromServer is false', () => {
        beforeEach(() => {
          data = {
            someValue: 'some value',
            someNestedData: 'some nested data'
          };
        });

        test('maps passed data onto the instance using responseMap', () => {
          const model = TestApiModel._buildApiModel({ data, isDataFromServer: false });
          expect(model.someValue).toBe(data.someValue);
          expect(model.someNestedData).toBe(data.someNestedData);
        });

        test('does not map data passed in the form of a server response', () => {
          data = { some_value: 'some server data' };

          const model = TestApiModel._buildApiModel({ data, isDataFromServer: false });
          expect(model.someValue).toBeUndefined();
          expect(model.some_value).toBeUndefined();
        });
      });
    });

    describe('buildFromServer', () => {
      test('calls _buildApiModel with isDataFromServer true', () => {
        jest.spyOn(TestApiModel, '_buildApiModel');
        const data = { some: 'data' };
        const constructorParams = { more: 'params' };

        TestApiModel.buildFromServer(data, constructorParams);
        expect(TestApiModel._buildApiModel).toBeCalledWith({
          data,
          constructorParams,
          isDataFromServer: true
        });
      });

      test('returns an instance of the class', () => {
        const model = TestApiModel.buildFromServer();
        expect(model).toBeInstanceOf(TestApiModel);
      });
    });

    describe('buildFromLocal', () => {
      test('calls _buildApiModel with isDataFromServer false', () => {
        jest.spyOn(TestApiModel, '_buildApiModel');
        const data = { some: 'data' };
        const constructorParams = { more: 'params' };

        TestApiModel.buildFromLocal(data, constructorParams);
        expect(TestApiModel._buildApiModel).toBeCalledWith({
          data,
          constructorParams,
          isDataFromServer: false
        });
      });

      test('returns an instance of the class', () => {
        const model = TestApiModel.buildFromLocal();
        expect(model).toBeInstanceOf(TestApiModel);
      });
    });

    describe('get cache', () => {
      describe('when _cache is not set', () => {
        beforeEach(() => {
          ApiModel._cache = undefined;
        });

        test('sets _cache to an empty object', () => {
          ApiModel.cache;
          expect(ApiModel._cache).toEqual({});
        });

        test('returns empty object', () => {
          expect(ApiModel.cache).toEqual({});
        });
      });

      describe('when _cache is set', () => {
        test('does not mutate _cache', () => {
          const cache = { some: 'cache' };
          ApiModel._cache = cache;
          ApiModel.cache;
          expect(ApiModel._cache).toBe(cache);
        });

        test('returns _cache', () => {
          const cache = { some: 'cache' };
          ApiModel._cache = cache;
          expect(ApiModel.cache).toBe(cache);
        });
      });
    });

    describe('set cache', () => {
      beforeEach(() => {
        ApiModel._cache = undefined;
      });

      test('sets _cache', () => {
        const cache = { some: 'cache' };
        ApiModel.cache = cache;
        expect(ApiModel._cache).toBe(cache);
      });
    });

    describe('read', () => {
      describe('when no parameters are passed', () => {
        test('throws error via static read', () => {
          expect(() => ApiModel.read()).toThrowError(
            `${ApiModel.displayName}: static read: cannot read without route`
          );
        });
      });

      test('calls axios.get with the passed route and params', () => {
        jest.spyOn(axios, 'get').mockImplementation();

        const route = 'some-route';
        const params = { some: 'params' };

        ApiModel.read({ route, params });
        expect(axios.get).toBeCalledWith(route, params);
      });

      test('returns a promise from axios.get', () => {
        const promise = 'promise';
        jest.spyOn(axios, 'get').mockReturnValue(promise);

        const route = 'some-route';
        const params = { some: 'params' };

        expect(ApiModel.read({ route, params })).toBe(promise);
      });
    });
  });

  describe('instance methods', () => {
    describe('read', () => {
      beforeEach(() => {
        jest.spyOn(ApiModel, 'read').mockImplementation();
      });

      describe('when no parameters are passed', () => {
        beforeEach(() => {
          ApiModel.read.mockRestore();
        });

        test('throws error via static read', () => {
          expect(() => apiModel.read()).toThrowError(
            `${ApiModel.displayName}: static read: cannot read without route`
          );
        });
      });

      test('calls static read with idName merged into params', () => {
        const id = 'id';
        apiModel.id = id;

        const route = 'some-route';
        const params = { some: 'params' };
        const expectedParams = _.assign({}, params, { id });

        apiModel.read({ route, params });
        expect(ApiModel.read).toBeCalledWith({ route, params: expectedParams });
      });

      test('returns result of ApiModel.read', () => {
        const promise = 'promise';
        ApiModel.read.mockReturnValue(promise);

        const route = 'some-route';
        const params = { some: 'params' };

        expect(apiModel.read({ route, params })).toBe(promise);
      });
    });

    describe('getId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        const model = TestApiModel.buildFromLocal();
        _.set(model, TestApiModel.idName, id);

        expect(model.getId()).toBe(id);
      });
    });

    describe('setId', () => {
      test('returns the id defined at static idName', () => {
        const id = 'some id';
        const model = TestApiModel.buildFromLocal();
        _.set(model, TestApiModel.idName, null);

        model.setId(id);
        expect(_.get(model, TestApiModel.idName)).toBe(id);
      });
    });
  });
});
