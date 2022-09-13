import _ from 'lodash';

import BaseObject from '../base-classes/base-object/base-object';

class Season extends BaseObject {
  static displayName = 'Season';

  static responseMap = {
    year: 'id',
    currentScoringPeriod: {
      key: 'currentScoringPeriod',
      manualParse: (responseData) => (
        _.get(responseData, 'id')
      )
    }
  };
}

export default Season;
