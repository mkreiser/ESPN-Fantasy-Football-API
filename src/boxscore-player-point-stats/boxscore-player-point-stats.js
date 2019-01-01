import ApiModel from '../api-model/api-model.js';

/**
 * Represents the points scored for each stat for a player on a team in a boxscore. This is an
 * organizational class and not a class found on the API responses. Therefore, there is no id for
 * this class.
 *
 * The stat map is not comprehensive, but should cover normal standard and PPR scoring rules. The
 * largest missing piece is IDP scoring.
 * @extends ApiModel
 */
class BoxscorePlayerPointStats extends ApiModel {
  static displayName = 'BoxscorePlayerPointStats';

  /**
   * @typedef {object} BoxscorePlayerStatsModel
   *
   * Defensive yards allowed and points allowed are inclusive and only scored when their condition
   * is met. For example, if a DST allowed 360 yards, then `defensive350To399YardsAllowed` will be
   * scored and the other defensive yard stats will not be populated.
   *
   * @property {number} passingYards Points scored for passing yards (typically a QB stat).
   * @property {number} passingTouchdowns Points scored for passing TDs (typically a QB stat).
   * @property {number} passing2PtConversion Points scored for passing 2 point conversion (typically
   *                                         a QB stat).
   * @property {number} passingInterceptions Points scored for a passing attempt resulting in an
   *                                         interception (typically negative)
   *                                         (typically a QB stat).
   *
   * @property {number} rushingYards Points scored for rushing yards.
   * @property {number} rushingTouchdowns Points scored for rushing touchdowns.
   * @property {number} rushing2PtConversions Points scored for rushing 2 point conversions.
   *
   * @property {number} receivingYards Points scored for receiving yards.
   * @property {number} receivingTouchdowns Points scored for receiving touchdowns.
   * @property {number} receiving2PtConversions Points scored for receiving 2 point conversions.
   * @property {number} receivingReceptions Points scored for receptions (only populated in PPR
   *                                        leagues).
   *
   * @property {number} lostFumbles Points scored for losing a fumble (typically negative) (applies
   *                                to all offensive players).
   *
   * @property {number} madeFieldGoalsFrom50Plus Points scored for making field goals from 50 yards
   *                                             or further.
   * @property {number} madeFieldGoalsFrom40To49 Points scored for making field goals from 40 yards
   *                                             to 49 yards.
   * @property {number} madeFieldGoalsFromUnder40 Points scored for making field goals from under 40
   *                                              yards.
   * @property {number} missedFieldGoals Points scored for missing field goals (typically negative
   *                                     or zero).
   * @property {number} madeExtraPoints Points scored for making extra points.
   * @property {number} missedExtraPoints Points scored for missing extra points (typically
   *                                      negative).
   *
   * @property {number} defensive0PointsAllowed Points scored for when a DST allowed 0 points in
   *                                            their NFL game.
   * @property {number} defensive1To6PointsAllowed Points scored for when a DST allowed 1-6 points
   *                                               in their NFL game.
   * @property {number} defensive7To13PointsAllowed Points scored for when a DST allowed 7-13 points
   *                                                in their NFL game.
   * @property {number} defensive14To17PointsAllowed Points scored for when a DST allowed 14-17
   *                                                 points in their NFL game.
   *
   * @property {number} defensiveBlockedKickForTouchdowns Points scored for when a DST blocks any
   *                                                      kick and returns it for a touchdown.
   * @property {number} defensiveInterceptions Points scored for when a DST records an interception.
   * @property {number} defensiveFumbles Points scored for when a DST recovers a fumble.
   * @property {number} defensiveBlockedKicks Points scored for when a DST blocks any kick.
   * @property {number} defensiveSafeties Points scored for when a DST records a safety.
   * @property {number} defensiveSacks Points scored for when a DST records a sack.
   *
   * @property {number} kickoffReturnTouchdown Points scored for when a DST returns a kickoff for a
   *                                           touchdown.
   * @property {number} puntReturnTouchdown Points scored for when a DST returns a punt for a
   *                                        touchdown.
   * @property {number} fumbleReturnTouchdown Points scored for when a DST returns a fumble for a
   *                                          touchdown.
   * @property {number} interceptionReturnTouchdown Points scored for when a DST returns an
   *                                                interception for a touchdown.
   *
   * @property {number} defensive28To34PointsAllowed Points scored for when a DST allowed 28-34 in
   *                                                 their NFL game.
   * @property {number} defensive35To45PointsAllowed Points scored for when a DST allowed 35-45 in
   *                                                 their NFL game.
   *
   * @property {number} defensive100To199YardsAllowed Points scored for when a DST allows 100-199
   *                                                  yards in their NFL game.
   * @property {number} defensive200To299YardsAllowed Points scored for when a DST allows 200-299
   *                                                  yards in their NFL game.
   * @property {number} defensive350To399YardsAllowed Points scored for when a DST allows 350-399
   *                                                  yards in their NFL game.
   * @property {number} defensive400To449YardsAllowed Points scored for when a DST allows 400-449
   *                                                  yards in their NFL game.
   * @property {number} defensive450To499YardsAllowed Points scored for when a DST allows 450-499
   *                                                  yards in their NFL game.
   * @property {number} defensive500To549YardsAllowed Points scored for when a DST allows 500-549
   *                                                  yards in their NFL game.
   * @property {number} defensiveOver550YardsAllowed Points scored for when a DST allows 550 or more
   *                                                 yards in their NFL game.
   */

  /**
    * @type {BoxscorePlayerStatsModel}
    */
  static responseMap = {
    passingYards: '3',
    passingTouchdowns: '4',
    passing2PtConversions: '19',
    passingInterceptions: '20',

    rushingYards: '24',
    rushingTouchdowns: '25',
    rushing2PtConversions: '26',

    receivingYards: '42',
    receivingTouchdowns: '43',
    receiving2PtConversions: '44',
    receivingReceptions: '53',

    lostFumbles: '72',

    madeFieldGoalsFrom50Plus: '74',
    madeFieldGoalsFrom40To49: '77',
    madeFieldGoalsFromUnder40: '80',
    missedFieldGoals: '85',
    madeExtraPoints: '86',
    missedExtraPoints: '88',

    defensive0PointsAllowed: '89',
    defensive1To6PointsAllowed: '90',
    defensive7To13PointsAllowed: '91',
    defensive14To17PointsAllowed: '92',

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

    defensive28To34PointsAllowed: '123',
    defensive35To45PointsAllowed: '124',

    defensive100To199YardsAllowed: '129',
    defensive200To299YardsAllowed: '130',
    defensive350To399YardsAllowed: '132',
    defensive400To449YardsAllowed: '133',
    defensive450To499YardsAllowed: '134',
    defensive500To549YardsAllowed: '135',
    defensiveOver550YardsAllowed: '136'
  };

  /**
   * @throws Always, as BoxscorePlayerPointStats is an organizational class created by this project
   *         and does not exist on the ESPN API.
   */
  static read() {
    throw new Error(`${this.displayName}: read: Cannot call read.`);
  }
}

export default BoxscorePlayerPointStats;
