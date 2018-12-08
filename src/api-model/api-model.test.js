import axios from 'axios';
import _ from 'lodash';
import q from 'q';

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
    describe('_populateApiModel', () => {
      let data, model;

      beforeEach(() => {
        data = {
          some_value: 'some item',
          nested: {
            item: 'some nested item'
          }
        };
        model = new TestApiModel();
      });

      afterEach(() => {
        data = model = null;
      });

      test('returns passed model', () => {
        const passedModel = new TestApiModel();
        const returnedModel = TestApiModel._populateApiModel({ data, model: passedModel });
        expect(returnedModel).toBe(passedModel);
      });

      test('does not map keys not defined in responseMap', () => {
        data = { notInMap: 'some wack stuff' };

        const returnedModel = TestApiModel._populateApiModel({
          data,
          model,
          isDataFromServer: true
        });
        expect(returnedModel.notInMap).toBeUndefined();
      });

      describe('when isDataFromServer is true', () => {
        test('maps passed data onto the instance using responseMap', () => {
          const returnedModel = TestApiModel._populateApiModel({
            data,
            model,
            isDataFromServer: true
          });
          expect(returnedModel.someValue).toBe(data.some_value);
          expect(returnedModel.someNestedData).toBe(data.nested.item);
        });

        test('does not map data passed in the form of a local object', () => {
          data = { someValue: 'some server data' };

          const returnedModel = TestApiModel._populateApiModel({
            data,
            model,
            isDataFromServer: true
          });
          expect(returnedModel.someValue).toBeUndefined();
          expect(returnedModel.some_value).toBeUndefined();
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
          const returnedModel = TestApiModel._populateApiModel({
            data,
            model,
            isDataFromServer: false
          });
          expect(returnedModel.someValue).toBe(data.someValue);
          expect(returnedModel.someNestedData).toBe(data.someNestedData);
        });

        test('does not map data passed in the form of a server response', () => {
          data = { some_value: 'some server data' };

          const returnedModel = TestApiModel._populateApiModel({
            data,
            model,
            isDataFromServer: false
          });
          expect(returnedModel.someValue).toBeUndefined();
          expect(returnedModel.some_value).toBeUndefined();
        });
      });
    });

    describe('_buildNewApiModel', () => {
      test('returns an instance of the class', () => {
        const returnedModel = TestApiModel._buildNewApiModel({});
        expect(returnedModel).toBeInstanceOf(TestApiModel);
      });

      test('passes constructorParams to instance constructor', () => {
        const constructorParams = { constructorOption: 'some option' };

        const returnedModel = TestApiModel._buildNewApiModel({ constructorParams });
        expect(returnedModel.constructorOption).toBe(constructorParams.constructorOption);
      });

      test('defers data population to _populateApiModel', () => {
        jest.spyOn(TestApiModel, '_populateApiModel');
        const data = { some: 'data' };
        const isDataFromServer = false;

        TestApiModel._buildNewApiModel({ data, isDataFromServer });
        expect(TestApiModel._populateApiModel).toBeCalledWith({
          data,
          model: expect.any(TestApiModel),
          isDataFromServer
        });
      });
    });

    describe('buildFromServer', () => {
      test('calls _buildNewApiModel with isDataFromServer true', () => {
        jest.spyOn(TestApiModel, '_buildNewApiModel');
        const data = { some: 'data' };
        const constructorParams = { more: 'params' };

        TestApiModel.buildFromServer(data, constructorParams);
        expect(TestApiModel._buildNewApiModel).toBeCalledWith({
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
      test('calls _buildNewApiModel with isDataFromServer false', () => {
        jest.spyOn(TestApiModel, '_buildNewApiModel');
        const data = { some: 'data' };
        const constructorParams = { more: 'params' };

        TestApiModel.buildFromLocal(data, constructorParams);
        expect(TestApiModel._buildNewApiModel).toBeCalledWith({
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
      let promise;

      beforeEach(() => {
        promise = q.when({});
        jest.spyOn(axios, 'get').mockReturnValue(promise);
      });

      afterEach(() => {
        promise = null;
      });

      describe('when no parameters are passed', () => {
        test('throws error via static read', () => {
          expect(() => ApiModel.read()).toThrowError(
            `${ApiModel.displayName}: static read: cannot read without route`
          );
        });
      });

      test('calls axios.get with the passed route and params', () => {
        const route = 'some-route';
        const params = { some: 'params' };

        ApiModel.read({ route, params });
        expect(axios.get).toBeCalledWith(route, { params });
      });

      describe('when the promise errors', () => {
        test('warns in console', async () => {
          jest.spyOn(console, 'warn').mockImplementation();
          axios.get.mockReturnValue(q.reject());

          const route = 'some-route';
          const params = { some: 'params' };

          await ApiModel.read({ route, params });

          expect(console.warn).toBeCalledWith('read errored'); // eslint-disable-line no-console

          console.warn.mockRestore(); // eslint-disable-line no-console
        });
      });

      test('returns a promise from axios.get', async () => {
        const route = 'some-route';
        const params = { some: 'params' };
        const callback = jest.fn();

        expect.assertions(1);
        await ApiModel.read({ route, params }).then(() => callback()).finally(() => {
          expect(callback).toBeCalled();
        });
      });
    });
  });

  describe('instance methods', () => {
    describe('read', () => {
      let promise;

      beforeEach(() => {
        promise = q.when({});
        jest.spyOn(axios, 'get').mockReturnValue(promise);
      });

      afterEach(() => {
        promise = null;
      });

      describe('when no parameters are passed', () => {
        test('throws error via static read', () => {
          expect(() => apiModel.read()).toThrowError(
            `${ApiModel.displayName}: static read: cannot read without route`
          );
        });
      });

      test('calls static read with idName merged into params', () => {
        jest.spyOn(ApiModel, 'read');
        const id = 'id';
        apiModel.id = id;

        const route = 'some-route';
        const params = { some: 'params' };
        const expectedParams = _.assign({}, params, { id });

        apiModel.read({ route, params });
        expect(ApiModel.read).toBeCalledWith({ route, params: expectedParams });
      });

      test('returns result of ApiModel.read', async () => {
        const route = 'some-route';
        const params = { some: 'params' };
        const callback = jest.fn();

        expect.assertions(1);
        await apiModel.read({ route, params }).then(() => callback()).finally(() => {
          expect(callback).toBeCalled();
        });
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
