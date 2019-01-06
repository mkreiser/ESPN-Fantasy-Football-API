import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';

import SlottedPlayer from '../slotted-player/slotted-player.js';
import Team from '../team/team.js';

/**
 *
 * Roster DOES NOT have an `id`. Rather, the nessecary identifers are gathered via a combination of
 * id parameters.
 *
 * @extends BaseAPIObject
 */
class Roster extends BaseAPIObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the league to which the roster belongs. Required to make reads on the Roster instance.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the roster belongs. Required to make reads on the
     * Roster instance.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the team to which the roster belongs. Required to make reads on the Roster instance.
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

  static route = 'rosterinfo';

  /**
   * @typedef {object} RosterModel
   *
   * @property {number} teamId
   */

  /**
    * @type {RosterModel}
    */
  static responseMap = {
    team: {
      key: 'leagueRosters.teams',
      manualParse: (responseData, response, model) => {
        const data = _.find(responseData, { teamId: model.teamId });

        const cachingId = Team.getCacheId({
          leagueId: model.leagueId,
          seasonId: model.seasonId,
          teamId: _.get(data, 'teamId')
        });

        return Team.get(cachingId) || Team.buildFromServer(
          _.get(data, 'team'),
          { leagueId: model.leagueId, seasonId: model.seasonId }
        );
      }
    },
    players: {
      key: 'leagueRosters.teams',
      manualParse: (responseData, response, model) => {
        const data = _.find(responseData, { teamId: _.get(model, 'teamId') });
        const slots = _.get(data, 'slots');
        return _.map(slots, (slottedPlayer) => SlottedPlayer.buildFromServer(slottedPlayer));
      }
    }
  };

  static getCacheId(params = {}) {
    return (params.teamId && params.leagueId && params.seasonId && params.scoringPeriodId) ?
      `${params.teamId}-${params.leagueId}-${params.seasonId}-${params.scoringPeriodId}` :
      undefined;
  }

  static read(
    { model, route = this.route, params, reload = true } = { route: this.route, reload: true }
  ) {
    if (!_.get(params, 'leagueId')) {
      throw new Error(`${this.displayName}: static read: cannot read without leagueId`);
    } else if (!_.get(params, 'seasonId')) {
      throw new Error(`${this.displayName}: static read: cannot read without seasonId`);
    } else if (!_.get(params, 'teamId')) {
      throw new Error(`${this.displayName}: static read: cannot read without teamId`);
    }

    return super.read({ model, route, params, reload });
  }

  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    const idParams = _.pickBy({
      leagueId: this.leagueId,
      seasonId: this.seasonId,
      teamIds: this.teamId,
      scoringPeriodId: this.scoringPeriodId
    }, (value) => _.isFinite(value));

    const paramsWithIds = _.assign({}, params, idParams);

    return super.read({
      route,
      model: this,
      params: paramsWithIds,
      reload
    });
  }
}

export default Roster;
