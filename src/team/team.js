import ApiModel from '../api-model/api-model.js';

/**
 * Represents a fantasy football team in a League. To get team information, a request must be made
 * to the `leagueSettings` route. There is not a generic team route on the ESPN API. Teams should
 * be populate when you get a League, so additional request should be unnecessary.
 * @class
 */
class Team extends ApiModel {
  /**
   * @typedef {object} TeamModel
   * @property {number} teamId
   * @property {string} firstName ESPN breaks team name into two parts ('location' and 'nickname').
   *                              This is the first part ('location').
   * @property {string} lastName The second part of the team name ('nickname').
   * @property {string} abbreviation The team abbreviation
   * @property {number} waiverRank The team's current rank on the wavier wire.
   *
   * @property {number} pointsFor The cumulative points the team has scored in the season.
   * @property {number} pointsAgainst The cumulative points scored by the team's opponents in the
   *                                  season.
   *
   * @property {number} wins The number of match-ups the team has won in the season.
   * @property {number} losses The number of match-ups the team has lost in the season.
   * @property {number} ties The number of match-ups the team has tied in the season.
   *
   * @property {number} leagueStanding The team's standing in the entire league, ignoring division.
   * @property {number} divisionStanding The team's standing within its division.
   */

  /**
   * @type {TeamModel}
   */
  static responseMap = {
    teamId: 'teamId',
    firstName: 'teamLocation',
    lastName: 'teamNickname',
    abbreviation: 'teamAbbrev',
    waiverRank: 'waiverRank',

    pointsFor: 'record.pointsFor',
    pointsAgainst: 'record.pointsAgainst',

    wins: 'record.overallWins',
    losses: 'record.overallLosses',
    ties: 'record.overallTies',

    leagueStanding: 'overallStanding',
    divisionStanding: 'divisionStanding'
  };

  static idName = 'teamId';
}

export default Team;
