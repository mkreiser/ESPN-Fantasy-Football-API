import _ from 'lodash';

import BaseObject from './base-object.js';

class MapObjectErrorBaseObject extends BaseObject {
  static responseMap = {
    invalid: 34
  };

  static displayName = 'MapObjectErrorBaseObject';
}

class KeyErrorTestBaseObject extends BaseObject {
  static responseMap = {
    invalidObjectWithoutKey: {
      BaseObject
    }
  };

  static displayName = 'KeyErrorTestBaseObject';
}

class ModelObjectErrorTestBaseObject extends BaseObject {
  static responseMap = {
    invalidObjectWithoutBaseObject: {
      key: 'failed_key'
    }
  };

  static displayName = 'ModelObjectErrorTestBaseObject';
}

class MappingTestBaseObject extends BaseObject {
  static responseMap = {
    mappingId: 'mapping_id',
    someValue: 'some_value',
    someNestedData: 'nested.item'
  };

  static displayName = 'MappingTestBaseObject';

  static idName = 'mappingId';
}

class TestBaseObject extends BaseObject {
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

  static route = 'fake/route';

  static displayName = 'TestBaseObject';

  static idName = 'testId';
}

describe('BaseObject', () => {
  describe('constructor', () => {
    describe('when options are passed', () => {
      test('calls _populateObject with local data', () => {
        jest.spyOn(BaseObject, '_populateObject');
        const options = { someValue: 'yeahhhhhhhhhhh' };

        const returnedModel = new TestBaseObject(options);
        expect(TestBaseObject._populateObject).toBeCalledWith({
          data: options,
          model: returnedModel,
          isDataFromServer: false
        });
      });

      test('populates instance with local data', () => {
        const options = { someValue: 'yeahhhhhhhhhhh' };

        const returnedModel = new TestBaseObject(options);
        expect(returnedModel.someValue).toBe(options.someValue);
      });
    });

    describe('when options are not passed', () => {
      test('does not call _populateObject', () => {
        jest.spyOn(BaseObject, '_populateObject');

        new TestBaseObject(); // eslint-disable-line no-new
        expect(TestBaseObject._populateObject).not.toBeCalled();
      });
    });
  });

  describe('class methods', () => {
    describe('_populateObject', () => {
      let data, model, isDataFromServer;

      beforeEach(() => {
        data = {
          testId: 42,
          some_value: 'some item',
          nested: {
            item: 'some nested item'
          }
        };
        model = new TestBaseObject();
      });

      afterEach(() => {
        data = model = isDataFromServer = null;
      });

      const callPopulate = (Klass = TestBaseObject) => Klass._populateObject({
        data, model, isDataFromServer
      });

      describe('when a model is not passed', () => {
        test('throws error', () => {
          expect(() => TestBaseObject._populateObject({ data })).toThrowError(
            `${TestBaseObject.displayName}: _populateObject: Did not receive model to populate`
          );
        });
      });

      describe('when data is not passed', () => {
        test('returns model without mutation', () => {
          const returnedModel = TestBaseObject._populateObject({ model });

          expect(returnedModel).toBe(model);

          expect(returnedModel.testId).toBeUndefined();
          expect(returnedModel.someValue).toBeUndefined();
          expect(returnedModel.someNestedData).toBeUndefined();

          expect(returnedModel.someModels).toBeUndefined();
          expect(returnedModel.someManualModel).toBeUndefined();
          expect(returnedModel.someManualAndBaseObject).toBeUndefined();
          expect(returnedModel.someDeferredModel).toBeUndefined();
        });
      });

      describe('responseMap mapping', () => {
        describe('when isDataFromServer is true', () => {
          beforeEach(() => {
            isDataFromServer = true;
          });

          test('does not map keys not defined in responseMap', () => {
            data = { notInMap: 'some wack stuff' };

            const returnedModel = callPopulate();
            expect(returnedModel.notInMap).toBeUndefined();
          });

          test('does not map data passed in the form of local (non-server) data', () => {
            data = { someValue: 'some server data' };

            const returnedModel = callPopulate();
            expect(returnedModel.someValue).toBeUndefined();
            expect(returnedModel.some_value).toBeUndefined();
          });

          describe('when a value in the static responseMap is a string', () => {
            const testMapsDataToStringKey = ({ value, valueString }) => {
              describe(`when the passed data at the key is ${valueString}`, () => {
                test(`assigns ${valueString} to the model at the correct key`, () => {
                  data = { some_value: value };

                  const returnedModel = callPopulate();
                  expect(returnedModel.someValue).toBe(value);
                });
              });
            };

            testMapsDataToStringKey({ value: undefined, valueString: 'undefined' });
            testMapsDataToStringKey({ value: null, valueString: 'null' });
            testMapsDataToStringKey({ value: '', valueString: 'empty string' });
            testMapsDataToStringKey({ value: 0, valueString: 'zero' });
            testMapsDataToStringKey({ value: 123, valueString: 'positive number' });
            testMapsDataToStringKey({ value: -123, valueString: 'negative number' });
            testMapsDataToStringKey({ value: true, valueString: 'true' });
            testMapsDataToStringKey({ value: false, valueString: 'false' });
            testMapsDataToStringKey({ value: [], valueString: 'empty array' });
            testMapsDataToStringKey({ value: [1, 2, 3], valueString: 'populated array' });
            testMapsDataToStringKey({ value: {}, valueString: 'empty object' });
            testMapsDataToStringKey({
              value: new TestBaseObject(),
              valueString: 'empty BaseObject'
            });
            testMapsDataToStringKey({
              value: new TestBaseObject({ testId: 1, someValue: 'value' }),
              valueString: 'populated BaseObject'
            });
          });

          describe('when a value in the static responseMap is a plain object', () => {
            describe('when the object does not define key', () => {
              test('throws error', () => {
                expect(() => callPopulate(KeyErrorTestBaseObject)).toThrowError(
                  `${KeyErrorTestBaseObject.displayName}: _populateObject: Invalid responseMap ` +
                  'object. Object must define key. See docs for typedef of ResponseMapValueObject.'
                );
              });
            });

            describe('when the object defines key', () => {
              describe('when the object defines defer as true', () => {
                test('processes deferred entries after all non-deferred entries', () => {
                  data = {
                    manual: {
                      mapping_id: 1,
                      some_value: 'works recursively too'
                    },
                    deferred: {
                      mapping_id: 4,
                      some_value: 'works recursively too'
                    }
                  };

                  expect.assertions(2);
                  TestBaseObject.responseMap.someManualModel.manualParse.mockImplementation(() => {
                    expect(
                      TestBaseObject.responseMap.someDeferredModel.manualParse
                    ).not.toBeCalled();
                  });

                  callPopulate();
                  expect(TestBaseObject.responseMap.someDeferredModel.manualParse).toBeCalled();
                });
              });

              describe('when the object defines a manualParse function', () => {
                beforeEach(() => {
                  data = {
                    manual: {
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    }
                  };
                });

                const testMapsData = ({ value, valueString }) => {
                  describe(`when the manualParse returns ${valueString}`, () => {
                    test(`assigns ${valueString} to the model at the correct key`, () => {
                      TestBaseObject.responseMap.someManualModel.manualParse.mockReturnValue(value);

                      const returnedModel = callPopulate();
                      expect(returnedModel.someManualModel).toBe(value);
                    });
                  });
                };

                test('calls the manualParse function', () => {
                  callPopulate();
                  expect(TestBaseObject.responseMap.someManualModel.manualParse).toBeCalledWith(
                    data.manual, data, model
                  );
                });

                testMapsData({ value: undefined, valueString: 'undefined' });
                testMapsData({ value: null, valueString: 'null' });
                testMapsData({ value: '', valueString: 'empty string' });
                testMapsData({ value: 0, valueString: 'zero' });
                testMapsData({ value: 123, valueString: 'positive number' });
                testMapsData({ value: -123, valueString: 'negative number' });
                testMapsData({ value: true, valueString: 'true' });
                testMapsData({ value: false, valueString: 'false' });
                testMapsData({ value: [], valueString: 'empty array' });
                testMapsData({ value: [1, 2, 3], valueString: 'populated array' });
                testMapsData({ value: {}, valueString: 'empty object' });
                testMapsData({ value: new TestBaseObject(), valueString: 'empty BaseObject' });
                testMapsData({
                  value: new TestBaseObject({ testId: 1, someValue: 'value' }),
                  valueString: 'populated BaseObject'
                });
              });

              describe('when the object defines BaseObject', () => {
                describe('when the object specifies isArray: true', () => {
                  const testAssignsEmptyArray = ({ value, valueString }) => {
                    describe(`when the passed data at the key is ${valueString}`, () => {
                      test(`assigns ${valueString} to the model at the correct key`, () => {
                        data = { map_models: value };

                        const returnedModel = callPopulate();
                        expect(returnedModel.someModels).toEqual([]);
                      });
                    });
                  };

                  testAssignsEmptyArray({ value: undefined, valueString: 'undefined' });
                  testAssignsEmptyArray({ value: null, valueString: 'null' });
                  testAssignsEmptyArray({ value: [], valueString: 'emptyArray' });

                  describe('when the passed data at the key is a populated array', () => {
                    test('maps the data to instances of the specified BaseObject', () => {
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

                      const returnedModel = callPopulate();

                      expect.hasAssertions();
                      _.forEach(returnedModel.someModels, (populatedModel, index) => {
                        expect(populatedModel).toBeInstanceOf(MappingTestBaseObject);

                        expect(populatedModel.mappingId).toBe(data.map_models[index].mapping_id);
                        expect(populatedModel.someValue).toBe(data.map_models[index].some_value);
                        expect(populatedModel.someNestedData).toBe(
                          _.get(data.map_models[index], 'nested.item')
                        );
                      });
                    });
                  });
                });

                describe('when the object specifies isArray: false', () => {
                  const testAssignsEmptyObject = ({ value, valueString }) => {
                    describe(`when the passed data at the key is ${valueString}`, () => {
                      test(
                        'assigns an empty instance of the specified BaseObject to the model',
                        () => {
                          data = { map_model: value };

                          const returnedModel = callPopulate();

                          const emptyObject = returnedModel.someModel;
                          expect(emptyObject).toBeInstanceOf(MappingTestBaseObject);
                          _.forEach(MappingTestBaseObject.responseMap, (v, key) => {
                            expect(_.get(emptyObject, key)).toBeUndefined();
                          });
                        }
                      );
                    });
                  };

                  testAssignsEmptyObject({ value: undefined, valueString: 'undefined' });
                  testAssignsEmptyObject({ value: null, valueString: 'null' });
                  testAssignsEmptyObject({ value: {}, valueString: 'empty object' });

                  describe('when the passed data at the key is a populated object', () => {
                    test('maps the data to an instance of the specified BaseObject', () => {
                      data = {
                        map_model: {
                          mapping_id: 1,
                          some_value: 'works recursively too',
                          nested: {
                            item: 'also works recursively'
                          }
                        }
                      };

                      const returnedModel = callPopulate();

                      const populatedModel = returnedModel.someModel;
                      expect(populatedModel).toBeInstanceOf(MappingTestBaseObject);

                      expect(populatedModel.mappingId).toBe(data.map_model.mapping_id);
                      expect(populatedModel.someValue).toBe(data.map_model.some_value);
                      expect(populatedModel.someNestedData).toBe(
                        _.get(data.map_model, 'nested.item')
                      );
                    });
                  });
                });
              });

              describe('when manualParse and BaseObject are defined', () => {
                test('calls manualParse instead of using BaseObject logic', () => {
                  data = { both: 'something' };
                  jest.spyOn(MappingTestBaseObject, 'buildFromServer');

                  callPopulate();
                  expect(
                    TestBaseObject.responseMap.someManualAndBaseObject.manualParse
                  ).toBeCalledWith(
                    data.both, data, model
                  );
                  expect(MappingTestBaseObject.buildFromServer).not.toBeCalledWith(data.both);

                  MappingTestBaseObject.buildFromServer.mockRestore();
                });
              });

              describe('when the object does not define BaseObject or manualParse', () => {
                test('throws error', () => {
                  expect(() => callPopulate(ModelObjectErrorTestBaseObject)).toThrowError(
                    `${ModelObjectErrorTestBaseObject.displayName}: _populateObject: Invalid ` +
                    'responseMap object. Object must define `BaseObject` or `manualParse`. See ' +
                    'docs for typedef of ResponseMapValueObject.'
                  );
                });
              });
            });
          });

          describe('when a value in the static responseMap is not a string or valid object', () => {
            test('throws error', () => {
              expect(
                () => callPopulate(MapObjectErrorBaseObject)
              ).toThrowError(
                `${MapObjectErrorBaseObject.displayName}: _populateObject: Did not recognize ` +
                'responseMap value type for key invalid'
              );
            });
          });
        });

        describe('when isDataFromServer is false', () => {
          beforeEach(() => {
            isDataFromServer = false;
          });

          const testMapsDataIgnoringMapValue = (Klass) => {
            test('maps the data attribute at the map key, ignoring the map value', () => {
              expect.hasAssertions();
              const returnedModel = callPopulate(Klass);
              _.forEach(data, (value, key) => {
                expect(returnedModel[key]).toBe(data[key]);
              });
            });
          };

          test('does not map data passed in the form of a server response', () => {
            data = { some_value: 'some server data' };

            const returnedModel = callPopulate();
            expect(returnedModel.someValue).toBeUndefined();
            expect(returnedModel.some_value).toBeUndefined();
          });

          describe('when a value in the static responseMap is a string', () => {
            beforeEach(() => {
              data = { someValue: 'some server data' };
            });

            testMapsDataIgnoringMapValue();
          });

          describe('when a value in the static responseMap is a plain object', () => {
            describe('when the object does not define key', () => {
              beforeEach(() => {
                data = { invalidObjectWithoutKey: 'works' };
              });

              testMapsDataIgnoringMapValue(KeyErrorTestBaseObject);
            });

            describe('when the object defines key', () => {
              describe('when the object defines a manualParse function', () => {
                beforeEach(() => {
                  const someManualModel = new MappingTestBaseObject({
                    mapping_id: 1,
                    some_value: 'works recursively too'
                  });
                  data = { someManualModel };
                });

                testMapsDataIgnoringMapValue();
              });

              describe('when the object defines BaseObject', () => {
                describe('when the object specifies isArray: true', () => {
                  beforeEach(() => {
                    const someModels = [
                      new MappingTestBaseObject({
                        mapping_id: 1,
                        some_value: 'works recursively too'
                      }),
                      new MappingTestBaseObject({
                        mapping_id: 2,
                        nested: {
                          item: 'also works recursively'
                        }
                      })
                    ];
                    data = { someModels };
                  });

                  testMapsDataIgnoringMapValue();
                });

                describe('when the object specifies isArray: false', () => {
                  beforeEach(() => {
                    const someModel = new MappingTestBaseObject({
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    });
                    data = { someModel };
                  });

                  testMapsDataIgnoringMapValue();
                });
              });

              describe('when the object defines manualParse and BaseObject', () => {
                beforeEach(() => {
                  data = { someManualAndBaseObject: 'something' };
                });

                testMapsDataIgnoringMapValue();
              });

              describe('when the object does not define manualParse or BaseObject', () => {
                beforeEach(() => {
                  data = { invalidObjectWithoutBaseObject: 'works' };
                });

                testMapsDataIgnoringMapValue(ModelObjectErrorTestBaseObject);
              });
            });
          });

          describe('when a value in the static responseMap is not a string or valid object', () => {
            beforeEach(() => {
              data = { invalid: 'works' };
            });

            testMapsDataIgnoringMapValue(MapObjectErrorBaseObject);
          });
        });
      });

      test('returns passed model', () => {
        const passedModel = new TestBaseObject();
        const returnedModel = TestBaseObject._populateObject({ data, model: passedModel });
        expect(returnedModel).toBe(passedModel);
      });
    });

    describe('buildFromServer', () => {
      test('calls _populateObject with isDataFromServer true', () => {
        jest.spyOn(TestBaseObject, '_populateObject');
        const data = { some: 'data' };
        const constructorParams = { more: 'params' };

        TestBaseObject.buildFromServer(data, constructorParams);
        expect(TestBaseObject._populateObject).toBeCalledWith({
          data,
          model: expect.any(TestBaseObject),
          isDataFromServer: true
        });
      });

      test('returns a new, populated instance of the class', () => {
        const data = { some_value: 'data' };
        const model = TestBaseObject.buildFromServer(data);

        expect(model).toBeInstanceOf(TestBaseObject);
        expect(model.someValue).toBe(data.some_value);
      });
    });
  });
});
