import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';
import { scoringItemToId } from '../constants';

/* global ScoringItems */

/**
 * Represents statistical values for a player's fantasy performance. The values may be real
 * statistical values (yards, attempts, etc) or fantasy point values.
 *
 * The stat map is not comprehensive, but should cover normal standard and PPR scoring rules. The
 * largest missing piece is IDP scoring.
 *
 * @augments {BaseObject}
 */
class PlayerStats extends BaseObject {
  constructor(options = {}) {
    super(options);

    this.usesPoints = options.usesPoints;
  }

  static displayName = 'PlayerStats';

  /**
   * @type {ScoringItems}
   */
  static responseMap = {
    ...scoringItemToId
  };
}

export const parsePlayerStats = ({
  responseData, constructorParams, usesPoints, seasonId, statKey, statSourceId, statSplitTypeId
}) => {
  const filters = { statSourceId, statSplitTypeId };

  if (seasonId) {
    filters.seasonId = seasonId;
  }

  const statData = _.find(responseData, filters);
  const params = _.assign({}, constructorParams, { usesPoints });
  return PlayerStats.buildFromServer(_.get(statData, statKey), params);
};

export default PlayerStats;
