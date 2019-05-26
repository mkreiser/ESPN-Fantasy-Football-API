import axios from 'axios';
import _ from 'lodash';

import BaseAPIObject from './base-api-object.js';

class TestBaseAPIObject extends BaseAPIObject {
  static routeParams = 'view=mRoster&view=mWhyESPN';

  static displayName = 'TestBaseAPIObject';

  static getRoute = jest.fn().mockReturnValue('some-route');
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

    describe('getRoute', () => {
      test('throws error', () => {
        expect(() => BaseAPIObject.getRoute()).toThrowError(
          'BaseAPIObject: getRoute must be overridden!'
        );
      });
    });

    describe('read', () => {
      beforeEach(() => {
        jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({}));
      });

      describe('cookie behavior', () => {
        let route;

        beforeEach(() => {
          route = 'some-route';
          jest.spyOn(TestBaseAPIObject, 'getRoute').mockReturnValue(route);
        });

        const testDoesNotSetHeaders = () => {
          test('calls axios.get without axiosConfig', () => {
            TestBaseAPIObject.read();
            expect(axios.get).toBeCalledWith(route, undefined);
          });
        };

        describe('when _espnS2 is set', () => {
          describe('when _SWID is set', () => {
            test('calls axios.get with the correct axiosConfig', () => {
              const espnS2 = 'some-ESPN-S2';
              const SWID = 'some-SWID';

              TestBaseAPIObject.setCookies({ espnS2, SWID });

              TestBaseAPIObject.read();
              expect(axios.get).toBeCalledWith(route, {
                headers: { Cookie: `espn_s2=${espnS2}; SWID=${SWID};` },
                withCredentials: true
              });
            });
          });

          describe('when _SWID is not set', () => {
            beforeEach(() => {
              TestBaseAPIObject.setCookies({ espnS2: 'some-ESPN-S2' });
            });

            afterEach(() => {
              TestBaseAPIObject.setCookies({}); // Reset for other tests
            });

            testDoesNotSetHeaders();
          });
        });

        describe('when _espnS2 not is set', () => {
          describe('when _SWID is set', () => {
            beforeEach(() => {
              TestBaseAPIObject.setCookies({ SWID: 'some-SWID' });
            });

            afterEach(() => {
              TestBaseAPIObject.setCookies({}); // Reset for other tests
            });

            testDoesNotSetHeaders();
          });

          describe('when _SWID is not set', () => {
            beforeEach(() => {
              TestBaseAPIObject.setCookies({});
            });

            testDoesNotSetHeaders();
          });
        });
      });

      const testAxiosReadWithoutInstance = (getMethodParams, setupCache) => {
        test('calls getRoute', () => {
          if (setupCache) {
            setupCache();
          }

          const methodParams = getMethodParams();
          TestBaseAPIObject.read(methodParams);
          expect(TestBaseAPIObject.getRoute).toBeCalledWith(_.get(methodParams, 'requestParams'));
        });

        test('calls axios.get with the route from getRoute', () => {
          if (setupCache) {
            setupCache();
          }

          TestBaseAPIObject.read(getMethodParams());
          expect(axios.get).toBeCalledWith(TestBaseAPIObject.getRoute(), undefined);
        });

        describe('when axios.get resolves', () => {
          test('calls buildFromServer with the response', async () => {
            if (setupCache) {
              setupCache();
            }

            const response = { data: {} };

            axios.get.mockReturnValue(Promise.resolve(response));
            jest.spyOn(TestBaseAPIObject, 'buildFromServer');

            await TestBaseAPIObject.read(getMethodParams());
            expect(TestBaseAPIObject.buildFromServer).toBeCalledWith(response.data);
          });

          test('returns result of buildFromServer', async () => {
            if (setupCache) {
              setupCache();
            }

            const response = { data: {} };
            const builtData = new TestBaseAPIObject();

            axios.get.mockReturnValue(Promise.resolve(response));
            jest.spyOn(TestBaseAPIObject, 'buildFromServer').mockReturnValue(builtData);

            const result = await TestBaseAPIObject.read(getMethodParams());
            expect(result).toBe(builtData);
          });
        });
      };

      const testAxiosReadWithInstance = (getMethodParams, setupCache) => {
        test('calls getRoute on the passed instance', () => {
          if (setupCache) {
            setupCache();
          }

          const methodParams = getMethodParams();
          jest.spyOn(methodParams.instance, 'getRoute');

          TestBaseAPIObject.read(methodParams);
          expect(methodParams.instance.getRoute).toBeCalled();
        });

        test('calls axios.get with the result of getRoute', () => {
          if (setupCache) {
            setupCache();
          }

          const methodParams = getMethodParams();
          const route = 'some-route';
          jest.spyOn(methodParams.instance, 'getRoute').mockReturnValue(route);

          TestBaseAPIObject.read(methodParams);
          expect(axios.get).toBeCalledWith(route, undefined);
        });

        describe('when axios.get resolves', () => {
          test('calls _populateObject with the passed instance and response data', async () => {
            if (setupCache) {
              setupCache();
            }

            const methodParams = getMethodParams();
            const response = { data: {} };

            axios.get.mockReturnValue(Promise.resolve(response));
            jest.spyOn(TestBaseAPIObject, '_populateObject');

            await TestBaseAPIObject.read(methodParams);
            expect(TestBaseAPIObject._populateObject).toBeCalledWith({
              data: response.data,
              instance: methodParams.instance,
              isDataFromServer: true
            });
          });

          test('returns the result of _populateObject', async () => {
            if (setupCache) {
              setupCache();
            }

            const response = { data: {} };
            const builtData = new TestBaseAPIObject();

            axios.get.mockReturnValue(Promise.resolve(response));
            jest.spyOn(TestBaseAPIObject, '_populateObject').mockReturnValue(builtData);

            const result = await TestBaseAPIObject.read(getMethodParams());
            expect(result).toBe(builtData);
          });
        });
      };

      const testCacheFunctionalityWithClassID = (getMethodParams, withInstance) => {
        test('calls getCacheId on the class', async () => {
          jest.spyOn(TestBaseAPIObject, 'getCacheId');

          const methodParams = getMethodParams();

          await TestBaseAPIObject.read(methodParams);
          expect(TestBaseAPIObject.getCacheId).toBeCalledWith(
            methodParams.requestParams ? methodParams.requestParams : undefined
          );
        });

        describe('when there is a matching item in the cache', () => {
          test('does not call axios.get', async () => {
            const cacheId = 'some-cache-id';

            TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
            jest.spyOn(TestBaseAPIObject, 'getCacheId').mockReturnValue(cacheId);

            await TestBaseAPIObject.read(getMethodParams());
            expect(axios.get).not.toBeCalled();
          });

          test('returns cached item', async () => {
            const cacheId = 'some-cache-id';

            TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
            jest.spyOn(TestBaseAPIObject, 'getCacheId').mockReturnValue(cacheId);

            const item = await TestBaseAPIObject.read(getMethodParams());
            expect(item).toBe(_.get(TestBaseAPIObject.cache, cacheId));
          });
        });

        describe('when there is not a matching item in the cache', () => {
          if (withInstance) {
            testAxiosReadWithInstance(
              getMethodParams,
              () => {
                const cacheId = 'some-cache-id';

                delete TestBaseAPIObject.cache[cacheId];
                jest.spyOn(TestBaseAPIObject, 'getCacheId').mockReturnValue(cacheId);
              }
            );
          } else {
            testAxiosReadWithoutInstance(
              getMethodParams,
              () => {
                const cacheId = 'some-cache-id';

                delete TestBaseAPIObject.cache[cacheId];
                jest.spyOn(TestBaseAPIObject, 'getCacheId').mockReturnValue(cacheId);
              }
            );
          }
        });
      };

      describe('when no method parameters are passed', () => {
        test('does not call getCacheId on the class', () => {
          jest.spyOn(TestBaseAPIObject, 'getCacheId');

          TestBaseAPIObject.read();
          expect(TestBaseAPIObject.getCacheId).not.toBeCalled();
        });

        testAxiosReadWithoutInstance(() => undefined);
      });

      describe('when method parameters are passed', () => {
        describe('when instance is passed', () => {
          let instance;

          beforeEach(() => {
            instance = new TestBaseAPIObject();
          });

          describe('when requestParams is passed', () => {
            let requestParams;

            beforeEach(() => {
              requestParams = { some: 'requestParams' };
            });

            describe('when reload is true', () => {
              test('does not call getCacheId on the passed instance', () => {
                jest.spyOn(instance, 'getCacheId');

                TestBaseAPIObject.read({ instance, requestParams, reload: true });
                expect(instance.getCacheId).not.toBeCalled();
              });

              testAxiosReadWithInstance(() => ({ instance, requestParams, reload: true }));
            });

            describe('when reload is false', () => {
              test('calls getCacheId on the passed instance', async () => {
                jest.spyOn(instance, 'getCacheId');

                await TestBaseAPIObject.read({ instance, requestParams, reload: false });
                expect(instance.getCacheId).toBeCalled();
              });

              describe('when getCacheId from the passed instance returns an id', () => {
                describe('when there is a matching item in the cache', () => {
                  test('does not call axios.get', async () => {
                    const cacheId = 'some-cache-id';

                    TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
                    jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);

                    await TestBaseAPIObject.read({ instance, requestParams, reload: false });
                    expect(axios.get).not.toBeCalled();
                  });

                  test('returns cached item', async () => {
                    const cacheId = 'some-cache-id';

                    TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
                    jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);

                    const item = await TestBaseAPIObject.read({
                      instance, requestParams, reload: false
                    });
                    expect(item).toBe(_.get(TestBaseAPIObject.cache, cacheId));
                  });
                });

                describe('when there is not a matching item in the cache', () => {
                  testAxiosReadWithInstance(
                    () => ({ instance, requestParams, reload: false }),
                    () => {
                      const cacheId = 'some-cache-id';

                      delete TestBaseAPIObject.cache[cacheId];
                      jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);
                    }
                  );
                });
              });

              describe('when getCacheId from the passed instance does not return an id', () => {
                beforeEach(() => {
                  jest.spyOn(instance, 'getCacheId').mockReturnValue(undefined);
                });

                testCacheFunctionalityWithClassID(
                  () => ({ instance, requestParams, reload: false }), true
                );
              });
            });
          });

          describe('when requestParams is not passed', () => {
            describe('when reload is true', () => {
              test('does not call getCacheId on the passed instance', () => {
                jest.spyOn(instance, 'getCacheId');

                TestBaseAPIObject.read({ instance, reload: true });
                expect(instance.getCacheId).not.toBeCalled();
              });

              testAxiosReadWithInstance(() => ({ instance, reload: true }));
            });

            describe('when reload is false', () => {
              test('calls getCacheId on the passed instance', async () => {
                jest.spyOn(instance, 'getCacheId');

                await TestBaseAPIObject.read({ instance, reload: false });
                expect(instance.getCacheId).toBeCalled();
              });

              describe('when getCacheId from the passed instance returns an id', () => {
                describe('when there is a matching item in the cache', () => {
                  test('does not call axios.get', async () => {
                    const cacheId = 'some-cache-id';

                    TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
                    jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);

                    await TestBaseAPIObject.read({ instance, reload: false });
                    expect(axios.get).not.toBeCalled();
                  });

                  test('returns cached item', async () => {
                    const cacheId = 'some-cache-id';

                    TestBaseAPIObject.cache[cacheId] = new TestBaseAPIObject();
                    jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);

                    const item = await TestBaseAPIObject.read({
                      instance, reload: false
                    });
                    expect(item).toBe(_.get(TestBaseAPIObject.cache, cacheId));
                  });
                });

                describe('when there is not a matching item in the cache', () => {
                  testAxiosReadWithInstance(
                    () => ({ instance, reload: false }),
                    () => {
                      const cacheId = 'some-cache-id';

                      delete TestBaseAPIObject.cache[cacheId];
                      jest.spyOn(instance, 'getCacheId').mockReturnValue(cacheId);
                    }
                  );
                });
              });

              describe('when getCacheId from the passed instance does not return an id', () => {
                beforeEach(() => {
                  jest.spyOn(instance, 'getCacheId').mockReturnValue(undefined);
                });

                testCacheFunctionalityWithClassID(() => ({ instance, reload: false }), true);
              });
            });
          });
        });

        describe('when instance is not passed', () => {
          describe('when requestParams is passed', () => {
            let requestParams;

            beforeEach(() => {
              requestParams = { some: 'requestParams' };
            });

            describe('when reload is true (*via default*)', () => {
              testAxiosReadWithoutInstance(() => ({ requestParams }));
            });

            describe('when reload is false', () => {
              testCacheFunctionalityWithClassID(() => ({ requestParams, reload: false }), false);
            });
          });

          describe('when requestParams is not passed', () => {
            describe('when reload is true', () => {
              testAxiosReadWithoutInstance(() => ({ reload: true }));
            });

            describe('when reload is false', () => {
              testCacheFunctionalityWithClassID(() => ({ reload: false }), false);
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

    describe('getRoute', () => {
      test('calls static getRoute with the instance', () => {
        jest.spyOn(TestBaseAPIObject, 'getRoute').mockImplementation();

        baseAPIObject.getRoute();
        expect(TestBaseAPIObject.getRoute).toBeCalledWith(baseAPIObject);
      });

      test('returns the result of static getRoute', () => {
        const route = 'some route';
        jest.spyOn(TestBaseAPIObject, 'getRoute').mockReturnValue(route);

        expect(baseAPIObject.getRoute()).toBe(route);
      });
    });

    describe('read', () => {
      beforeEach(() => {
        jest.spyOn(TestBaseAPIObject, 'read').mockReturnValue(new TestBaseAPIObject());
      });

      const testReturnsReadResult = (methodParams) => {
        test('returns result of static read', async () => {
          expect.assertions(1);
          const returnedResult = await baseAPIObject.read(methodParams);
          expect(returnedResult).toBeInstanceOf(TestBaseAPIObject);
        });
      };

      describe('when no method parameters are passed', () => {
        testReturnsReadResult();

        test('calls static read with the instance\'s ID params and reload: true', () => {
          const idParams = {};

          jest.spyOn(baseAPIObject, 'getIDParams').mockReturnValue(idParams);

          baseAPIObject.read();
          expect(TestBaseAPIObject.read).toBeCalledWith({
            instance: baseAPIObject,
            requestParams: idParams,
            reload: true
          });
        });
      });

      describe('when method params are passed', () => {
        describe('when requestParams is passed', () => {
          testReturnsReadResult({ requestParams: {} });

          test('calls static read with requestParams merged into the instance\'s ID params', () => {
            const idParams = { leagueId: 123 };
            const requestParams = { notId: 'something', leagueId: 456 };

            jest.spyOn(baseAPIObject, 'getIDParams').mockReturnValue(idParams);

            baseAPIObject.read({ requestParams });
            expect(TestBaseAPIObject.read).toBeCalledWith({
              instance: baseAPIObject,
              requestParams: _.merge({}, idParams, requestParams),
              reload: true
            });
          });
        });

        describe('when reload is passed', () => {
          testReturnsReadResult({ reload: false });

          test('calls static read with the passed reload and the instance\'s ID params', () => {
            const idParams = { leagueId: 123 };

            jest.spyOn(baseAPIObject, 'getIDParams').mockReturnValue(idParams);

            baseAPIObject.read({ reload: false });
            expect(TestBaseAPIObject.read).toBeCalledWith({
              instance: baseAPIObject,
              requestParams: idParams,
              reload: false
            });
          });
        });
      });
    });
  });
});
