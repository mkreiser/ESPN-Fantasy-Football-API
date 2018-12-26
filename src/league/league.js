import _ from 'lodash';

import ApiModel from '../api-model/api-model.js';
import Team from '../team/team.js';

/**
 * Represents a fantasy football league. Due to ESPN's API routing, most information comes from the
 * league request. It's what we got ¯\\\_(ツ)_/¯.
 * @extends ApiModel
 */
class League extends ApiModel {
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
   * @property {Team[]} draftOrder An array of Teams listed in order of their draft pick positions.
   * @property {Team[]} playoffSeedOrder An array of Teams listed in order of their playoff seeding.
   * @property {Team[]} finalRankings An array of Teams listed in order of their final rank.
   * @property {number} numTeams The number of teams in the league.
   * @property {number} numPlayoffTeams The number of teams that make the playoffs.
   * @property {number} scoringDecimalPlaces The number of decimals used in scoring.
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
      ApiModel: Team,
      manualParse: (responseData, response) => _.map(responseData, (team) => {
        const leagueId = _.get(response, 'leaguesettings.id');
        const seasonId = _.get(response, 'leaguesettings.season');

        return Team.buildFromServer(team, {
          leagueId: leagueId ? _.toNumber(leagueId) : undefined,
          seasonId: seasonId ? _.toNumber(seasonId) : undefined
        });
      })
    },

    draftOrder: {
      key: 'leaguesettings.draftOrder',
      ApiModel: Team,
      defer: true,
      manualParse: (responseData) => _.map(responseData, (id) => Team.get(id))
    },
    playoffSeedOrder: {
      key: 'leaguesettings.playoffSeedings',
      ApiModel: Team,
      defer: true,
      manualParse: (responseData) => _.map(responseData, (id) => Team.get(id))
    },
    finalRankings: {
      key: 'leaguesettings.finalCalculatedRanking',
      ApiModel: Team,
      defer: true,
      manualParse: (responseData) => _.map(responseData, (id) => Team.get(id))
    },

    numTeams: 'leaguesettings.size',
    numPlayoffTeams: 'leaguesettings.playoffTeamCount',
    scoringDecimalPlaces: 'leaguesettings.scoringDecimalPlaces',

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

  static displayName = 'League';

  static idName = 'leagueId';

  static route = 'leagueSettings';

  /**
   * Makes a call to the passed route with the passed params. Defers actual GET call to
   * `static read` Automatically includes the id, and seasonId of the instance in the params. On
   * successful read, populates the instance with the new response data.
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

export default League;
