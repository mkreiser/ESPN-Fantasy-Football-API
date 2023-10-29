import _ from 'lodash';

/**
 * Maps `slotCategoryId`'s numerical enum to readable positions.
 * @type {object}
 */
export const slotCategoryIdToPositionMap = {
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
  22: 'INVALID_CODE', // https://github.com/cwendt94/espn-api/blob/master/espn_api/football/constant.py#L24
  23: 'RB/WR/TE',
  24: 'ER',
  25: 'Rookie'
};

/**
 * Maps `proTeam` numerical enum to readable team names.
 * @type {object}
 */
export const nflTeamIdToNFLTeam = {
  [-1]: 'Bye',
  1 : 'Atlanta Falcons',
  2 : 'Buffalo Bills',
  3 : 'Chicago Bears',
  4 : 'Cincinnati Bengals',
  5 : 'Cleveland Browns',
  6 : 'Dallas Cowboys',
  7 : 'Denver Broncos',
  8 : 'Detroit Lions',
  9 : 'Green Bay Packers',
  10: 'Tennessee Titans',
  11: 'Indianapolis Colts',
  12: 'Kansas City Chiefs',
  13: 'Las Vegas Raiders',
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
  28: 'Washington Commanders',
  29: 'Carolina Panthers',
  30: 'Jacksonville Jaguars',
  33: 'Baltimore Ravens',
  34: 'Houston Texans'
};

/**
 * Maps `proTeam` numerical enum to readable team name abbreviations.
 * @type {object}
 */
