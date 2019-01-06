import _ from 'lodash';

import BaseAPIObject from '../base-api-object/base-api-object.js';
import Team from '../team/team.js';

import { slotCategoryIdToPositionMap } from '../constants.js';

/**
 * Represents a fantasy football league. Due to ESPN's API routing, most information comes from the
 * league request. It's what we got ¯\\\_(ツ)_/¯.
 * @extends BaseAPIObject
 */
class League extends BaseAPIObject {
  static displayName = 'League';

  static idName = 'leagueId';

  static route = 'leagueSettings';

  /**
   * @typedef {object} LeagueModel
   *
   * On the ESPN API:
   *
   * `matchupPeriod` refers to an entire match-up, including if the match-up lasts
   * multiple weeks (not rare in playoff settings for smaller leagues).
   *
   * `scoringPeriod` refers to a single NFL week. Since most match-ups are 1 week long, this will
   * match up with the `matchupPeriod`. However, for multi-week match-ups, this allows one to get
   * information about a specific week in the match-up (useful in multi-week playoff match-up).
   *
   * @property {number} leagueId
   * @property {string} seasonId The season (year) of the league data.
   * @property {string} name The league's name.
   * @property {object[]} divisions The league's divisions. Each division object contains the id,
   *                                size, and name of the division.
   * @property {Team[]} teams The league's teams.
   * @property {object[]} lineupPositionLimits An array of objects outlining the maximum amount of
   *                                           players that can be played in a position in a valid
   *                                           lineup.
   * @property {Team[]} draftOrder An array of Teams listed in order of their draft pick positions.
   * @property {Team[]} playoffSeedOrder An array of Teams listed in order of their playoff seeding.
   * @property {Team[]} finalRankings An array of Teams listed in order of their final rank.
   * @property {number} numTeams The number of teams in the league.
   * @property {number} numPlayoffTeams The number of teams that make the playoffs.
   * @property {number} scoringDecimalPlaces The number of decimals used in scoring.
   * @property {string} regularSeasonTiebreaker A string representing the regular season tiebreaker
   *                                            rule. Returned on response as numerical enum:
   *                                            0: None,
   *                                            1: Home team wins,
   *                                            2: Most bench points,
   *                                            3: Most QB points,
   *                                            4: Most RB points
   * @property {string} playoffTiebreaker A string representing the playoff tiebreaker rule.
   *                                      Returned on response as numerical enum:
   *                                      -1: Head to head record
   *                                      0: Total points for
   *                                      1: Intra-division record
   *                                      2: Total points against
   * @property {number} numRegularSeasonMatchups The number of regular season match-ups. If the
   *                                             league's regular season match-up length is 1, then
   *                                             this is also the number of weeks in the regular
   *                                             season.
   * @property {number} regularSeasonMatchupLength The length of each match-up in the regular
   *                                                season. Usually 1 week.
   * @property {number} playoffMatchupLength The length of each match-up in the playoffs. This is
   *                                         typically 1 (week) or 2 (weeks).
   * @property {number} firstMatchupId The id of the first match-up period. Almost always 1.
   * @property {number} firstWeekId The first NFL week on which a match-up occurs. Almost always 1.
   * @property {number} lastMatchupId The id of the last match-up. Is a function of weeks played and
   *                                  playoff match-up period. If `playoffMatchupLength` is 1 and
   *                                  the last week played is 16, then `lastMatchupId` will be 16.
   *                                  If `playoffMatchupLength` is 2, the first week of the playoffs
   *                                  is 14, and the last week played is 17, then `lastMatchupId` is
   *                                  15.
   * @property {number} lastWeekId The id of the last NFL week played.
   * @property {boolean} allowsTrades Whether or not trades are allow between teams.
   * @property {number} tradeRevisionHours The number of hours for a trade to be revised, including
   *                                       vetoes.
   */

