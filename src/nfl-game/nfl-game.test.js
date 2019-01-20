import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import nflTeams from '../nfl-teams/nfl-teams.js';

import NFLGame from './nfl-game.js';

import { localObject, serverResponse } from './nfl-game.stubs.js';

describe('NFLGame', () => {
  test('extends BaseObject', () => {
    const instance = new NFLGame();
    expect(instance).toBeInstanceOf(BaseObject);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = NFLGame.buildFromServer(serverResponse);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new NFLGame(localObject);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('responseMap', () => {
    const buildNFLGame = (data, options) => NFLGame.buildFromServer(data, options);

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
              const data = { status: numKey };

              const slottedPlayer = buildNFLGame(data);
              expect(slottedPlayer.gameStatus).toBe(value);
            });
          });
        });

        describe('when invalid enum key is passed', () => {
          test('returns error string', () => {
            const data = { status: -231 };

            const slottedPlayer = buildNFLGame(data);
            expect(slottedPlayer.gameStatus).toBe('ERROR: gameStatus not recognized');
          });
        });
      });
    });

    const testTeam = ({ isHome }) => {
      const teamPrefix = isHome ? 'home' : 'away';

      describe('when the passed id is undefined', () => {
        test(`sets ${teamPrefix}Team to undefined`, () => {
          const data = { [`${teamPrefix}ProTeamId`]: undefined };

          const slottedPlayer = buildNFLGame(data);
          expect(slottedPlayer[`${teamPrefix}Team`]).toBeUndefined();
        });
      });

      describe('when the passed id does not match a known team', () => {
        test(`sets ${teamPrefix}Team to undefined`, () => {
          const id = 112310;
          const data = { [`${teamPrefix}ProTeamId`]: id };

          const slottedPlayer = buildNFLGame(data);
          expect(slottedPlayer[`${teamPrefix}Team`]).toBeUndefined();
        });
      });

      describe('when the passed id matches a known team', () => {
        test(`sets ${teamPrefix}Team to the correct NFLTeam`, () => {
          const id = 10;
          const data = { [`${teamPrefix}ProTeamId`]: id };

          const slottedPlayer = buildNFLGame(data);
          expect(slottedPlayer[`${teamPrefix}Team`]).toBe(nflTeams[id]);
        });
      });
    };

    describe('homeTeam', () => {
      describe('manualParse', () => {
        testTeam({ isHome: true });
      });
    });

    describe('awayTeam', () => {
      describe('manualParse', () => {
        testTeam({ isHome: false });
      });
    });
  });
});
