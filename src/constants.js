/**
 * Maps `slotCategoryId`'s numerical enum to readable positions.
 *
 * @type {object}
 */
const slotCategoryIdToPositionMap = {
  0: 'QB',
  1: 'TQB',
  2: 'RB',
  3: 'RB/WR',
  4: 'WR',
  5: 'WR/TE',
  6: 'TE',
  7: 'OP',
  8: 'DT',
  9: 'DE',
  10: 'LB',
  11: 'DL',
  12: 'CB',
  13: 'S',
  14: 'DB',
  15: 'DP',
  16: 'D/ST',
  17: 'K',
  18: 'P',
  19: 'HC',
  20: 'Bench',
  21: 'IR',
  22: 'Unknown?', // TODO: Figure out what this is
  23: 'RB/WR/TE',
  24: 'Unknown?' // TODO: Figure out what this is
};

/**
 * Maps `proTeam` numerical enum to readable team names.
 *
 * @type {object}
 */
const nflTeamIdToNFLTeam = {
  [-1]: 'Bye',
  1: 'Atlanta Falcons',
  2: 'Buffalo Bills',
  3: 'Chicago Bears',
  4: 'Cincinnati Bengals',
  5: 'Cleveland Browns',
  6: 'Dallas Cowboys',
  7: 'Denver Broncos',
  8: 'Detroit Lions',
  9: 'Green Bay Packers',
  10: 'Tennessee Titans',
  11: 'Indianapolis Colts',
  12: 'Kansas City Chiefs',
  13: 'Oakland Raiders',
  14: 'Los Angeles Rams',
  15: 'Miami Dolphins',
  16: 'Minnesota Vikings',
  17: 'New England Patriots',
  18: 'New Orleans Saints',
  19: 'New York Giants',
  20: 'New York Jets',
  21: 'Philadelphia Eagles',
  22: 'Arizona Cardinals',
  23: 'Pittsburgh Steelers',
  24: 'Los Angeles Chargers',
  25: 'San Francisco 49ers',
  26: 'Seattle Seahawks',
  27: 'Tampa Bay Buccaneers',
  28: 'Washington Redskins',
  29: 'Carolina Panthers',
  30: 'Jacksonville Jaguars',
  33: 'Baltimore Ravens',
  34: 'Houston Texans'
};

/**
 * Maps `proTeam` numerical enum to readable team name abbreviations.
 *
 * @type {object}
 */
const nflTeamIdToNFLTeamAbbreviation = {
  [-1]: 'Bye',
  1: 'ATL',
  2: 'BUF',
  3: 'CHI',
  4: 'CIN',
  5: 'CLE',
  6: 'DAL',
  7: 'DEN',
  8: 'DET',
  9: 'GB',
  10: 'TEN',
  11: 'IND',
  12: 'KC',
  13: 'OAK',
  14: 'LAR',
  15: 'MIA',
  16: 'MIN',
  17: 'NE',
  18: 'NO',
  19: 'NYG',
  20: 'NYJ',
  21: 'PHI',
  22: 'ARI',
  23: 'PIT',
  24: 'LAC',
  25: 'SF',
  26: 'SEA',
  27: 'TB',
  28: 'WSH',
  29: 'CAR',
  30: 'JAX',
  33: 'BAL',
  34: 'HOU'
};

/**
 * All possible ways a player may be acquired onto a fantasy football team roster.
 *
 * @typedef {
 *   'FREEAGENCY' |
 *   'WAIVERS_TRADITIONAL' |
 *   'WAIVERS_CONTINUOUS'
 * } ACQUISITION_TYPES
 */

/**
 * All possible draft types for a league.
 *
 * @typedef {
 *   'OFFLINE' |
 *   'SNAKE' |
 *   'AUTOPICK' |
 *   'SNAIL' |
 *   'AUCTION'
 * } DRAFT_TYPE
 */

/**
 * All possible injury statuses for a Player returned by the API
 *
 * @typedef {
 *   'ACTIVE' |
 *   'BEREAVEMENT' |
 *   'DAY_TO_DAY' |
 *   'DOUBTFUL' |
 *   'FIFTEEN_DAY_DL' |
 *   'INJURY_RESERVE' |
 *   'OUT' |
 *   'PATERNITY' |
 *   'PROBABLE' |
 *   'QUESTIONABLE' |
 *   'SEVEN_DAY_DL' |
 *   'SIXTY_DAY_DL' |
 *   'SUSPENSION' |
 *   'TEN_DAY_DL'
 * } INJURY_STATUSES
 */

/**
 * The different types in which keeper order can be determined.
 *
 * @typedef {
 * 'TRADITIONAL' |
 * 'END_OF_DRAFT' |
 * 'SELECTED_ROUND'
 * } KEEPER_ORDER_TYPES
 */

/**
 * All possible times at which a starting lineup may be locked and no further changes may be made.
 *
 * @typedef {
 *   'INDIVIDUAL_GAME' |
 *   'FIRSTGAME_SCORINGPERIOD'
 * } LINEUP_LOCK_TIMES
 */

/**
 * All possible types of player moves.
 *
 * @typedef {
 *   'WIN' |
 *   'LOSS' |
 *   'TIE' |
 *   'NONE'
 * } MATCHUP_RESULTS
 */

/**
 * All possible tiebreakers for a matchup.
 *
 * @typedef {
 *   'NONE' |
 *   'HOME_TEAM_WINS' |
 *   'SLOT_POINTS' |
 *   'STAT_POINTS' |
 *   'FIRSTGAME_SCORINGPERIOD'
 * } MATCHUP_TIEBREAKERS
 */

/**
 * The status of a player for fantasy rostering purposes.
 *
 * @typedef {
 * 'FREEAGENT' |
 * 'ONTEAM' |
 * 'WAIVERS'
 * } PLAYER_AVAILABILITY_STATUSES
 */

/**
 * All possible types of player moves.
 *
 * @typedef {
 *   'NONE' |
 *   'LINEUP' |
 *   'ADD' |
 *   'DROP' |
 *   'DRAFT' |
 *   'UNDRAFT' |
 *   'DRAFT_TRADE'
 * } PLAYER_MOVE_TYPES
 */

/**
 * The rule by which playoff seeds are determined.
 *
 * @typedef {
 * 'UNKNOWN' |
 * 'H2H_RECORD' |
 * 'TOTAL_POINTS_SCORED' |
 * 'INTRA_DIVISION_RECORD' |
 * 'TOTAL_POINTS_AGAINST' |
 * 'RAW_STAT'
 * } PLAYOFF_SEEDING_RULES
 */

/**
 * All possible types of transactions.
 *
 * @typedef {
 *   'TRADE_DECLINE' |
 *   'TRADE_PROPOSAL' |
 *   'TRADE_ACCEPT' |
 *   'TRADE_UPHOLD' |
 *   'TRADE_VETO' |
 *   'WAIVER_ERROR' |
 *   'TRADE_ERROR' |
 *   'WAIVER' |
 *   'ROSTER' |
 *   'FUTURE_ROSTER' |
 *   'RETRO_ROSTER' |
 *   'FREEAGENT' |
 *   'DRAFT'
 * } TRANSACTION_TYPES
 */

/**
 * Which team won a matchup.
 *
 * @typedef {
 *   'HOME' |
 *   'AWAY' |
 *   'TIE' |
 *   'UNDECIDED'
 * } WINNING_TEAM
 */

export {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap
};