export const nflTeamIdToNFLTeamAbbreviation = {
  [-1]: 'Bye',
  1 : 'ATL',
  2 : 'BUF',
  3 : 'CHI',
  4 : 'CIN',
  5 : 'CLE',
  6 : 'DAL',
  7 : 'DEN',
  8 : 'DET',
  9 : 'GB',
  10: 'TEN',
  11: 'IND',
  12: 'KC',
  13: 'LV',
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
 * @typedef {object} ScoringItems
 *
 * Defensive yards allowed and points allowed are inclusive and only scored when their condition
 * is met. For example, if a DST allowed 360 yards, then `defensive350To399YardsAllowed` will be
 * scored (value is 1 when statistical) and the other defensive yard stats will not be populated.
 *
 * @property {number} passingAttempts Total passing attempts (typically a QB stat).
 * @property {number} passingCompletions Total passing completions (typically a QB stat).
 * @property {number} passingIncompletions Total passing incompletions (typically a QB stat).
 * @property {number} passingYards Total passing yards (typically a QB stat).
 * @property {number} passingTouchdowns Total passing TDs (typically a QB stat).
 * @property {number} passingTouchdowns40Plus Total number of passing touchdowns where the passing
 *                                            touchdown play was 40 yards or more (typically a QB
 *                                            stat).
 * @property {number} passingTouchdowns50Plus Total number of passing touchdowns where the passing
 *                                            touchdown play was 50 yards or more (typically a QB
 *                                            stat).
 * @property {number} passing2PtConversion Total passing 2 point conversion (typically a QB stat).
 * @property {number} passingInterceptions Total passing attempts resulting in an interception
 *                                         (typically negative points) (typically a QB stat).
 * @property {number} passingCompletionPercentage Passing completions divided by passing attempts.
 *                                                This value is 0-100 (typically a QB stat).
 *
 * @property {number} rushingAttempts Total rushing attempts.
 * @property {number} rushingYards Total rushing yards.
 * @property {number} rushingTouchdowns Total rushing touchdowns.
 * @property {number} rushing2PtConversions Total rushing 2 point conversions.
 * @property {number} rushingTouchdowns40Plus Total number of rushing touchdowns where the rushing
 *                                            touchdown play was 40 yards or more.
 * @property {number} rushingTouchdowns50Plus Total number of rushing touchdowns where the rushing
 *                                            touchdown play was 50 yards or more.
 * @property {number} rushingYardsPerAttempt Rushing yards divided by rushing attempts.
 *
 * @property {number} receivingYards Total receiving yards.
 * @property {number} receivingTouchdowns Total receiving touchdowns.
 * @property {number} receiving2PtConversions Total receiving 2 point conversions.
 * @property {number} receivingTouchdowns40Plus Total number of receiving touchdowns where the
 *                                              receiving touchdown play was 40 yards or more.
 * @property {number} receivingTouchdowns50Plus Total number of receiving touchdowns where the
 *                                              receiving touchdown play was 50 yards or more.
 * @property {number} receivingReceptions Total receptions (only populated in PPR
 *                                        leagues).
 * @property {number} receivingTargets Total times the player was targeted on a pass, regardless
 *                                     if the pass was completed.
 * @property {number} receivingYardsAfterCatch Total yards gained by the player after passes were
 *                                             caught.
 * @property {number} receivingYardsPerReception Total yards divided by receptions.
 *
 * @property {number} fumbles Total fumbles, regardless of whether the fumble was recovered by the
 *                            opposing team (i.e "lost") or not
 * @property {number} lostFumbles Total fumbles lost (typically negative points) (applies to all
 *                                offensive players).
 * @property {number} turnovers Total turnovers (typically fumbles and interceptions, possibly
 *                              safeties and downs as well?)
 *
 * @property {number} madeFieldGoalsFrom60Plus Total made field goals from 60 yards or further.
 * @property {number} madeFieldGoalsFrom50Plus Total made field goals from 50 yards or further.
 * @property {number} madeFieldGoalsFrom40To49 Total made field goals from 40 yards to 49 yards.
 * @property {number} madeFieldGoalsFromUnder40 Total made field goals from under 40 yards.
 * @property {number} attemptedFieldGoalsFrom60Plus Total attempted field goals from 60 yards or
 *                                                  further.
 * @property {number} attemptedFieldGoalsFrom50Plus Total attempted field goals from 50 yards or
 *                                                  further.
 * @property {number} attemptedFieldGoalsFrom40To49 Total attempted field goals from 40 yards to
 *                                                  49 yards.
 * @property {number} attemptedFieldGoalsFromUnder40 Total attempted field goals from under 40
 *                                                   yards.
 * @property {number} missedFieldGoalsFrom60Plus Total missed field goals from 60 yards or
 *                                               further (typically negative or zero points).
 * @property {number} missedFieldGoalsFrom50Plus Total missed field goals from 50 yards or
 *                                               further (typically negative or zero points).
 * @property {number} missedFieldGoalsFrom40To49 Total missed field goals from 40 yards to 49
 *                                               yards (typically negative or zero points).
 * @property {number} missedFieldGoalsFromUnder40 Total missed field goals from under 40 yards
 *                                                (typically negative or zero points).
 *
 * @property {number} madeFieldGoals Made field goal attempts (any distance).
 * @property {number} attemptedFieldGoals Total field goal attempts (any distance).
 * @property {number} missedFieldGoals Missed field goal attempts (any distance)
 *                                     (typically negative points).
 * @property {number} madeExtraPoints Made extra point attempts.
 * @property {number} attemptedExtraPoints Total extra point attempts.
 * @property {number} missedExtraPoints Missed extra point attempts (typically negative points).
 *
 * @property {number} defensiveBlockedKickForTouchdowns When a DST blocks any kick and returns it
 *                                                      for a touchdown.
 * @property {number} defensiveInterceptions When a DST records an interception.
 * @property {number} defensiveFumbles When a DST recovers a fumble.
 * @property {number} defensiveBlockedKicks When a DST blocks any kick.
 * @property {number} defensiveSafeties When a DST records a safety.
 * @property {number} defensiveSacks When a DST records a sack.
 *
 * @property {number} kickoffReturnTouchdown When a DST returns a kickoff for a touchdown.
 * @property {number} puntReturnTouchdown When a DST returns a punt for a touchdown.
 * @property {number} fumbleReturnTouchdown When a DST returns a fumble for a touchdown.
 * @property {number} interceptionReturnTouchdown When a DST returns an interception for a
 *                                                touchdown.
 *
 * @property {number} kickoffReturnYards Total yards on kickoff returns.
 * @property {number} puntReturnYards Total yards on punt returns.
 *
 * @property {number} defensiveForcedFumbles No description
 * @property {number} defensiveAssistedTackles No description
 * @property {number} defensiveSoloTackles No description
 * @property {number} defensiveTotalTackles No description
 *
 * @property {number} defensivePointsAllowed Total points allowed by the defense in the NFL game
 *                                           (real points allowed, not fantasy points).
 * @property {number} defensive0PointsAllowed When a DST allowed 0 points in their NFL game.
 * @property {number} defensive1To6PointsAllowed When a DST allowed 1-6 points in their NFL game.
 * @property {number} defensive7To13PointsAllowed When a DST allowed 7-13 points in their NFL
 *                                                game.
 * @property {number} defensive14To17PointsAllowed When a DST allowed 14-17 points in their NFL
 *                                                 game.
 * @property {number} defensive18To21PointsAllowed When a DST allows 18-21 points in their NFL
 *                                                 game.
 * @property {number} defensive22To27PointsAllowed When a DST allows 22-27 points in their NFL
 *                                                 game.
 * @property {number} defensive28To34PointsAllowed When a DST allows 28-34 points in their NFL
 *                                                 game.
 * @property {number} defensive35To45PointsAllowed When a DST allows 35-45 points in their NFL
 *                                                 game.
 * @property {number} defensiveOver45PointsAllowed When a DST allows more than 45 points in their
 *                                                 NFL game.
 *
 * @property {number} defensive100To199YardsAllowed When a DST allows 100-199 yards in their NFL
 *                                                  game.
 * @property {number} defensive200To299YardsAllowed When a DST allows 200-299 yards in their NFL
 *                                                  game.
 * @property {number} defensive350To399YardsAllowed When a DST allows 350-399 yards in their NFL
 *                                                  game.
 * @property {number} defensive400To449YardsAllowed When a DST allows 400-449 yards in their NFL
 *                                                  game.
 * @property {number} defensive450To499YardsAllowed When a DST allows 450-499 yards in their NFL
 *                                                  game.
 * @property {number} defensive500To549YardsAllowed When a DST allows 500-549 yards in their NFL
 *                                                  game.
 * @property {number} defensiveOver550YardsAllowed When a DST allows 550 or more yards in their
 *                                                 NFL game.
 */

/**
 * @type {ScoringItems}
 */
export const scoringItemToId = {
  passingAttempts: '0',
  passingCompletions: '1',
  passingIncompletions: '2',
  passingYards: '3',
  passingTouchdowns: '4',
  passingTouchdowns40Plus: '15',
  passingTouchdowns50Plus: '16',
  passing2PtConversions: '19',
  passingInterceptions: '20',
  passingCompletionPercentage: '21',

  rushingAttempts: '23',
  rushingYards: '24',
  rushingTouchdowns: '25',
  rushing2PtConversions: '26',
  rushingTouchdowns40Plus: '35',
  rushingTouchdowns50Plus: '36',
  rushingYardsPerAttempt: '39',

  receivingYards: '42',
  receivingTouchdowns: '43',
  receiving2PtConversions: '44',
  receivingTouchdowns40Plus: '45',
  receivingTouchdowns50Plus: '46',
  receivingReceptions: '53',
  receivingTargets: '58',
  receivingYardsAfterCatch: '59',
  receivingYardsPerReception: '60',

  fumbles: '68',
  lostFumbles: '72',
  turnovers: '73',

  madeFieldGoalsFrom60Plus: '201',
  attemptedFieldGoalsFrom60Plus: '202',
  missedFieldGoalsFrom60Plus: '203',
  madeFieldGoalsFrom50Plus: '74',
  attemptedFieldGoalsFrom50Plus: '75',
  missedFieldGoalsFrom50Plus: '76',
  madeFieldGoalsFrom40To49: '77',
  attemptedFieldGoalsFrom40To49: '78',
  missedFieldGoalsFrom40To49: '79',
  madeFieldGoalsFromUnder40: '80',
  attemptFieldGoalsFromUnder40: '81',
  missedFieldGoalsFromUnder40: '82',

  madeFieldGoals: '83',
  attemptedFieldGoals: '84',
  missedFieldGoals: '85',
  madeExtraPoints: '86',
  attemptedExtraPoints: '87',
  missedExtraPoints: '88',

  defensiveBlockedKickForTouchdowns: '93',
  defensiveInterceptions: '95',
  defensiveFumbles: '96',
  defensiveBlockedKicks: '97',
  defensiveSafeties: '98',
  defensiveSacks: '99',

  kickoffReturnTouchdown: '101',
  puntReturnTouchdown: '102',
  fumbleReturnTouchdown: '103',
  interceptionReturnTouchdown: '104',

  defensiveForcedFumbles: '106',
  defensiveAssistedTackles: '107',
  defensiveSoloTackles: '108',
  defensiveTotalTackles: '109',

  kickoffReturnYards: '114',
  puntReturnYards: '115',

  defensivePointsAllowed: '120',
  defensive0PointsAllowed: '89',
  defensive1To6PointsAllowed: '90',
  defensive7To13PointsAllowed: '91',
  defensive14To17PointsAllowed: '92',
  defensive18To21PointsAllowed: '121',
  defensive22To27PointsAllowed: '122',
  defensive28To34PointsAllowed: '123',
  defensive35To45PointsAllowed: '124',
  defensiveOver45PointsAllowed: '125',

  defensiveYardsAllowed: '127',
  defensiveLessThan100YardsAllowed: '128',
  defensive100To199YardsAllowed: '129',
  defensive200To299YardsAllowed: '130',
  defensive350To399YardsAllowed: '132',
  defensive400To449YardsAllowed: '133',
  defensive450To499YardsAllowed: '134',
  defensive500To549YardsAllowed: '135',
  defensiveOver550YardsAllowed: '136'
};

export const scoringIdToItem = _.reduce(scoringItemToId, (acc, value, key) => {
  acc[value] = key;
  return acc;
}, {});

/**
 * All possible ways a player may be acquired onto a fantasy football team roster.
 * @typedef {
 *   'FREEAGENCY' |
 *   'WAIVERS_TRADITIONAL' |
 *   'WAIVERS_CONTINUOUS'
 * } ACQUISITION_TYPES
 */

/**
 * All possible draft types for a league.
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
 * @typedef {
 * 'TRADITIONAL' |
 * 'END_OF_DRAFT' |
 * 'SELECTED_ROUND'
 * } KEEPER_ORDER_TYPES
 */

/**
 * All possible times at which a starting lineup may be locked and no further changes may be made.
 * @typedef {
 *   'INDIVIDUAL_GAME' |
 *   'FIRSTGAME_SCORINGPERIOD'
 * } LINEUP_LOCK_TIMES
 */

/**
 * All possible types of player moves.
 * @typedef {
 *   'WIN' |
 *   'LOSS' |
 *   'TIE' |
 *   'NONE'
 * } MATCHUP_RESULTS
 */

/**
 * All possible tiebreakers for a matchup.
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
 * @typedef {
 * 'FREEAGENT' |
 * 'ONTEAM' |
 * 'WAIVERS'
 * } PLAYER_AVAILABILITY_STATUSES
 */

/**
 * All possible types of player moves.
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
 * @typedef {
 *   'HOME' |
 *   'AWAY' |
 *   'TIE' |
 *   'UNDECIDED'
 * } WINNING_TEAM
 */
