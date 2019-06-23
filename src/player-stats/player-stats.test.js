import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import PlayerStats from './player-stats';

describe('PlayerStats', () => {
  test('extends BaseObject', () => {
    const instance = new PlayerStats();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new PlayerStats();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('usesPoints');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = true;
          const newInstance = new PlayerStats({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('usesPoints');
    });
  });
});
