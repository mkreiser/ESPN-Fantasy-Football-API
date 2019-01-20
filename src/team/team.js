import _ from 'lodash';

import BaseCacheableObject from '../base-cacheable-object/base-cacheable-object.js';

/**
 * Represents a fantasy football team in a League. To get fully populated team information, a
 * request should be made to the `leagueSettings` route. There is not a generic team route on the
 * ESPN API.
 *
 * @extends BaseCacheableObject
 */
class Team extends BaseCacheableObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the team belongs.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the team belongs.
     * @type {number}
     */
    this.seasonId = options.seasonId;
  }

  static displayName = 'Team';

  static idName = 'teamId';

  /**
   * @typedef {object} TeamObject
   *
   * @property {number} teamId
   * @property {string} firstName ESPN breaks team name into two parts ('location' and 'nickname').
   *                              This is the first part ('location').
   * @property {string} lastName The second part of the team name ('nickname').
   * @property {string} abbreviation The team abbreviation.
   * @property {object} division The division the team belongs to. The division object contains the
   *                             id, size, and name of the division.
   * @property {number} waiverRank The team's current rank on the wavier wire.
   * @property {string} logoURL The URL of the team's logo.
   *
   * @property {number} pointsFor The cumulative points the team has scored in the season.
   * @property {number} pointsAgainst The cumulative points scored by the team's opponents in the
   *                                  season.
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
   * @property {number} winningPercentage The percentage of the regular season games the team has
   *                                      won.
   * @property {number} divisionWinningPercentage The percentage of the regular season divisional
   *                                              games the team has won.
   *
   * @property {number} streakLength Length of the current winning/losing streak.
   * @property {string} streakType A string representing if the current streak is a losing streak
   *                               or a winning streak.
   *                               1: W
   *                               2: L
   *
   * @property {number} leagueStanding The team's standing in the entire league.
   * @property {number} divisionStanding The team's standing within its division.
   */

  /**
   * @type {TeamObject}
   */
  static responseMap = {
    teamId: 'teamId',
    firstName: 'teamLocation',
    lastName: 'teamNickname',
    abbreviation: 'teamAbbrev',
    division: 'division',
    waiverRank: 'waiverRank',
    logoURL: 'logoUrl',

    pointsFor: 'record.pointsFor',
    pointsAgainst: 'record.pointsAgainst',

    wins: 'record.overallWins',
    losses: 'record.overallLosses',
    ties: 'record.overallTies',
    divisionWins: 'record.divisionWins',
    divisionLosses: 'record.divisionLosses',
    divisionTies: 'record.divisionTies',
    homeWins: 'record.homeWins',
    homeLosses: 'record.homeLosses',
    homeTies: 'record.homeTies',
    awayWins: 'record.awayWins',
    awayLosses: 'record.awayLosses',
    awayTies: 'record.awayTies',

    winningPercentage: {
      key: 'record.overallPercentage',
      manualParse: (responseData) => (_.isFinite(responseData) ? responseData * 100 : undefined)
    },
    divisionWinningPercentage: {
      key: 'record.divisionPercentage',
      manualParse: (responseData) => (_.isFinite(responseData) ? responseData * 100 : undefined)
    },

    streakLength: 'record.streakLength',
    streakType: {
      key: 'record.streakType',
      manualParse: (responseData) => {
        switch (responseData) {
          case 1: return 'W';
          case 2: return 'L';
          default: return 'ERROR: streakType not recognized';
        }
      }
    },

    leagueStanding: 'overallStanding',
    divisionStanding: 'divisionStanding'
  };

  static getCacheId({ leagueId, seasonId, teamId } = {}) {
    return (teamId && leagueId && seasonId) ? `${teamId}-${leagueId}-${seasonId}` : undefined;
  }
}

export default Team;
