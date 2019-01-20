import _ from 'lodash';

import BaseObject from '../base-object/base-object.js';

import Team from '../team/team.js';

/**
 * Represents a single matchup on a {@link Scoreboard}. Each team, their score, and the matchup
 * winner is populated. If the matchup represents a bye week (where the matchup is not actually
 * being contested), the `isByeWeek` prop will be `true`.
 *
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
   * @typedef {object} ScoreboardMatchupObject
   *
   * @property {Team} homeTeam An instance of the home team. Uses a cached Team if possible.
   * @property {Team} awayTeam An instance of the away team. Uses a cached Team if possible.
   *
   * @property {number} homeTeamScore Score of the home team.
   * @property {number} awayTeamScore Score of the away team.
   *
   * @property {boolean} isByeWeek Whether or not the matchup is in a bye week.
   * @property {Team} wunner The winning team.
   */

  /**
    * @type {ScoreboardMatchupObject}
    */
  static responseMap = {
    homeTeam: {
      key: 'teams',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeam({
          isHome: true, responseData, constructorParams
        })
      )
    },
    awayTeam: {
      key: 'teams',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeam({
          isHome: false, responseData, constructorParams
        })
      )
    },

    homeTeamScore: {
      key: 'teams',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeamScore({
          isHome: true, responseData
        })
      )
    },
    awayTeamScore: {
      key: 'teams',
      manualParse: (responseData, response, constructorParams, instance) => (
        instance.constructor._parseTeamScore({
          isHome: false, responseData
        })
      )
    },

    isByeWeek: 'bye',
    winner: {
      key: 'teams',
      defer: true,
      manualParse: (responseData, response, constructorParams, instance) => {
        if (_.isEmpty(response.winner)) {
          return undefined;
        }

        return response.winner === 'home' ? instance.homeTeam : instance.awayTeam;
      }
    }
  };

  /**
   * Helper for team parsing.
   * @private
   */
  static _parseTeam({ isHome, responseData, constructorParams }) {
    const teamData = _.find(responseData, { home: isHome });
    if (!teamData) {
      return undefined;
    }

    const cachingId = Team.getCacheId(_.assign({}, constructorParams, { teamId: teamData.teamId }));
    return Team.get(cachingId) || Team.buildFromServer(teamData.team, constructorParams);
  }

  /**
   * Helper for team score parsing.
   * @private
   */
  static _parseTeamScore({ isHome, responseData }) {
    const teamData = _.find(responseData, { home: isHome });
    return _.get(teamData, 'score');
  }
}

export default ScoreboardMatchup;
