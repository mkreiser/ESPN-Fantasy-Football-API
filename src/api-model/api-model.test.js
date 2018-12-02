import axios from 'axios';
import _ from 'lodash';

import ApiModel from './api-model.js';

describe('ApiModel', () => {
  let apiModel;

  beforeEach(() => {
    apiModel = new ApiModel();
  });

  afterEach(() => {
    apiModel = null;
  });

  describe('class methods', () => {
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
        test('calls axios.get', () => {
          jest.spyOn(axios, 'get').mockImplementation();

          ApiModel.read();
          expect(axios.get).toBeCalledWith(undefined, undefined);
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
        test('calls static read', () => {
          apiModel.read();
          expect(ApiModel.read).toBeCalledWith({
            route: undefined,
            params: {
              id: undefined
            }
          });
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
  });
});
