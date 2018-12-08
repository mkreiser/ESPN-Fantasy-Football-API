import axios from 'axios';

import ApiModel from './src/api-model/api-model.js';

import League from './src/league/league.js';
import Team from './src/team/team.js';

axios.defaults.baseURL = 'http://games.espn.com/ffl/api/v2/';

export {
  ApiModel,

  League,
  Team
};
