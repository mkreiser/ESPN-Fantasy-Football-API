import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Team from '../team/team.js';

/**
 * Represents a single matchup on a {@link Scoreboard}. Each team, their score, and the matchup
 * winner, is populated here. If the matchup represents a bye week (where the matchup is not
 * actually being contested), the `isByeWeek` prop will be `true`.
 * @extends BaseObject
 */
class ScoreboardMatchup extends BaseObject {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the parent scoreboard belongs.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the parent scoreboard belongs.
     * @type {number}
     */
    this.seasonId = options.seasonId;
  }

  static displayName = 'ScoreboardMatchup';

  static idName = 'leagueId';

  /**
   * @typedef {object} ScoreboardMatchupModel
   * @property {Team} homeTeam An instance of the home team. Uses a cached instance if possible.
   * @property {Team} awayTeam An instance of the home team. Uses a cached instance if possible.
   * @property {number} homeTeamScore Score of the home team.
   * @property {number} awayTeamScore Score of the away team.
   * @property {boolean} isByeWeek Whether or not the matchup is in a bye week.
   * @property {Team} wunner The Team instance of the winning team.
   */

  /**
    * @type {ScoreboardMatchupModel}
    */
  static responseMap = {
    homeTeam: {
      key: 'teams',
      manualParse: (responseData, response, model) => {
        const homeTeamData = _.find(responseData, { home: true });
        if (!homeTeamData) {
          return undefined;
        }

        const cachingId = Team.getCacheId({
          leagueId: model.leagueId,
          seasonId: model.seasonId,
          teamId: homeTeamData.teamId
        });
        const cachedTeam = Team.get(cachingId);
        return cachedTeam || Team.buildFromServer(homeTeamData.team);
      }
    },
    awayTeam: {
      key: 'teams',
      manualParse: (responseData, response, model) => {
        const awayTeamData = _.find(responseData, { home: false });
        if (!awayTeamData) {
          return undefined;
        }

        const cachingId = Team.getCacheId({
          leagueId: model.leagueId,
          seasonId: model.seasonId,
          teamId: awayTeamData.teamId
        });
        const cachedTeam = Team.get(cachingId);
        return cachedTeam || Team.buildFromServer(awayTeamData.team);
      }
    },

    homeTeamScore: {
      key: 'teams',
      manualParse: (responseData) => {
        const homeTeamData = _.find(responseData, { home: true });
        return _.get(homeTeamData, 'score');
      }
    },
    awayTeamScore: {
      key: 'teams',
      manualParse: (responseData) => {
        const awayTeamData = _.find(responseData, { home: false });
        return _.get(awayTeamData, 'score');
      }
    },

    isByeWeek: 'bye',
    winner: {
      key: 'teams',
      defer: true,
      manualParse: (responseData, response, model) => {
        if (_.isEmpty(response.winner)) {
          return undefined;
        }

        return response.winner === 'home' ? model.homeTeam : model.awayTeam;
      }
    }
  };
}

export default ScoreboardMatchup;
