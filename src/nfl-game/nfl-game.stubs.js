import _ from 'lodash';

import nflTeams from '../nfl-teams/nfl-teams.js';

/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  awayTeam: _.get(nflTeams, 8),
  awayTeamScore: 0,
  gameDate: '2018-12-30T18:00:00.000Z',
  gameId: 381230009,
  gameStatus: 'Game has not started',
  homeTeam: _.get(nflTeams, 9),
  homeTeamScore: 0,
  quarter: 0,
  timeLeftInQuarter: '0:00'
};

const serverResponse = {
  gameId: 381230009,
  awayProTeamId: 8,
  period: 0,
  homeScore: 0,
  gameDate: '2018-12-30T18:00:00.000Z',
  awayScore: 0,
  timeRemainingInPeriod: '0:00',
  homeProTeamId: 9,
  status: 1
};

export { localObject, serverResponse };
