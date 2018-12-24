import axios from 'axios';
import _ from 'lodash';
import q from 'q';

import ApiModel from './api-model.js';

class MapObjectErrorApiModel extends ApiModel {
  static responseMap = {
    invalid: 34
  };

  static displayName = 'MapObjectErrorApiModel';
}

class KeyErrorTestApiModel extends ApiModel {
  static responseMap = {
    invalidObjectWithoutKey: {
      ApiModel
    }
  };

  static displayName = 'KeyErrorTestApiModel';
}

class ModelObjectErrorTestApiModel extends ApiModel {
  static responseMap = {
    invalidObjectWithoutApiModel: {
      key: 'failed_key'
    }
  };

  static displayName = 'ModelObjectErrorTestApiModel';
}

class MappingTestApiModel extends ApiModel {
  static responseMap = {
    mappingId: 'mapping_id',
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static displayName = 'MappingTestApiModel';

  static idName = 'mappingId';
}

class TestApiModel extends ApiModel {
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
      ApiModel: MappingTestApiModel
    },
    someModels: {
      key: 'map_models',
      ApiModel: MappingTestApiModel,
      isArray: true
    }
  };

  static route = 'fake/route';

  static displayName = 'TestApiModel';

  static idName = 'testId';
}

describe('ApiModel', () => {
  let apiModel;

  beforeEach(() => {
    apiModel = new TestApiModel();
  });

  afterEach(() => {
    apiModel = null;
  });

  describe('constructor', () => {
    describe('when options are passed', () => {
      test('calls _populateApiModel to populate instance with local data', () => {
        jest.spyOn(ApiModel, '_populateApiModel');
        const options = { someValue: 'yeahhhhhhhhhhh' };

        const returnedModel = new TestApiModel(options);
        expect(TestApiModel._populateApiModel).toBeCalledWith({
          data: options,
          model: returnedModel,
          isDataFromServer: false
        });
      });
    });

    describe('when options are not passed', () => {
      test('calls _populateApiModel to populate instance with local data', () => {
        jest.spyOn(ApiModel, '_populateApiModel');
        const options = { someValue: 'yeahhhhhhhhhhh' };

        const returnedModel = new TestApiModel(options);
        expect(TestApiModel._populateApiModel).toBeCalledWith({
          data: options,
          model: returnedModel,
          isDataFromServer: false
        });
      });
    });
  });

  describe('class methods', () => {
    describe('_populateApiModel', () => {
      let data, model;

      beforeEach(() => {
        data = {
          testId: 42,
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

      describe('when a model is not passed', () => {
        test('throws error', () => {
          expect(() => TestApiModel._populateApiModel({ data })).toThrowError(
            `${TestApiModel.displayName}: _populateApiModel: Did not receive model to populate`
          );
        });
      });

      describe('when data is not passed', () => {
        test('returns model without mutation', () => {
          const returnedModel = TestApiModel._populateApiModel({ model });
          expect(returnedModel).toBe(model);
          expect(returnedModel.testId).toBeUndefined();
          expect(returnedModel.someValue).toBeUndefined();
          expect(returnedModel.nested).toBeUndefined();
        });
      });

      describe('responseMap mapping', () => {
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

          describe('when a value in the static responseMap is a string', () => {
            test('directly maps the response attribute at that value', () => {
              data = { some_value: 'some server data' };

              const returnedModel = TestApiModel._populateApiModel({
                data,
                model,
                isDataFromServer: true
              });
              expect(returnedModel.someValue).toBe(data.some_value);
            });
          });

          describe('when a value in the static responseMap is a plain object', () => {
            describe('when the object does not define key', () => {
              test('throws error', () => {
                expect(
                  () => KeyErrorTestApiModel._populateApiModel({
                    data,
                    model,
                    isDataFromServer: true
                  })
                ).toThrowError(
                  `${KeyErrorTestApiModel.displayName}: _populateApiModel: Invalid responseMap ` +
                  'object. Object must define key and ApiModel. See docs for typedef of ' +
                  'ResponseMapValueObject.'
                );
              });
            });

            describe('when the object does not define ApiModel', () => {
              test('throws error', () => {
                expect(
                  () => ModelObjectErrorTestApiModel._populateApiModel({
                    data,
                    model,
                    isDataFromServer: true
                  })
                ).toThrowError(
                  `${ModelObjectErrorTestApiModel.displayName}: _populateApiModel: Invalid ` +
                  'responseMap object. Object must define key and ApiModel. See docs for ' +
                  'typedef of ResponseMapValueObject.'
                );
              });
            });

            describe('when the object defines key and ApiModel', () => {
              describe('when the object specifies isArray: true', () => {
                test('maps the data to instances of the ApiModel defined on the object', () => {
                  data = {
                    map_models: [{
                      mapping_id: 1,
                      some_value: 'works recursively too'
                    }, {
                      mapping_id: 2,
                      nested: {
                        item: 'also works recursively'
                      }
                    }]
                  };

                  const returnedModel = TestApiModel._populateApiModel({
                    data, model, isDataFromServer: true
                  });

                  expect.assertions(2 * 4);
                  _.forEach(returnedModel.someModels, (populatedModel, index) => {
                    expect(populatedModel).toBeInstanceOf(MappingTestApiModel);

                    expect(populatedModel.mappingId).toBe(data.map_models[index].mapping_id);
                    expect(populatedModel.someValue).toBe(data.map_models[index].some_value);
                    expect(populatedModel.someNestedData).toBe(
                      _.get(data.map_models[index], 'nested.item')
                    );
                  });
                });
              });

              describe('when the object specifies isArray: false', () => {
                test('maps the data to an instance of the ApiModel defined on the object', () => {
                  data = {
                    map_model: {
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    }
                  };

                  const returnedModel = TestApiModel._populateApiModel({
                    data, model, isDataFromServer: true
                  });

                  const populatedModel = returnedModel.someModel;
                  expect(populatedModel).toBeInstanceOf(MappingTestApiModel);

                  expect(populatedModel.mappingId).toBe(data.map_model.mapping_id);
                  expect(populatedModel.someValue).toBe(data.map_model.some_value);
                  expect(populatedModel.someNestedData).toBe(
                    _.get(data.map_model, 'nested.item')
                  );
                });
              });
            });
          });

          describe('when a value in the static responseMap is not a string or valid object', () => {
            test('throws error', () => {
              expect(
                () => MapObjectErrorApiModel._populateApiModel({
                  data, model, isDataFromServer: true
                })
              ).toThrowError(
                `${MapObjectErrorApiModel.displayName}: _populateApiModel: Did not recognize ` +
                'responseMap value type for key invalid'
              );
            });
          });
        });

        describe('when isDataFromServer is false', () => {
          beforeEach(() => {
            data = {
              someValue: 'some value',
              someNestedData: 'some nested data'
            };
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

          describe('when a value in the static responseMap is a string', () => {
            test('maps the data attribute at the map key, ignoring the map value', () => {
              data = { someValue: 'some server data' };

              const returnedModel = TestApiModel._populateApiModel({
                data,
                model,
                isDataFromServer: false
              });
              expect(returnedModel.someValue).toBe(data.someValue);
            });
          });

          describe('when a value in the static responseMap is a plain object', () => {
            describe('when the object does not define key', () => {
              test('maps the data attribute at the map key, ignoring the map value', () => {
                data = { invalidObjectWithoutKey: 'works' };
                const returnedModel = KeyErrorTestApiModel._populateApiModel({
                  data,
                  model,
                  isDataFromServer: false
                });

                expect(returnedModel.invalidObjectWithoutKey).toBe(data.invalidObjectWithoutKey);
              });
            });

            describe('when the object does not define ApiModel', () => {
              test('maps the data attribute at the map key, ignoring the map value', () => {
                data = { invalidObjectWithoutApiModel: 'works' };
                const returnedModel = ModelObjectErrorTestApiModel._populateApiModel({
                  data,
                  model,
                  isDataFromServer: false
                });


                expect(returnedModel.invalidObjectWithoutApiModel).toBe(
                  data.invalidObjectWithoutApiModel
                );
              });
            });

            describe('when the object defines key and ApiModel', () => {
              describe('when the object specifies isArray: true', () => {
                test('maps the data attribute at the map key, ignoring the map value', () => {
                  const array = [
                    new MappingTestApiModel({
                      mapping_id: 1,
                      some_value: 'works recursively too'
                    }),
                    new MappingTestApiModel({
                      mapping_id: 2,
                      nested: {
                        item: 'also works recursively'
                      }
                    })
                  ];
                  data = {
                    someModels: array
                  };

                  const returnedModel = TestApiModel._populateApiModel({
                    data, model, isDataFromServer: false
                  });

                  expect(returnedModel.someModels).toBe(array);
                });
              });

              describe('when the object specifies isArray: false', () => {
                test('maps the data to an instance of the ApiModel defined on the object', () => {
                  data = {
                    someModel: new MappingTestApiModel({
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    })
                  };

                  const returnedModel = TestApiModel._populateApiModel({
                    data, model, isDataFromServer: false
                  });

                  expect(returnedModel.someModel).toBe(data.someModel);
                });
              });
            });
          });

          describe('when a value in the static responseMap is not a string or valid object', () => {
            test('maps the data to an instance of the ApiModel defined on the object', () => {
              data = { invalid: 'works' };

              const returnedModel = MapObjectErrorApiModel._populateApiModel({
                data, model, isDataFromServer: false
              });

              expect(returnedModel.invalid).toBe(data.invalid);
            });
          });
        });
      });

      describe('when isDataFromServer is true', () => {
        test('sets model in cache', () => {
          TestApiModel.clearCache();

          TestApiModel._populateApiModel({ data, model, isDataFromServer: true });
          expect(_.get(TestApiModel.cache, data.testId)).toBe(model);
        });
      });

      describe('when isDataFromServer is false', () => {
        test('does not set model in cache', () => {
          TestApiModel.clearCache();

          TestApiModel._populateApiModel({ data, model, isDataFromServer: false });
          expect(_.get(TestApiModel.cache, data.testId)).toBeUndefined();
        });
      });

      test('returns passed model', () => {
        const passedModel = new TestApiModel();
        const returnedModel = TestApiModel._populateApiModel({ data, model: passedModel });
        expect(returnedModel).toBe(passedModel);
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
          TestApiModel._cache = undefined;
        });

        test('sets _cache to an empty object', () => {
          TestApiModel.cache;
          expect(TestApiModel._cache).toEqual({});
        });

        test('returns empty object', () => {
          expect(TestApiModel.cache).toEqual({});
        });
      });

      describe('when _cache is set', () => {
        test('does not mutate _cache', () => {
          const cache = { some: 'cache' };
          TestApiModel._cache = cache;

          TestApiModel.cache;
          expect(TestApiModel._cache).toBe(cache);
        });

        test('returns _cache', () => {
          const cache = { some: 'cache' };

          TestApiModel._cache = cache;
          expect(TestApiModel.cache).toBe(cache);
        });
      });
    });

    describe('set cache', () => {
      beforeEach(() => {
        TestApiModel._cache = undefined;
      });

      test('sets _cache', () => {
        const cache = { some: 'cache' };

        TestApiModel.cache = cache;
        expect(TestApiModel._cache).toBe(cache);
      });
    });

    describe('clearCache', () => {
      test('sets cache to empty object', () => {
        TestApiModel.cache = { some: 'cached items' };

        TestApiModel.clearCache();
        expect(TestApiModel.cache).toEqual({});
      });
    });

    describe('read', () => {
      let deferred, id, model, params, reload;

      beforeEach(() => {
        deferred = q.defer();
        id = 121340;
        model = new TestApiModel();
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

          TestApiModel.read({ route, params });
          expect(axios.get).toBeCalledWith(route, { params });
        });

        test('returns a promise from axios.get', async () => {
          const route = 'some-route';
          const callback = jest.fn();
          deferred.resolve({});

          expect.assertions(1);
          await TestApiModel.read({ route, params, reload }).then(() => callback()).finally(() => {
            expect(callback).toBeCalled();
          });
        });

        describe('when the read promise resolves', () => {
          test('calls _populateApiModel', async () => {
            const response = { data: {} };

            jest.spyOn(TestApiModel, '_populateApiModel');

            deferred.resolve(response);

            await TestApiModel.read({ model, params, reload });
            expect(TestApiModel._populateApiModel).toBeCalledWith({
              data: response.data,
              model,
              isDataFromServer: true
            });
          });

          test('returns built model for chaining', async () => {
            const builtModel = new TestApiModel();
            const response = { data: {} };

            jest.spyOn(TestApiModel, '_populateApiModel').mockReturnValue(builtModel);

            deferred.resolve(response);

            const returnedModel = await TestApiModel.read({ model, params, reload });
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
              await TestApiModel.read({ params });
            } catch (e) {
              expect(e).toBe(error);
            }
          });
        });
      };

      const testReadBehaviorWithoutModel = () => {
        test('calls axios.get with route and params', () => {
          const route = 'some-route';

          TestApiModel.read({ route, params });
          expect(axios.get).toBeCalledWith(route, { params });
        });

        test('returns a promise from axios.get', async () => {
          const route = 'some-route';
          const callback = jest.fn();
          deferred.resolve({});

          expect.assertions(1);
          await TestApiModel.read({ route, params, reload }).then(() => callback()).finally(() => {
            expect(callback).toBeCalled();
          });
        });

        describe('when the read promise resolves', () => {
          test('calls buildFromServer', async () => {
            const response = { data: {} };

            jest.spyOn(TestApiModel, 'buildFromServer');

            deferred.resolve(response);

            await TestApiModel.read({ params, reload });
            expect(TestApiModel.buildFromServer).toBeCalledWith(response.data);
          });

          test('returns built model for chaining', async () => {
            const builtModel = new TestApiModel();
            const response = { data: {} };

            jest.spyOn(TestApiModel, 'buildFromServer').mockReturnValue(builtModel);

            deferred.resolve(response);

            const returnedModel = await TestApiModel.read({ params, reload });
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
              await TestApiModel.read({ params, reload });
            } catch (e) {
              expect(e).toBe(error);
            }
          });
        });
      };

      const testCacheBehavior = () => {
        test('returns cached model', async () => {
          const returnedModel = await TestApiModel.read({ model, params, reload });
          expect(returnedModel).toBe(TestApiModel.cache[id]);
        });
      };

      describe('when route is null', () => {
        test('throws error via static read', () => {
          expect(() => TestApiModel.read({ route: null })).toThrowError(
            `${TestApiModel.displayName}: static read: cannot read without route`
          );
        });
      });

      describe('when route is not passed', () => {
        test('defaults to static route', () => {
          expect(() => TestApiModel.read()).not.toThrowError();
          expect(axios.get).toBeCalledWith(TestApiModel.route, { params: undefined });
        });
      });

      describe('when no parameters are passed', () => {
        test('defaults to static route and reloads', () => {
          expect(() => TestApiModel.read()).not.toThrowError();
          expect(axios.get).toBeCalledWith(TestApiModel.route, { params: undefined });
        });
      });

      describe('when model is passed', () => {
        beforeEach(() => {
          model = new TestApiModel();
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
                TestApiModel.cache[id] = model;
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = model;
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = model;
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = model;
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                model.testId = id;
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = new TestApiModel({ testId: id });
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = new TestApiModel({ testId: id });
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testCacheBehavior();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = new TestApiModel({ testId: id });
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
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
                TestApiModel.cache[id] = new TestApiModel({ testId: id });
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithoutModel();
            });

            describe('when no matching model is found in the cache', () => {
              beforeEach(() => {
                TestApiModel.cache[id] = undefined;
              });

              afterEach(() => {
                TestApiModel.clearCache();
              });

              testReadBehaviorWithoutModel();
            });
          });
        });
      });
    });
  });

  describe('instance methods', () => {
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
          expect(() => apiModel.read()).toThrowError(
            `${TestApiModel.displayName}: static read: cannot read on instance without an id`
          );
        });
      });

      test('calls static read with idName merged into params', () => {
        jest.spyOn(TestApiModel, 'read');
        const id = 'id';
        apiModel.testId = id;

        const route = 'some-route';
        const params = { some: 'params' };
        const expectedParams = _.assign({}, params, { testId: id });

        apiModel.read({ route, params });
        expect(TestApiModel.read).toBeCalledWith({
          route, model: apiModel, params: expectedParams, reload: true
        });
      });

      test('returns result of static read', async () => {
        const route = 'some-route';
        const params = { some: 'params' };
        apiModel.testId = 42;

        deferred.resolve({});

        expect.assertions(1);
        const returnedResult = await apiModel.read({ route, params });
        expect(returnedResult).toBeInstanceOf(TestApiModel);
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
