import axios from 'axios';
import _ from 'lodash';
import q from 'q';

import BaseAPIObject from './base-api-object.js';

class MappingTestBaseObject extends BaseAPIObject {
  static responseMap = {
    mappingId: 'mapping_id',
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static displayName = 'MappingTestBaseObject';

  static idName = 'mappingId';
}

class TestBaseAPIObject extends BaseAPIObject {
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
      BaseAPIObject: MappingTestBaseObject
    },
    someObjects: {
      key: 'someObjects',
      BaseAPIObject: MappingTestBaseObject,
      isArray: true
    },
    someManualObject: {
      key: 'manual',
      manualParse: jest.fn()
    },
    someManualAndBaseObject: {
      key: 'both',
      BaseAPIObject: MappingTestBaseObject,
      manualParse: jest.fn()
    },
    someDeferredObject: {
      key: 'deferred',
      BaseAPIObject: MappingTestBaseObject,
      defer: true,
      manualParse: jest.fn()
    }
  };

  static route = 'fake/route';

  static displayName = 'TestBaseAPIObject';

  static idName = 'testId';
}

describe('BaseAPIObject', () => {
  describe('class methods', () => {
    describe('setCookies', () => {
      test('sets cookies onto class for use with all requests', () => {
        const espnS2 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
        const SWID = '{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxxxxxxx}';

        TestBaseAPIObject.setCookies({ espnS2, SWID });
        expect(TestBaseAPIObject._espnS2).toBe(espnS2);
        expect(TestBaseAPIObject._SWID).toBe(SWID);

        TestBaseAPIObject.setCookies({}); // Reset for later tests
      });
    });

    describe('read', () => {
      let deferred;
      let id;
      let instance;
      let params;
      let reload;

      beforeEach(() => {
        deferred = q.defer();
        id = 121340;
        instance = new TestBaseAPIObject();
        params = { some: 'param' };
        reload = true;

        jest.spyOn(axios, 'get').mockReturnValue(deferred.promise);
      });

      afterEach(() => {
        deferred = null;
        id = null;
        instance = null;
        params = null;
        reload = null;
      });

      const testReadBehaviorWithObject = () => {
        describe('when cookies are set', () => {
          test('calls axios.get with route, params, headers, and the correct config', () => {
            const route = 'some-route';
            const espnS2 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
            const SWID = '{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxxxxxxx}';

            TestBaseAPIObject.setCookies({ espnS2, SWID });

            TestBaseAPIObject.read({ instance, route, params });
            expect(axios.get).toBeCalledWith(route, {
              params, headers: { Cookie: `espnS2:${espnS2};SWID${SWID};` }, withCredientials: true
            });

            TestBaseAPIObject.setCookies({}); // Reset for later tests
          });
        });

        describe('when cookies are not set', () => {
          test('calls axios.get with route, params, and the correct config', () => {
            const route = 'some-route';

            TestBaseAPIObject.read({ instance, route, params });
            expect(axios.get).toBeCalledWith(route, {
              params, headers: undefined, withCredientials: false
            });
          });
        });

        test('returns a promise from axios.get', async () => {
          const route = 'some-route';
          const callback = jest.fn();
          deferred.resolve({});

          expect.assertions(1);
          await TestBaseAPIObject.read({
            instance, route, params, reload
          }).then(
            () => callback()
          ).finally(() => {
            expect(callback).toBeCalled();
          });
        });

        describe('when the read promise resolves', () => {
          test('calls _populateObject', async () => {
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, '_populateObject');

            deferred.resolve(response);

            await TestBaseAPIObject.read({ instance, params, reload });
            expect(TestBaseAPIObject._populateObject).toBeCalledWith({
              data: response.data,
              constructorParams: params,
              instance,
              isDataFromServer: true
            });
          });

          test('returns built instance for chaining', async () => {
            const builtObject = new TestBaseAPIObject();
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, '_populateObject').mockReturnValue(builtObject);

            deferred.resolve(response);

            const returnedObject = await TestBaseAPIObject.read({ instance, params, reload });
            expect(returnedObject).toBe(builtObject);
          });
        });

        describe('when the read errors', () => {
          test('throws error', async () => {
            const error = 'some error';
            axios.get.mockReturnValue(q.reject(error));

            deferred.reject();
            expect.assertions(1);

            try {
              await TestBaseAPIObject.read({ params });
            } catch (e) {
              expect(e).toBe(error);
            }
          });
        });
      };

      const testReadBehaviorWithoutObject = () => {
        describe('when cookies are set', () => {
          test('calls axios.get with route, params, headers, and the correct config', () => {
            const route = 'some-route';
            const espnS2 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
            const SWID = '{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxxxxxxx}';

            TestBaseAPIObject.setCookies({ espnS2, SWID });

            TestBaseAPIObject.read({ route, params });
            expect(axios.get).toBeCalledWith(route, {
              params, headers: { Cookie: `espnS2:${espnS2};SWID${SWID};` }, withCredientials: true
            });

            TestBaseAPIObject.setCookies({}); // Reset for later tests
          });
        });

        describe('when cookies are not set', () => {
          test('calls axios.get with route, params, and the correct config', () => {
            const route = 'some-route';

            TestBaseAPIObject.read({ route, params });
            expect(axios.get).toBeCalledWith(route, {
              params, headers: undefined, withCredientials: false
            });
          });
        });

        test('returns a promise from axios.get', async () => {
          const route = 'some-route';
          const callback = jest.fn();
          deferred.resolve({});

          expect.assertions(1);
          await TestBaseAPIObject.read({ route, params, reload }).then(
            () => callback()
          ).finally(() => {
            expect(callback).toBeCalled();
          });
        });

        describe('when the read promise resolves', () => {
          test('calls buildFromServer', async () => {
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, 'buildFromServer');

            deferred.resolve(response);

            await TestBaseAPIObject.read({ params, reload });
            expect(TestBaseAPIObject.buildFromServer).toBeCalledWith(response.data, params);
          });

          test('returns built instance for chaining', async () => {
            const builtObject = new TestBaseAPIObject();
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, 'buildFromServer').mockReturnValue(builtObject);

            deferred.resolve(response);

            const returnedObject = await TestBaseAPIObject.read({ params, reload });
            expect(returnedObject).toBe(builtObject);
          });
        });

        describe('when the read errors', () => {
          test('throws error', async () => {
            const error = 'some error';
            axios.get.mockReturnValue(q.reject(error));

            deferred.reject();
            expect.assertions(1);

            try {
              await TestBaseAPIObject.read({ params, reload });
            } catch (e) {
              expect(e).toBe(error);
            }
          });
        });
      };

      const testCacheBehavior = () => {
        test('returns cached instance', async () => {
          const returnedObject = await TestBaseAPIObject.read({ instance, params, reload });
          expect(returnedObject).toBe(TestBaseAPIObject.cache[id]);
        });
      };

      describe('when route is null', () => {
        test('throws error via static read', () => {
          expect(() => TestBaseAPIObject.read({ route: null })).toThrowError(
            `${TestBaseAPIObject.displayName}: static read: cannot read without route`
          );
        });
      });

      describe('when route is not passed', () => {
        test('defaults to static route', () => {
          expect(() => TestBaseAPIObject.read()).not.toThrowError();
          expect(axios.get).toBeCalledWith(TestBaseAPIObject.route, {
            params: undefined, headers: undefined, withCredientials: false
          });
        });
      });

      describe('when no parameters are passed', () => {
        test('defaults to static route and reloads', () => {
          expect(() => TestBaseAPIObject.read()).not.toThrowError();
          expect(axios.get).toBeCalledWith(TestBaseAPIObject.route, {
            params: undefined, headers: undefined, withCredientials: false
          });
        });
      });

      describe('when instance is passed', () => {
        beforeEach(() => {
          instance = new TestBaseAPIObject();
        });

        describe('when idName is defined on the passed params', () => {
          beforeEach(() => {
            params.testId = id;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = instance;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = instance;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });
          });
        });

        describe('when idName is not defined on the passed params', () => {
          beforeEach(() => {
            delete params.testId;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = instance;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = instance;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                instance.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithObject();
            });
          });
        });
      });

      describe('when instance is not passed', () => {
        beforeEach(() => {
          instance = undefined;
        });

        describe('when idName is defined on the passed params', () => {
          beforeEach(() => {
            params.testId = id;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });
          });
        });

        describe('when idName is not defined on the passed params', () => {
          beforeEach(() => {
            delete params.testId;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached instance has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });

            describe('when no matching instance is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutObject();
            });
          });
        });
      });
    });
  });

  describe('instance methods', () => {
    let baseAPIObject;

    beforeEach(() => {
      baseAPIObject = new TestBaseAPIObject();
    });

    afterEach(() => {
      baseAPIObject = null;
    });

    describe('read', () => {
      let deferred;

      beforeEach(() => {
        deferred = q.defer();
        jest.spyOn(axios, 'get').mockReturnValue(deferred.promise);
      });

      afterEach(() => {
        deferred = null;
      });

      describe('when no params are passed to the method', () => {
        test('calls static read with idName merged into params', () => {
          jest.spyOn(TestBaseAPIObject, 'read');

          const id = 1232;
          baseAPIObject.testId = id;

          const expectedParams = _.assign({}, { testId: id });

          baseAPIObject.read();
          expect(TestBaseAPIObject.read).toBeCalledWith({
            route: TestBaseAPIObject.route,
            instance: baseAPIObject,
            params: expectedParams,
            reload: true
          });
        });

        test('returns result of static read', async () => {
          const route = 'some-route';
          const params = { some: 'params' };
          baseAPIObject.testId = 42;

          deferred.resolve({});

          expect.assertions(1);
          const returnedResult = await baseAPIObject.read({ route, params });
          expect(returnedResult).toBeInstanceOf(TestBaseAPIObject);
        });
      });

      describe('when route is not passed', () => {
        test('calls static read with idName merged into params', () => {
          jest.spyOn(TestBaseAPIObject, 'read');

          const id = 1232;
          baseAPIObject.testId = id;

          const params = { some: 'params' };
          const expectedParams = _.assign({}, params, { testId: id });

          baseAPIObject.read({ params });
          expect(TestBaseAPIObject.read).toBeCalledWith({
            route: TestBaseAPIObject.route,
            instance: baseAPIObject,
            params: expectedParams,
            reload: true
          });
        });

        test('returns result of static read', async () => {
          const route = 'some-route';
          const params = { some: 'params' };
          baseAPIObject.testId = 42;

          deferred.resolve({});

          expect.assertions(1);
          const returnedResult = await baseAPIObject.read({ route, params });
          expect(returnedResult).toBeInstanceOf(TestBaseAPIObject);
        });
      });

      test('calls static read with idName merged into params', () => {
        jest.spyOn(TestBaseAPIObject, 'read');
        const id = 1232;
        baseAPIObject.testId = id;

        const params = { some: 'params' };
        const expectedParams = _.assign({}, params, { testId: id });

        baseAPIObject.read({ params });
        expect(TestBaseAPIObject.read).toBeCalledWith({
          route: TestBaseAPIObject.route,
          instance: baseAPIObject,
          params: expectedParams,
          reload: true
        });
      });

      test('returns result of static read', async () => {
        const route = 'some-route';
        const params = { some: 'params' };
        baseAPIObject.testId = 42;

        deferred.resolve({});

        expect.assertions(1);
        const returnedResult = await baseAPIObject.read({ route, params });
        expect(returnedResult).toBeInstanceOf(TestBaseAPIObject);
      });
    });
  });
});
