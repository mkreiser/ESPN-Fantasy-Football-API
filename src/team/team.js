import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';

/**
 * Represents a fantasy football team in a League. To get team information, a request must be made
 * to the `leagueSettings` route. There is not a generic team route on the ESPN API. Teams should
 * be populate when you get a League, so additional request should be unnecessary.
 * @extends ApiModel
 */
class Team extends ApiModel {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the team belongs. Required to make reads on the Team instance.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the team belongs. Required to make reads on the
     * Team instance.
     * @type {number}
     */
    this.seasonId = options.seasonId;
  }

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

  static displayName = 'Team';

  /**
   * Makes a call to the passed route with the passed params. Defers actual GET call to
   * `static read` Automatically includes the id of the instance in the params. On successful read,
   * populates the instance with the new response data.
   * @async
   * @throws {Error} If route is not passed
   * @throws {Error} If params.leagueId is not passed
   * @param  {string} options.route   The route on the API to call.
   * @param  {Object} options.params  Params to pass on the GET call.
   * @param  {boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise}
   */
  static read(
    { model, route = this.route, params, reload = true } = { route: this.route, reload: true }
  ) {
    if (!_.get(params, 'leagueId')) {
      throw new Error(`${this.displayName}: static read: cannot read without leagueId param`);
    }

    return super.read({ model, route, params, reload });
  }

  /**
   * Makes a call to the passed route with the passed params. Defers actual GET call to
   * `static read` Automatically includes the id, leagueId, and seasonId of the instance in the
   * params. On successful read, populates the instance with the new response data.
   * @async
   * @throws {Error} If route is not passed
   * @param  {string} options.route   The route on the API to call.
   * @param  {Object} options.params  Params to pass on the GET call.
   * @param  {boolean} options.reload Whether or not to bypass the cache and force a GET call.
   * @return {Promise}
   */
  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    const paramsWithId = _.assign({}, params, {
      leagueId: this.leagueId,
      seasonId: this.seasonId
    });

    return super.read({
      route,
      model: this,
      params: paramsWithId,
      reload
    });
  }
}

export default Team;
