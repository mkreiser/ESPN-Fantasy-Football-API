import axios from 'axios';

import ApiModel from './src/api-model/api-model.js';

import League from './src/league/league.js';
import NFLTeam from './src/nfl-team/nfl-team.js';
import Player from './src/player/player.js';
import Scoreboard from './src/scoreboard/scoreboard.js';
import ScoreboardMatchup from './src/scoreboard-matchup/scoreboard-matchup.js';
import Team from './src/team/team.js';

import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
} from './src/constants.js';

axios.defaults.baseURL = 'http://games.espn.com/ffl/api/v2/';

export {
  ApiModel,

  League,
  NFLTeam,
  Player,
  Scoreboard,
  ScoreboardMatchup,
  Team,

  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
};
