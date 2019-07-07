import _ from 'lodash';

import { flattenObject } from '../../utils.js';

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

class ObjectErrorTestBaseObject extends BaseObject {
  static responseMap = {
    invalidObjectWithoutBaseObject: {
      key: 'failed_key'
    }
  };

  static displayName = 'ObjectErrorTestBaseObject';
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

        const returnedInstance = new TestBaseObject(options);
        expect(TestBaseObject._populateObject).toBeCalledWith({
          data: options,
          instance: returnedInstance,
          isDataFromServer: false
        });
      });

      test('populates instance with local data', () => {
        const options = { someValue: 'yeahhhhhhhhhhh' };

        const returnedInstance = new TestBaseObject(options);
        expect(returnedInstance.someValue).toBe(options.someValue);
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
      let constructorParams;
      let data;
      let instance;
      let isDataFromServer;

      beforeEach(() => {
        constructorParams = { leagueId: 123213 };
        data = {
          testId: 42,
          some_value: 'some item',
          nested: {
            item: 'some nested item'
          }
        };
        instance = new TestBaseObject();
      });

      afterEach(() => {
        constructorParams = null;
        data = null;
        instance = null;
        isDataFromServer = null;
      });

      const callPopulate = (Klass = TestBaseObject) => Klass._populateObject({
        data, constructorParams, instance, isDataFromServer
      });

      describe('when a instance is not passed', () => {
        test('throws error', () => {
          expect(() => TestBaseObject._populateObject({ data })).toThrowError(
            `${TestBaseObject.displayName}: _populateObject: Did not receive instance to populate`
          );
        });
      });

      describe('when data is not passed', () => {
        test('returns instance without mutation', () => {
          const returnedInstance = TestBaseObject._populateObject({ instance });

          expect(returnedInstance).toBe(instance);

          expect(returnedInstance.testId).toBeUndefined();
          expect(returnedInstance.someValue).toBeUndefined();
          expect(returnedInstance.someNestedData).toBeUndefined();

          expect(returnedInstance.someObjects).toBeUndefined();
          expect(returnedInstance.someManualObject).toBeUndefined();
          expect(returnedInstance.someManualAndBaseObject).toBeUndefined();
          expect(returnedInstance.someDeferredObject).toBeUndefined();
        });
      });

      describe('responseMap mapping', () => {
        describe('when isDataFromServer is true', () => {
          beforeEach(() => {
            isDataFromServer = true;
          });

          test('does not map keys not defined in responseMap', () => {
            data = { notInMap: 'some wack stuff' };

            const returnedInstance = callPopulate();
            expect(returnedInstance.notInMap).toBeUndefined();
          });

          test('does not map data passed in the form of local (non-server) data', () => {
            data = { someValue: 'some server data' };

            const returnedInstance = callPopulate();
            expect(returnedInstance.someValue).toBeUndefined();
            expect(returnedInstance.some_value).toBeUndefined();
          });

          describe('when a value in the static responseMap is a string', () => {
            const testMapsDataToStringKey = ({ value, valueString }) => {
              describe(`when the passed data at the key is ${valueString}`, () => {
                test(`assigns ${valueString} to the instance at the correct key`, () => {
                  data = { some_value: value };

                  const returnedInstance = callPopulate();
                  expect(returnedInstance.someValue).toBe(value);
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
                  TestBaseObject.responseMap.someManualObject.manualParse.mockImplementation(() => {
                    expect(
                      TestBaseObject.responseMap.someDeferredObject.manualParse
                    ).not.toBeCalled();
                  });

                  callPopulate();
                  expect(TestBaseObject.responseMap.someDeferredObject.manualParse).toBeCalled();
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
                    test(`assigns ${valueString} to the instance at the correct key`, () => {
                      TestBaseObject.responseMap.someManualObject.manualParse.mockReturnValue(
                        value
                      );

                      const returnedInstance = callPopulate();
                      expect(returnedInstance.someManualObject).toBe(value);
                    });
                  });
                };

                test('calls the manualParse function', () => {
                  callPopulate();
                  expect(TestBaseObject.responseMap.someManualObject.manualParse).toBeCalledWith(
                    data.manual, data, constructorParams, instance
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
                      test(`assigns ${valueString} to the instance at the correct key`, () => {
                        data = { map_objects: value };

                        const returnedInstance = callPopulate();
                        expect(returnedInstance.someObjects).toEqual([]);
                      });
                    });
                  };

                  testAssignsEmptyArray({ value: undefined, valueString: 'undefined' });
                  testAssignsEmptyArray({ value: null, valueString: 'null' });
                  testAssignsEmptyArray({ value: [], valueString: 'emptyArray' });

                  describe('when the passed data at the key is a populated array', () => {
                    test('maps the data to instances of the specified BaseObject', () => {
                      data = {
                        map_objects: [{
                          mapping_id: 1,
                          some_value: 'works recursively too'
                        }, {
                          mapping_id: 2,
                          nested: {
                            item: 'also works recursively'
                          }
                        }]
                      };

                      const returnedInstance = callPopulate();

                      expect.hasAssertions();
                      _.forEach(returnedInstance.someObjects, (populatedInstance, index) => {
                        expect(populatedInstance).toBeInstanceOf(MappingTestBaseObject);

                        expect(populatedInstance.mappingId).toBe(
                          data.map_objects[index].mapping_id
                        );
                        expect(populatedInstance.someValue).toBe(
                          data.map_objects[index].some_value
                        );
                        expect(populatedInstance.someNestedData).toBe(
                          _.get(data.map_objects[index], 'nested.item')
                        );
                      });
                    });
                  });
                });

                describe('when the object specifies isArray: false', () => {
                  const testAssignsEmptyObject = ({ value, valueString }) => {
                    describe(`when the passed data at the key is ${valueString}`, () => {
                      test(
                        'assigns an empty instance of the specified BaseObject to the instance',
                        () => {
                          data = { map_object: value };

                          const returnedInstance = callPopulate();

                          const emptyObject = returnedInstance.someObject;
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
                        map_object: {
                          mapping_id: 1,
                          some_value: 'works recursively too',
                          nested: {
                            item: 'also works recursively'
                          }
                        }
                      };

                      const returnedInstance = callPopulate();

                      const populatedInstance = returnedInstance.someObject;
                      expect(populatedInstance).toBeInstanceOf(MappingTestBaseObject);

                      expect(populatedInstance.mappingId).toBe(data.map_object.mapping_id);
                      expect(populatedInstance.someValue).toBe(data.map_object.some_value);
                      expect(populatedInstance.someNestedData).toBe(
                        _.get(data.map_object, 'nested.item')
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
                    data.both, data, constructorParams, instance
                  );
                  expect(MappingTestBaseObject.buildFromServer).not.toBeCalledWith(data.both);

                  MappingTestBaseObject.buildFromServer.mockRestore();
                });
              });

              describe('when the object does not define BaseObject or manualParse', () => {
                test('throws error', () => {
                  expect(() => callPopulate(ObjectErrorTestBaseObject)).toThrowError(
                    `${ObjectErrorTestBaseObject.displayName}: _populateObject: Invalid ` +
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
              const returnedInstance = callPopulate(Klass);
              _.forEach(data, (value, key) => {
                expect(returnedInstance[key]).toBe(data[key]);
              });
            });
          };

          test('does not map data passed in the form of a server response', () => {
            data = { some_value: 'some server data' };

            const returnedInstance = callPopulate();
            expect(returnedInstance.someValue).toBeUndefined();
            expect(returnedInstance.some_value).toBeUndefined();
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
                  const someManualObject = new MappingTestBaseObject({
                    mapping_id: 1,
                    some_value: 'works recursively too'
                  });
                  data = { someManualObject };
                });

                testMapsDataIgnoringMapValue();
              });

              describe('when the object defines BaseObject', () => {
                describe('when the object specifies isArray: true', () => {
                  beforeEach(() => {
                    const someObjects = [
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
                    data = { someObjects };
                  });

                  testMapsDataIgnoringMapValue();
                });

                describe('when the object specifies isArray: false', () => {
                  beforeEach(() => {
                    const someObject = new MappingTestBaseObject({
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    });
                    data = { someObject };
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

                testMapsDataIgnoringMapValue(ObjectErrorTestBaseObject);
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

      test('returns passed instance', () => {
        const passedInstance = new TestBaseObject();
        const returnedInstance = TestBaseObject._populateObject({ data, instance: passedInstance });
        expect(returnedInstance).toBe(passedInstance);
      });
    });

    describe('buildFromServer', () => {
      describe('when the class specifies to flattenResponse', () => {
        let classFlattenResponse;

        beforeEach(() => {
          classFlattenResponse = TestBaseObject.flattenResponse;
          TestBaseObject.flattenResponse = true;
        });

        afterEach(() => {
          TestBaseObject.flattenResponse = classFlattenResponse;
        });

        test('calls _populateObject with flat data and isDataFromServer true', () => {
          jest.spyOn(TestBaseObject, '_populateObject');
          const constructorParams = { more: 'params' };
          const data = {
            some: 'data',
            nested: {
              stuff: 'isFlat'
            }
          };

          TestBaseObject.buildFromServer(data, constructorParams);
          expect(TestBaseObject._populateObject).toBeCalledWith({
            data: flattenObject(data),
            constructorParams,
            instance: expect.any(TestBaseObject),
            isDataFromServer: true
          });
        });
      });

      describe('when the class does not specify to flattenResponse', () => {
        let classFlattenResponse;

        beforeEach(() => {
          classFlattenResponse = TestBaseObject.flattenResponse;
          TestBaseObject.flattenResponse = false;
        });

        afterEach(() => {
          TestBaseObject.flattenResponse = classFlattenResponse;
        });

        test('calls _populateObject with flat data and isDataFromServer true', () => {
          jest.spyOn(TestBaseObject, '_populateObject');
          const constructorParams = { more: 'params' };
          const data = {
            some: 'data',
            nested: {
              stuff: 'isFlat'
            }
          };

          TestBaseObject.buildFromServer(data, constructorParams);
          expect(TestBaseObject._populateObject).toBeCalledWith({
            data,
            constructorParams,
            instance: expect.any(TestBaseObject),
            isDataFromServer: true
          });
        });
      });

      test('returns a new, populated instance of the class', () => {
        const data = { some_value: 'data' };
        const instance = TestBaseObject.buildFromServer(data);

        expect(instance).toBeInstanceOf(TestBaseObject);
        expect(instance.someValue).toBe(data.some_value);
      });
    });
  });
});
