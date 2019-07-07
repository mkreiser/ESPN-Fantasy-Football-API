import axios from 'axios';
import _ from 'lodash';

import Boxscore from '../boxscore/boxscore';
import FreeAgentPlayer from '../free-agent-player/free-agent-player';

axios.defaults.baseURL = 'http://fantasy.espn.com/apis/v3/games/ffl/seasons/';

class Client {
  constructor(options = {}) {
    this.leagueId = options.leagueId;

    this.setCookies({ espnS2: options.espnS2, SWID: options.SWID });
  }

  /**
   * Correctly builds an axios config with cookies, if set on the instance
   * @param  {object} config An axios config.
   * @return {object}        An axios config with cookies added if set on instance
   * @private
   */
  _buildAxiosConfig(config) {
    if ((this.espnS2 && this.SWID)) {
      const headers = { Cookie: `espn_s2=${this.espnS2}; SWID=${this.SWID};` };
      return _.merge({}, config, { headers, withCredentials: true });
    }

    return config;
  }

  setCookies({ espnS2, SWID }) {
    if (espnS2 && SWID) {
      this.espnS2 = espnS2;
      this.SWID = SWID;
    }
  }

  getBoxscoreForWeek({ seasonId, matchupPeriodId, scoringPeriodId }) {
    const routeBase = `${seasonId}/segments/0/leagues/${this.leagueId}`;
    const routeParams = `?view=mMatchup&view=mMatchupScore&scoringPeriodId=${scoringPeriodId}`;
    const route = `${routeBase}${routeParams}`;

    return axios.get(route, this.buildAxiosConfig()).then((response) => {
      const schedule = _.get(response.data, 'schedule');
      const data = _.filter(schedule, { matchupPeriodId });

      return _.map(data, (matchup) => (
        Boxscore.buildFromServer(matchup, { leagueId: this.leagueId, seasonId })
      ));
    });
  }

  getFreeAgents({ seasonId, scoringPeriodId }) {
    const routeBase = `${seasonId}/segments/0/leagues/${this.leagueId}`;
    const routeParams = `?scoringPeriodId=${scoringPeriodId}&view=kona_player_info`;
    const route = `${routeBase}${routeParams}`;

    return axios.get(route, this.buildAxiosConfig()).then((response) => {
      const data = _.get(response.data, 'players');
      return _.map(data, (player) => (
        FreeAgentPlayer.buildFromServer(player, { leagueId: this.leagueId, seasonId })
      ));
    });
  }
}

export default Client;
