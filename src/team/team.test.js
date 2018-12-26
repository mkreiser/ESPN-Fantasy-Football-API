import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';
import Team from './team.js';

import { localObject, serverResponse } from './team.stubs.js';

describe('Team', () => {
  let team;

  beforeEach(() => {
    team = new Team();
  });

  afterEach(() => {
    team = null;
  });

  test('extends ApiModel', () => {
    expect(team).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      team = Team.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      team = Team.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('streakType', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const streakTypes = {
              1: 'W',
              2: 'L'
            };

            expect.hasAssertions();
            _.forEach(streakTypes, (value, key) => {
              const numKey = _.toNumber(key);
              const streakString = Team.responseMap.streakType.manualParse(numKey);
              expect(streakString).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const streakString = Team.responseMap.streakType.manualParse(-231);
            expect(streakString).toBe('ERROR: streakType not recognized');
          });
        });
      });
    });
  });
});
