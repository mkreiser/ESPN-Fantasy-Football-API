import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';
import nflTeams from '../nfl-teams/nfl-teams.js';

import NFLGame from './nfl-game.js';

import { localObject, serverResponse } from './nfl-game.stubs.js';

describe('NFLGame', () => {
  let nflGame;

  beforeEach(() => {
    nflGame = new NFLGame();
  });

  afterEach(() => {
    nflGame = null;
  });

  test('extends BaseObject', () => {
    expect(nflGame).toBeInstanceOf(BaseObject);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      nflGame = NFLGame.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(nflGame).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      nflGame = new NFLGame(localObject);
    });

    test('parses data correctly', () => {
      expect(nflGame).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    describe('gameStatus', () => {
      describe('manualParse', () => {
        describe('when valid enum key is passed', () => {
          test('switches on numerical enum correctly', () => {
            const gameStatuses = {
              1: 'Game has not started',
              2: 'Game in progress',
              3: 'Game finished'
            };

            expect.hasAssertions();
            _.forEach(gameStatuses, (value, key) => {
              const numKey = _.toNumber(key);
              const status = NFLGame.responseMap.gameStatus.manualParse(numKey);
              expect(status).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const status = NFLGame.responseMap.gameStatus.manualParse(-231);
            expect(status).toBe('ERROR: gameStatus not recognized');
          });
        });
      });
    });

    describe('homeTeam', () => {
      test('maps to an NFLTeam', () => {
        const id = 10;
        const team = NFLGame.responseMap.homeTeam.manualParse(id);
        expect(team).toBe(_.get(nflTeams, id));
      });
    });

    describe('awayTeam', () => {
      test('maps to an NFLTeam', () => {
        const id = 10;
        const team = NFLGame.responseMap.awayTeam.manualParse(id);
        expect(team).toBe(_.get(nflTeams, id));
      });
    });
  });
});
