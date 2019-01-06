import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';
import ScoreboardMatchup from '../scoreboard-matchup/scoreboard-matchup.js';

import Scoreboard from './scoreboard.js';

import { localObject, serverResponse } from './scoreboard.stubs.js';

describe('Scoreboard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard({
      leagueId: 342342,
      seasonId: 2018,
      matchupPeriodId: 11,
      scoringPeriodId: 11
    });
  });

  afterEach(() => {
    scoreboard = null;
  });

  test('extends BaseAPIObject', () => {
    expect(scoreboard).toBeInstanceOf(BaseAPIObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      scoreboard = Scoreboard.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(scoreboard).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      scoreboard = new Scoreboard(localObject);
    });

    test('parses data correctly', () => {
      expect(scoreboard).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new Scoreboard();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
      testPropIsUndefined('matchupPeriodId');
      testPropIsUndefined('scoringPeriodId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 25;
          const newInstance = new Scoreboard({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
      testPropIsSetFromOptions('matchupPeriodId');
      testPropIsSetFromOptions('scoringPeriodId');
    });
  });

  describe('responseMap', () => {
    describe('matchups', () => {
      describe('manualParse', () => {
        describe('when there is no passed data', () => {
          test('returns an empty array', () => {
            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              undefined, undefined, scoreboard
            );

            expect(returnedMatchups).toEqual([]);
          });
        });

        describe('when the passed data is empty', () => {
          test('returns an empty array', () => {
            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              [], undefined, scoreboard
            );

            expect(returnedMatchups).toEqual([]);
          });
        });

        describe('when the passed data is populated', () => {
          test('returns an array of ScoreboardMatchups', () => {
            const responseData = [{}, {}, {}];

            const returnedMatchups = Scoreboard.responseMap.matchups.manualParse(
              responseData, undefined, scoreboard
            );

            expect.hasAssertions();
            _.forEach(returnedMatchups, (matchup) => {
              expect(matchup).toBeInstanceOf(ScoreboardMatchup);
              expect(matchup.leagueId).toBe(scoreboard.leagueId);
              expect(matchup.seasonId).toBe(scoreboard.seasonId);
            });
          });
        });
      });
    });
  });
});
