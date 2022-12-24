import _ from 'lodash';

import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation
} from '../constants.js';

import NFLGame from './nfl-game';

describe('NFLGame', () => {
  describe('responseMap', () => {
    let awayTeam;
    let data;
    let homeTeam;

    beforeEach(() => {
      awayTeam = {
        id: 7,
        homeAway: 'away',
        record: '0-1',
        score: ''
      };

      homeTeam = {
        id: 3,
        homeAway: 'home',
        record: '1-0',
        score: ''
      };

      data = {
        date: '2018-11-30T01:20:00Z',
        status: 'pre',
        competitors: [homeTeam, awayTeam]
      };
    });

    describe('startTime', () => {
      test('returns a JS Date', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.startTime).toEqual(new Date(data.date));
      });
    });

    describe('gameStatus', () => {
      test('maps to GAME_STATUSES', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.gameStatus).toBe(_.get(NFLGame.GAME_STATUSES, data.status));
      });
    });

    describe('homeTeam', () => {
      test('returns an object', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam).toEqual(expect.any(Object));
      });

      test('maps id as an integer', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam.id).toBe(homeTeam.id);
      });

      test('maps team id to full team name', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam.team).toBe(_.get(nflTeamIdToNFLTeam, homeTeam.id));
      });

      test('maps team id to team abbreviation', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam.teamAbbrev).toBe(_.get(nflTeamIdToNFLTeamAbbreviation, homeTeam.id));
      });

      test('maps record directly', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam.record).toBe(homeTeam.record);
      });

      test('maps score to integer', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.homeTeam.score).toBe(0);
      });
    });

    describe('awayTeam', () => {
      test('returns an object', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam).toEqual(expect.any(Object));
      });

      test('maps id as an integer', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam.id).toBe(awayTeam.id);
      });

      test('maps team id to full team name', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam.team).toBe(_.get(nflTeamIdToNFLTeam, awayTeam.id));
      });

      test('maps team id to team abbreviation', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam.teamAbbrev).toBe(_.get(nflTeamIdToNFLTeamAbbreviation, awayTeam.id));
      });

      test('maps record directly', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam.record).toBe(awayTeam.record);
      });

      test('maps score to integer', () => {
        const game = NFLGame.buildFromServer(data);
        expect(game.awayTeam.score).toBe(0);
      });
    });
  });
});
