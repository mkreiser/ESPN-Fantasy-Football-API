import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

/**
 * Represents statistical values for a player's fantasy performance. The values may be real
 * statistical values (yards, attempts, etc) or fantasy point values.
 *
 * The stat map is not comprehensive, but should cover normal standard and PPR scoring rules. The
 * largest missing piece is IDP scoring.
 *
 * @extends {BaseObject}
 */
class PlayerStats extends BaseObject {
  constructor(options = {}) {
    super(options);

    this.usesPoints = options.usesPoints;
  }

  static displayName = 'PlayerStats';

  /**
   * @typedef {object} PlayerStats~PlayerStatsMap
   *
   * Defensive yards allowed and points allowed are inclusive and only scored when their condition
   * is met. For example, if a DST allowed 360 yards, then `defensive350To399YardsAllowed` will be
   * scored (value is 1 when statistical) and the other defensive yard stats will not be populated.
   *
   * @property {number} passingYards Total passing yards (typically a QB stat).
   * @property {number} passingTouchdowns Total passing TDs (typically a QB stat).
   * @property {number} passing2PtConversion Total passing 2 point conversion (typically a QB stat).
   * @property {number} passingInterceptions Total passing attempts resulting in an interception
   *                                         (typically negative points) (typically a QB stat).
   *
   * @property {number} rushingYards Total rushing yards.
   * @property {number} rushingTouchdowns Total rushing touchdowns.
   * @property {number} rushing2PtConversions Total rushing 2 point conversions.
   *
   * @property {number} receivingYards Total receiving yards.
   * @property {number} receivingTouchdowns Total receiving touchdowns.
   * @property {number} receiving2PtConversions Total receiving 2 point conversions.
   * @property {number} receivingReceptions Total receptions (only populated in PPR
   *                                        leagues).
   *
   * @property {number} lostFumbles Total fumbles lost (typically negative points) (applies to all
   *                                offensive players).
   *
   * @property {number} madeFieldGoalsFrom50Plus Total made field goals from 50 yards or further.
   * @property {number} madeFieldGoalsFrom40To49 Total made field goals from 40 yards to 49 yards.
   * @property {number} madeFieldGoalsFromUnder40 Total made field goals from under 40 yards.
   * @property {number} missedFieldGoals Total missed field goals (typically negative or zero
   *                                     points).
   *
   * @property {number} madeExtraPoints Made extra point attempts.
   * @property {number} missedExtraPoints Missed extra point attempts (typically negative points).
   *
   * @property {number} defensive0PointsAllowed When a DST allowed 0 points in their NFL game.
   * @property {number} defensive1To6PointsAllowed When a DST allowed 1-6 points in their NFL game.
   * @property {number} defensive7To13PointsAllowed When a DST allowed 7-13 points in their NFL
   *                                                game.
   * @property {number} defensive14To17PointsAllowed When a DST allowed 14-17 points in their NFL
   *                                                 game.
   * @property {number} defensive28To34PointsAllowed When a DST allowed 28-34 points in their NFL
   *                                                 game.
   * @property {number} defensive35To45PointsAllowed When a DST allowed 35-45 points in their NFL
   *                                                 game.
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
    * @type {PlayerStats~PlayerStatsMap}
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
}

export const parsePlayerStats = ({
  responseData, constructorParams, usesPoints, seasonId, statKey, statSourceId, statSplitTypeId
}) => {
  const filters = { statSourceId, statSplitTypeId };

  if (seasonId) {
    filters.seasonId = seasonId;
  }

  const statData = _.find(responseData.player.stats, filters);
  const params = _.assign({}, constructorParams, { usesPoints });
  return PlayerStats.buildFromServer(_.get(statData, statKey), params);
};

export default PlayerStats;
