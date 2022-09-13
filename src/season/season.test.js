import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object.js';
import Season from './season';

describe('Season', () => {
  test('extends BaseObject', () => {
    const instance = new Season();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    const buildSeason = (data, options) => Season.buildFromServer(data, options);

    let data;

    beforeEach(() => {
      data = {
        id: 2018,
        currentScoringPeriod: {
          id: 1
        }
      };
    });

    describe('currentScoringPeriod', () => {
      describe('manualParse', () => {
        describe('when id is populated', () => {
          test('maps to currentScoringPeriod', () => {
            const season = buildSeason(data);
            expect(season.currentScoringPeriod).toBe(data.currentScoringPeriod.id);
          });
        });
      });
    });
  });
});
