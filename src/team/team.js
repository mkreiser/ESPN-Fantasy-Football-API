import _ from 'lodash';

import BaseCacheableObject from '../base-classes/base-cacheable-object/base-cacheable-object.js';

import Player from '../player/player';

/**
 * Represents a fantasy football team in a league.
 *
 * @extends {BaseCacheableObject}
 */
class Team extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    this.leagueId = options.leagueId;

    this.seasonId = options.seasonId;
  }

  static displayName = 'Team';

  /**
   * Returns valid id params when 'id', `leagueId`, and 'seasonId' are passed.
   * @param  {Object} params
   * @return {Object|undefined}
   */
  static getIDParams(params = {}) {
    if (params.id && params.leagueId && params.seasonId) {
      return {
        id: params.id,
        leagueId: params.leagueId,
        seasonId: params.seasonId
      };
    }

    return undefined;
  }

  /**
   * @typedef {object} Team~TeamMap
   *
   * @property {number} id
   * @property {stirng} abbreviation The team's abbreviation.
   * @property {string} name The team's name.
   * @property {number} wavierRank The team's position in the current wavier order.
   *
   * @property {Player[]} roster The team's roster of players.
   *
   * @property {number} wins The number of regular season match-ups the team has won.
   * @property {number} losses The number of regular season match-ups the team has lost.
   * @property {number} ties The number of regular season match-ups the team has tied.
   * @property {number} divisionWins The number of regular season match-ups the team has won in the
   *                                 division.
   * @property {number} divisionLosses The number of regular season match-ups the team has lost in
   *                                   the division.
   * @property {number} divisionTies The number of regular season match-ups the team has tied in the
   *                                 division.
   * @property {number} homeWins The number of regular season match-ups the team has won at home.
   * @property {number} homeLosses The number of regular season match-ups the team has lost at home.
   * @property {number} homeTies The number of regular season match-ups the team has tied at home.
   * @property {number} awayWins The number of regular season match-ups the team has won away.
   * @property {number} awayLosses The number of regular season match-ups the team has lost away.
   * @property {number} awayTies The number of regular season match-ups the team has tied away.
   *
   * @property {number} totalPointsScored The total points scored by the team in the regular season
   *                                      and playoffs combined.
   * @property {number} regularSeasonPointsFor The total points scored by the team in the regular
   *                                           season.
   * @property {number} regularSeasonPointsAgainst The total points scored against the team in the
   *                                               regular season.
   * @property {number} winningPercentage The percentage of games won by the team in the regular
   *                                      season.
   *
   * @property {number} playoffSeed The seeding for the team entering the playoffs.
   * @property {number} finalStandingsPosition The final standings position the team ended the
   *                                           season in.
   */

  /**
   * @type {Team~TeamMap}
   */
  static responseMap = {
    id: 'id',
    abbreviation: 'abbrev',
    name: {
      key: 'location',
      manualParse: (responseData, data) => `${data.location}${data.nickname}`
    },
    wavierRank: 'wavierRank',

    roster: {
      key: 'roster.entries',
      isArray: true,
      manualParse: (responseData, data, constructorParams) => _.map(
        responseData,
        (playerData) => Player.buildFromServer(playerData.playerPoolEntry, constructorParams)
      )
    },

    wins: 'record.overall.wins',
    losses: 'record.overall.losses',
    ties: 'record.overall.ties',
    divisionWins: 'record.division.wins',
    divisionLosses: 'record.division.losses',
    divisionTies: 'record.division.ties',
    homeWins: 'record.home.wins',
    homeLosses: 'record.home.losses',
    homeTies: 'record.home.ties',
    awayWins: 'record.away.wins',
    awayLosses: 'record.away.losses',
    awayTies: 'record.away.ties',

    totalPointsScored: 'points',
    regularSeasonPointsFor: 'record.overall.pointsFor',
    regularSeasonPointsAgainst: 'record.overall.pointsAgainst',
    winningPercentage: {
      key: 'record.overall.percentage',
      manualParse: (responseData) => _.round(responseData * 100, 2)
    },

    playoffSeed: 'playoffSeed',
    finalStandingsPosition: 'rankCalculatedFinal'
  };
}

export default Team;
