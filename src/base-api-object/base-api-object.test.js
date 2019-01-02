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
    someModel: {
      key: 'map_model',
      BaseAPIObject: MappingTestBaseObject
    },
    someModels: {
      key: 'map_models',
      BaseAPIObject: MappingTestBaseObject,
      isArray: true
    },
    someManualModel: {
      key: 'manual',
      manualParse: jest.fn()
    },
    someManualAndBaseObject: {
      key: 'both',
      BaseAPIObject: MappingTestBaseObject,
      manualParse: jest.fn()
    },
    someDeferredModel: {
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
    describe('read', () => {
      let deferred, id, model, params, reload;

      beforeEach(() => {
        deferred = q.defer();
        id = 121340;
        model = new TestBaseAPIObject();
        params = { some: 'param' };
        reload = true;

        jest.spyOn(axios, 'get').mockReturnValue(deferred.promise);
      });

      afterEach(() => {
        deferred = id = model = params = reload = null;
      });

      const testReadBehaviorWithModel = () => {
        test('calls axios.get with route and params', () => {
          const route = 'some-route';

          TestBaseAPIObject.read({ route, params });
          expect(axios.get).toBeCalledWith(route, { params });
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
          test('calls _populateObject', async () => {
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, '_populateObject');

            deferred.resolve(response);

            await TestBaseAPIObject.read({ model, params, reload });
            expect(TestBaseAPIObject._populateObject).toBeCalledWith({
              data: response.data,
              model,
              isDataFromServer: true
            });
          });

          test('returns built model for chaining', async () => {
            const builtModel = new TestBaseAPIObject();
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, '_populateObject').mockReturnValue(builtModel);

            deferred.resolve(response);

            const returnedModel = await TestBaseAPIObject.read({ model, params, reload });
            expect(returnedModel).toBe(builtModel);
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

      const testReadBehaviorWithoutModel = () => {
        test('calls axios.get with route and params', () => {
          const route = 'some-route';

          TestBaseAPIObject.read({ route, params });
          expect(axios.get).toBeCalledWith(route, { params });
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
            expect(TestBaseAPIObject.buildFromServer).toBeCalledWith(response.data);
          });

          test('returns built model for chaining', async () => {
            const builtModel = new TestBaseAPIObject();
            const response = { data: {} };

            jest.spyOn(TestBaseAPIObject, 'buildFromServer').mockReturnValue(builtModel);

            deferred.resolve(response);

            const returnedModel = await TestBaseAPIObject.read({ params, reload });
            expect(returnedModel).toBe(builtModel);
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
        test('returns cached model', async () => {
          const returnedModel = await TestBaseAPIObject.read({ model, params, reload });
          expect(returnedModel).toBe(TestBaseAPIObject.cache[id]);
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
          expect(axios.get).toBeCalledWith(TestBaseAPIObject.route, { params: undefined });
        });
      });

      describe('when no parameters are passed', () => {
        test('defaults to static route and reloads', () => {
          expect(() => TestBaseAPIObject.read()).not.toThrowError();
          expect(axios.get).toBeCalledWith(TestBaseAPIObject.route, { params: undefined });
        });
      });

      describe('when model is passed', () => {
        beforeEach(() => {
          model = new TestBaseAPIObject();
        });

        describe('when idName is defined on the passed params', () => {
          beforeEach(() => {
            params.testId = id;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = model;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = model;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
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

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = model;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = model;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithModel();
            });
          });
        });
      });

      describe('when model is not passed', () => {
        beforeEach(() => {
          model = undefined;
        });

        describe('when idName is defined on the passed params', () => {
          beforeEach(() => {
            params.testId = id;
          });

          describe('when reload is true', () => {
            beforeEach(() => {
              reload = true;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
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

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
            });
          });

          describe('when reload is false', () => {
            beforeEach(() => {
              reload = false;
            });

            describe('when a cached model has a matching id', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = new TestBaseAPIObject({ testId: id });
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestBaseAPIObject.cache[id] = undefined;
              });

              afterEach(() => {
                TestBaseAPIObject.clearCache();
              });

              testReadBehaviorWithoutModel();
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

      describe('when no parameters are passed', () => {
        test('throws error via static read', () => {
          expect(() => baseAPIObject.read()).toThrowError(
            `${TestBaseAPIObject.displayName}: static read: cannot read on instance without an id`
          );
        });
      });

      describe('when route is not passed', () => {
        test('calls static read with idName merged into params', () => {
          jest.spyOn(TestBaseAPIObject, 'read');
          const id = 'id';
          baseAPIObject.testId = id;

          const params = { some: 'params' };
          const expectedParams = _.assign({}, params, { testId: id });

          baseAPIObject.read({ params });
          expect(TestBaseAPIObject.read).toBeCalledWith({
            route: TestBaseAPIObject.route,
            model: baseAPIObject,
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
        const id = 'id';
        baseAPIObject.testId = id;

        const params = { some: 'params' };
        const expectedParams = _.assign({}, params, { testId: id });

        baseAPIObject.read({ params });
        expect(TestBaseAPIObject.read).toBeCalledWith({
          route: TestBaseAPIObject.route,
          model: baseAPIObject,
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
