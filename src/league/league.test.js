import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

import { slotCategoryIdToPositionMap } from '../constants.js';

import League from './league';

describe('League', () => {
  test('extends BaseObject', () => {
    expect(new League()).toBeInstanceOf(BaseObject);
  });

  describe('responseMap', () => {
    let data;
    let draftSettings;
    let rosterSettings;
    let scheduleSettings;

    beforeEach(() => {
      draftSettings = {
        date: 1535476500000,
        type: 'SNAKE',
        timePerSelection: 120,
        isTradingEnabled: true
      };

      rosterSettings = {
        lineupSlotCounts: {
          1: 2,
          3: 3
        },
        positionLimits: {
          1: 2,
          3: 3
        },
        rosterLocktimeType: 'INDIVIDUAL_GAME'
      };

      scheduleSettings = {
        matchupPeriodCount: 15,
        matchupPeriodLength: 1,
        playoffMatchupPeriodLength: 1,
        playoffTeamCount: 4
      };

      data = {
        draftSettings,
        rosterSettings,
        scheduleSettings
      };
    });

    describe('draftSettings', () => {
      test('returns an object', () => {
        const league = League.buildFromServer(data);
        expect(league.draftSettings).toEqual(expect.any(Object));
      });

      test('maps date as a JS Date instance', () => {
        const league = League.buildFromServer(data);
        expect(league.draftSettings.date).toEqual(new Date(draftSettings.date));
      });

      test('maps type directly', () => {
        const league = League.buildFromServer(data);
        expect(league.draftSettings.type).toBe(draftSettings.type);
      });

      test('maps timePerPick directly', () => {
        const league = League.buildFromServer(data);
        expect(league.draftSettings.timePerPick).toBe(draftSettings.timePerSelection);
      });

      test('maps canTradeDraftPicks directly', () => {
        const league = League.buildFromServer(data);
        expect(league.draftSettings.canTradeDraftPicks).toBe(draftSettings.isTradingEnabled);
      });
    });

    describe('rosterSettings', () => {
      test('returns an object', () => {
        const league = League.buildFromServer(data);
        expect(league.rosterSettings).toEqual(expect.any(Object));
      });

      test('maps lineupSlotCounts to object using slotCategoryIdToPositionMap for keys', () => {
        const league = League.buildFromServer(data);
        expect.assertions(_.keys(rosterSettings.lineupSlotCounts).length);

        _.forEach(rosterSettings.lineupSlotCounts, (value, key) => {
          const position = _.get(slotCategoryIdToPositionMap, key);
          expect(_.get(league.rosterSettings.lineupPositionCount, position)).toBe(value);
        });
      });

      test('maps positionLimits to object using slotCategoryIdToPositionMap for keys', () => {
        const league = League.buildFromServer(data);
        expect.assertions(_.keys(rosterSettings.positionLimits).length);

        _.forEach(rosterSettings.positionLimits, (value, key) => {
          const position = _.get(slotCategoryIdToPositionMap, key);
          expect(_.get(league.rosterSettings.positionLimits, position)).toBe(value);
        });
      });

      test('maps locktime directly', () => {
        const league = League.buildFromServer(data);
        expect(league.rosterSettings.locktime).toBe(rosterSettings.rosterLocktimeType);
      });
    });

    describe('scheduleSettings', () => {
      test('returns an object', () => {
        const league = League.buildFromServer(data);
        expect(league.scheduleSettings).toEqual(expect.any(Object));
      });

      test('maps numberOfRegularSeasonMatchups directly', () => {
        const league = League.buildFromServer(data);
        expect(league.scheduleSettings.numberOfRegularSeasonMatchups).toBe(
          scheduleSettings.matchupPeriodCount
        );
      });

      test('maps regularSeasonMatchupLength directly', () => {
        const league = League.buildFromServer(data);
        expect(league.scheduleSettings.regularSeasonMatchupLength).toBe(
          scheduleSettings.matchupPeriodLength
        );
      });

      test('calculates numberOfPlayoffMatchups', () => {
        const league = League.buildFromServer(data);
        const expected = _.toSafeInteger(
          (
            17 - (scheduleSettings.matchupPeriodCount * scheduleSettings.matchupPeriodLength)
          ) / scheduleSettings.playoffMatchupPeriodLength
        );

        expect(league.scheduleSettings.numberOfPlayoffMatchups).toBe(expected);
      });

      test('maps playoffMatchupLength directly', () => {
        const league = League.buildFromServer(data);
        expect(league.scheduleSettings.playoffMatchupLength).toBe(
          scheduleSettings.playoffMatchupPeriodLength
        );
      });

      test('maps numberOfPlayoffTeams directly', () => {
        const league = League.buildFromServer(data);
        expect(league.scheduleSettings.numberOfPlayoffTeams).toBe(
          scheduleSettings.playoffTeamCount
        );
      });
    });
  });
});