  /**
    * @type {LeagueModel}
    */
  static responseMap = {
    leagueId: 'leaguesettings.id',
    seasonId: 'leaguesettings.season',
    name: 'leaguesettings.name',
    divisions: 'leaguesettings.divisions',
    teams: {
      key: 'leaguesettings.teams',
      manualParse: (responseData, response) => _.map(responseData, (team) => {
        const leagueId = _.get(response, 'leaguesettings.id');
        const seasonId = _.get(response, 'leaguesettings.season');

        return Team.buildFromServer(team, {
          leagueId: leagueId ? _.toNumber(leagueId) : undefined,
          seasonId: seasonId ? _.toNumber(seasonId) : undefined
        });
      })
    },

    lineupPositionLimits: {
      key: 'leaguesettings.slotCategoryItems',
      manualParse: (responseData) => _.map(responseData, (position) => {
        return {
          limit: position.num,
          position: _.get(slotCategoryIdToPositionMap, position.slotCategoryId)
        };
      })
    },

    draftOrder: {
      key: 'leaguesettings.draftOrder',
      defer: true,
      manualParse: (responseData, response, model) => model.constructor._parseUsingCachedTeam({
        responseData, model
      })
    },
    playoffSeedOrder: {
      key: 'leaguesettings.playoffSeedings',
      defer: true,
      manualParse: (responseData, response, model) => model.constructor._parseUsingCachedTeam({
        responseData, model
      })
    },
    finalRankings: {
      key: 'leaguesettings.finalCalculatedRanking',
      defer: true,
      manualParse: (responseData, response, model) => model.constructor._parseUsingCachedTeam({
        responseData, model
      })
    },

    numTeams: 'leaguesettings.size',
    numPlayoffTeams: 'leaguesettings.playoffTeamCount',
    scoringDecimalPlaces: 'leaguesettings.scoringDecimalPlaces',
    regularSeasonTiebreaker: {
      key: 'leaguesettings.tieRule',
      manualParse: (responseData) => {
        switch (responseData) {
          case 0: return 'None';
          case 1: return 'Home team wins';
          case 2: return 'Most bench points';
          case 3: return 'Most QB points';
          case 4: return 'Most RB points';
          default: return 'ERROR: regularSeasonTiebreaker not recognized';
        }
      }
    },
    playoffTiebreaker: {
      key: 'leaguesettings.playoffTieRuleRawStatId',
      manualParse: (responseData) => {
        switch (responseData) {
          case -1: return 'Head to head record';
          case 0: return 'Total points for';
          case 1: return 'Intra-division record';
          case 2: return 'Total points against';
          default: return 'ERROR: playoffTiebreaker not recognized';
        }
      }
    },

    numRegularSeasonMatchups: 'leaguesettings.regularSeasonMatchupPeriodCount',
    regularSeasonMatchupLength: 'leaguesettings.regularSeasonMatchupLength',
    playoffMatchupLength: 'leaguesettings.playoffMatchupLength',

    firstMatchupId: 'leaguesettings.firstMatchupPeriodId',
    firstWeekId: 'leaguesettings.firstScoringPeriodId',
    lastMatchupId: 'leaguesettings.finalMatchupPeriodId',
    lastWeekId: 'leaguesettings.finalScoringPeriodId',

    allowsTrades: 'leaguesettings.allowsTrades',
    tradeRevisionHours: 'leaguesettings.tradeRevisionHours'
  };

  /**
   * Helper for deferred items in the `responseMap` that use cached Team instances.
   * @private
   */
  static _parseUsingCachedTeam({ responseData, model }) {
    return _.map(responseData, (teamId) => {
      const cachingId = Team.getCacheId({
        leagueId: model.leagueId,
        seasonId: model.seasonId,
        teamId
      });

      return Team.get(cachingId);
    });
  }

  static getCacheId(params = {}) {
    return (params.leagueId && params.seasonId) ?
      `${params.leagueId}-${params.seasonId}` :
      undefined;
  }

  static read(
    { model, route = this.route, params, reload = true } = { route: this.route, reload: true }
  ) {
    if (!_.get(params, 'leagueId')) {
      throw new Error(`${this.displayName}: static read: cannot read without leagueId`);
    }

    return super.read({ model, route, params, reload });
  }

  read({
    route = this.constructor.route, params, reload = true
  } = {
    route: this.constructor.route, reload: true
  }) {
    // `leagueId` is handled by super.read
    const idParams = _.pickBy({ seasonId: this.seasonId }, (value) => _.isFinite(value));
    const paramsWithIds = _.assign({}, params, idParams);

    return super.read({
      route,
      model: this,
      params: paramsWithIds,
      reload
    });
  }
}

export default League;
