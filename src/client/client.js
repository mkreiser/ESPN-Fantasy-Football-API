import axios from 'axios';
import _ from 'lodash';

import Boxscore from '../boxscore/boxscore';
import FreeAgentPlayer from '../free-agent-player/free-agent-player';
import League from '../league/league';
import MatchupScore from '../matchup-score/matchup-score';
import NFLGame from '../nfl-game/nfl-game';
import Team from '../team/team';

axios.defaults.baseURL = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/';

/**
 * Provides functionality to make a variety of API calls to ESPN for a given fantasy football
 * league. This class should be used by consuming projects.
 *
 * @class
 */
class Client {
  constructor(options = {}) {
    this.leagueId = options.leagueId;

    this.setCookies({ espnS2: options.espnS2, SWID: options.SWID });
  }

  /**
   * Set cookies from ESPN for interacting with private leagues in NodeJS. Both cookie smust be
   * provided to be set. See the README for instructions on how to find these cookies.
   *
   * @param {object} options Required options object.
   * @param {string} options.espnS2 The value of the `espn_s2` cookie key:value pair to auth with.
   * @param {string} options.SWID The value of the `SWID` cookie key:value pair to auth with.
   */
  setCookies({ espnS2, SWID }) {
    if (espnS2 && SWID) {
      this.espnS2 = espnS2;
      this.SWID = SWID;
    }
  }

