import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import SlottedPlayer from '../slotted-player/slotted-player.js';
import Team from '../team/team.js';

/**
 * Represents a roster of players on a fantasy football team.
 *
 * Roster does not have a provided unique id. Rather, the nessecary identifers are gathered via a
 * combination of id parameters.
 *
 * @extends BaseAPIObject
 */
class Roster extends BaseAPIObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the league to which the roster belongs. Required to make reads.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the roster belongs. Required to make reads.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the team to which the roster belongs. Required to make reads.
     * @type {number}
     */
    this.teamId = options.teamId;

    /**
     * The scoring period (week) of which the roster belongs to. Optional. Defaults to current week.
     * Useful for historical data.
     * @type {number}
     */
    this.scoringPeriodId = options.scoringPeriodId;
  }

  static displayName = 'Roster';

  static route = 'rosterInfo';

  /**
   * @typedef {object} RosterObject
   *
   * @property {Team} team The team to which the roster belongs to.
   * @property {SlottedPlayer[]} team The players on the roster.
   */

  /**
    * @type {RosterObject}
    */
  static responseMap = {
    team: {
      key: 'leagueRosters.teams',
      manualParse: (responseData, response, constructorParams) => {
        const data = _.find(responseData, { teamId: constructorParams.teamId });
        const cachingId = Team.getCacheId(constructorParams);

        return Team.get(cachingId) || Team.buildFromServer(_.get(data, 'team'), constructorParams);
      }
    },
    players: {
      key: 'leagueRosters.teams',
      manualParse: (responseData, response, constructorParams) => {
        const data = _.find(responseData, { teamId: constructorParams.teamId });
        const slots = _.get(data, 'slots');

        return _.map(slots, (slottedPlayer) => (
          SlottedPlayer.buildFromServer(slottedPlayer, constructorParams)
        ));
      }
    }
  };

  static getCacheId({
    leagueId, seasonId, teamId, scoringPeriodId
  } = {}) {
    return (teamId && leagueId && seasonId && scoringPeriodId) ?
      `${teamId}-${leagueId}-${seasonId}-${scoringPeriodId}` :
      undefined;
  }

  static read(
    {
      instance, route = this.route, params, reload = true
    } = { route: this.route, reload: true }
  ) {
    if (!_.get(params, 'leagueId')) {
      throw new Error(`${this.displayName}: static read: cannot read without leagueId`);
    } else if (!_.get(params, 'seasonId')) {
      throw new Error(`${this.displayName}: static read: cannot read without seasonId`);
    } else if (!_.get(params, 'teamId') && !_.get(params, 'teamIds')) {
      throw new Error(`${this.displayName}: static read: cannot read without teamId`);
    }

    const cleanParams = _.clone(params);
    if (!cleanParams.teamIds) {
      cleanParams.teamIds = cleanParams.teamId;
    }

    return super.read({
      instance, route, params: cleanParams, reload
    });
  }

  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    const idParams = _.pickBy({
      leagueId: this.leagueId,
      seasonId: this.seasonId,
      teamId: this.teamId, // For passing teamId down to populated instances
      teamIds: this.teamId, // Rename for ESPN API request
      scoringPeriodId: this.scoringPeriodId
    }, (value) => _.isFinite(value));

    const paramsWithIds = _.assign({}, params, idParams);

    return super.read({
      route,
      params: paramsWithIds,
      reload
    });
  }
}

export default Roster;