  /**
   * Returns all boxscores for a week.
   *
   * NOTE: Due to the way ESPN populates data, both the `scoringPeriodId` and `matchupPeriodId` are
   * required and must correspond with each other correctly.
   *
   * @param  {object} options Required options object.
   * @param  {number} options.seasonId The season in which the boxscore occurs.
   * @param  {number} options.matchupPeriodId The matchup period in which the boxscore occurs.
   * @param  {number} options.scoringPeriodId The scoring period in which the boxscore occurs.
   * @returns {Boxscore[]} All boxscores for the week
   */
  getBoxscoreForWeek({ seasonId, matchupPeriodId, scoringPeriodId }) {
    const route = this._buildLeagueSeasonRouteWithParams(
      seasonId,
      { scoringPeriodId, view: ['mMatchup', 'mMatchupScore'] }
    );

    return axios.get(route, this._buildAxiosConfig()).then((response) => {
      const schedule = _.get(response.data, 'schedule');
      const data = _.filter(schedule, { matchupPeriodId });

      return _.map(data, (matchup) => (
        Boxscore.buildFromServer(matchup, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Returns boxscores WITHOUT ROSTERS for PREVIOUS seasons. Useful for pulling historical
   * scoreboards.
   *
   * NOTE: This route will error for the current season, as ESPN only exposes this data for previous
   * seasons.
   *
   * NOTE: Due to the way ESPN populates data, both the `scoringPeriodId` and `matchupPeriodId` are
   * required and must correspond with each other correctly.
   *
   * @param  {object} options Required options object.
   * @param  {number} options.seasonId The season in which the boxscore occurs.
   * @param  {number} options.matchupPeriodId The matchup period in which the boxscore occurs.
   * @param  {number} options.scoringPeriodId The scoring period in which the boxscore occurs.
   * @returns {Boxscore[]} All boxscores for the week
   */
  getHistoricalScoreboardForWeek({ seasonId, matchupPeriodId, scoringPeriodId }) {
    const route = this.constructor._buildRoute({
      base: `${this.leagueId}`,
      params: `?scoringPeriodId=${scoringPeriodId}&seasonId=${seasonId}` +
        '&view=mMatchupScore&view=mScoreboard&view=mSettings&view=mTopPerformers&view=mTeam'
    });

    const axiosConfig = this._buildAxiosConfig({
      baseURL: 'https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/'
    });
    return axios.get(route, axiosConfig).then((response) => {
      const schedule = _.get(response.data[0], 'schedule'); // Data is an array instead of object
      const data = _.filter(schedule, { matchupPeriodId });

      return _.map(data, (matchup) => (
        Boxscore.buildFromServer(matchup, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Returns all free agents (in terms of the league's rosters) for a given week.
   *
   * NOTE: `scoringPeriodId` of 0 corresponds to the preseason; `18` for after the season ends.
   *
   * @param  {object} options Required options object.
   * @param  {number} options.seasonId The season to grab data from.
   * @param  {number} options.scoringPeriodId The scoring period to grab free agents from.
   * @returns {FreeAgentPlayer[]} The list of free agents.
   */
  getFreeAgents({ seasonId, scoringPeriodId }) {
    const route = this._buildLeagueSeasonRouteWithParams(seasonId, { scoringPeriodId, view: 'kona_player_info' });

    return axios.get(route, this._buildAxiosConfig()).then((response) => {
      const data = _.get(response.data, 'players');
      return _.map(data, (player) => (
        FreeAgentPlayer.buildFromServer(player, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Returns an array of Team objects representing each fantasy football team in the FF league.
   *
   * NOTE: Does not include roster data
   *
   * @param  {object} options Required options object.
   * @param  {number} options.seasonId The season to grab data from.
   * @returns {Team[]} The list of teams
   */
  getTeams({ seasonId }) {
    const teamRoute = this._buildLeagueSeasonRouteWithParams(seasonId, { view: 'mTeam' });

    return axios.get(teamRoute, this._buildAxiosConfig()).then((response) => {
      const teams = _.get(response.data, 'teams');
      return _.map(teams, (team) => (
        Team.buildFromServer(team, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Returns an array of Team object representing each fantasy football team in the FF league.
   *
   * @param  {object} options Required options object.
   * @param  {number} options.seasonId The season to grab data from.
   * @param  {number} options.scoringPeriodId The scoring period in which to grab teams from.
   * @returns {Team[]} The list of teams.
   */
  getTeamsAtWeek({ seasonId, scoringPeriodId }) {
    const teamRosterRoute = this._buildLeagueSeasonRouteWithParams(
      seasonId,
      { scoringPeriodId, view: ['mRoster', 'mTeam'] }
    );

    return axios.get(teamRosterRoute, this._buildAxiosConfig()).then((response) => {
      const teamsWithRosters = _.get(response.data, 'teams');
      return _.map(teamsWithRosters, (teamWithRoster) => (
        Team.buildFromServer(teamWithRoster, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Returns all NFL games that occur in the passed timeframe. NOTE: Date format must be "YYYYMMDD".
   *
   * @param  {object} options Required options object.
   * @param  {string} options.startDate Must be in "YYYYMMDD" format.
   * @param  {string} options.endDate   Must be in "YYYYMMDD" format.
   * @returns {NFLGame[]} The list of NFL games.
   */
  getNFLGamesForPeriod({ startDate, endDate }) {
    const route = this.constructor._buildRoute({
      base: 'apis/fantasy/v2/games/ffl/games',
      params: `?dates=${startDate}-${endDate}&pbpOnly=true`
    });

    const axiosConfig = this._buildAxiosConfig({ baseURL: 'https://site.api.espn.com/' });

    return axios.get(route, axiosConfig).then((response) => {
      const data = _.get(response.data, 'events');
      return _.map(data, (game) => NFLGame.buildFromServer(game));
    });
  }

  /**
   * Returns info on an ESPN fantasy football league
   *
   * @param   {object} options Required options object.
   * @param   {number} options.seasonId The season to grab data from.
   * @returns {League} The league info.
   */
  getLeagueInfo({ seasonId }) {
    const route = this._buildLeagueSeasonRouteWithParams(seasonId, { view: 'mSettings' });

    return axios.get(route, this._buildAxiosConfig()).then((response) => {
      const data = _.get(response.data, 'settings');
      return League.buildFromServer(data, { leagueId: this.leagueId, seasonId });
    });
  }

  /**
   * Returns all matchup scores for a season.
   *
   * @param   {object} options Required options object.
   * @param   {number} options.seasonId The season to grab data from.
   * @returns {MatchupScore[]} The list of matchup scores.
   */
  getMatchupScores({ seasonId }) {
    const route = this._buildLeagueSeasonMatchupScoreRoute(seasonId);

    return axios.get(route, this._buildAxiosConfig()).then((response) => {
      const matchupData = _.get(response.data, 'schedule');
      return _.map(matchupData, (matchup) => (
        MatchupScore.buildFromServer(matchup, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  /**
   * Correctly builds an axios config with cookies, if set on the instance
   *
   * @param   {object} config An axios config.
   * @returns {object} An axios config with cookies added if set on instance
   * @private
   */
  _buildAxiosConfig(config) {
    if ((this.espnS2 && this.SWID)) {
      const headers = { Cookie: `espn_s2=${this.espnS2}; SWID=${this.SWID};` };
      return _.merge({}, config, { headers, withCredentials: true });
    }

    return config;
  }

  /**
   * Correctly builds a base route for a league season
   *
   * @param  {number} seasonId The season to construct the route for.
   * @returns {string} A base route for a league season
   * @private
   */
  _getLeagueSeasonBaseRoute(seasonId) {
    return `${seasonId}/segments/0/leagues/${this.leagueId}`;
  }

  /**
   * Correctly builds a route for a league season with parameters
   *
   * @param  {number} seasonId The season to construct the route for.
   * @param  {object} params Key/value parameters to append to the base route
   * @returns {string} A route for a league season with parameters
   * @private
   */
  _buildLeagueSeasonRouteWithParams(seasonId, params) {
    const str = [];
    Object.keys(params).forEach((p) => {
      if (!_.isArray(params[p])) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);

        return;
      }

      params[p].forEach((v) => {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(v)}`);
      });
    });

    return this.constructor._buildRoute({
      base: this._getLeagueSeasonBaseRoute(seasonId),
      params: `?${str.join('&')}`
    });
  }

  /**
   * Correctly builds a route for a league season with parameters
   *
   * @param  {number} seasonId The season to construct the route for.
   * @returns {string} A route for matchup scores in a league season
   * @private
   */
  _buildLeagueSeasonMatchupScoreRoute(seasonId) {
    return this._buildLeagueSeasonRouteWithParams(seasonId, { view: 'mMatchupScore' });
  }

  static _buildRoute({ base, params }) {
    return `${base}${params}`;
  }
}

export default Client;
