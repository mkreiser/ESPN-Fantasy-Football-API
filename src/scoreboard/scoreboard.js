import ApiModel from '../api-model/api-model.js';
import ScoreboardMatchup from '../scoreboard-matchup/scoreboard-matchup.js';

/**
 * Represents the scoreboard of a League for a given matchup period or a given scoring period. From
 * here, the score and winner of each matchup can be given.
 * @extends ApiModel
 */
class Scoreboard extends ApiModel {
  constructor(options = {}) {
    super(options);

    /**
     * Id of the League to which the scoreboard belongs. Required to make reads on the Scoreboard
     * instance.
     * @type {number}
     */
    this.leagueId = options.leagueId;

    /**
     * Id of the season (i.e. the year) to which the scoreboard belongs. Required to make reads on
     * the Scoreboard instance.
     * @type {number}
     */
    this.seasonId = options.seasonId;

    /**
     * Id of the matchup period to which the scoreboard refers to. This or scoringPeriodId must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.matchupPeriodId = options.matchupPeriodId;

    /**
     * Id of the scoring period to which the scoreboard refers to. This or matchupPeriodId must be
     * defined to make valid read requests.
     * @type {number}
     */
    this.scoringPeriodId = options.scoringPeriodId;
  }

  static displayName = 'Scoreboard';

  static route = 'scoreboard';

  /**
   * @typedef {object} ScoreboardModel
   * @property {number} matchupPeriodId The id of the match-up the scoreboard represents.
   * @property {number} scoringPeriodId The id of the scoring period the scoreboard represents.
   *
   * @property {string} dateOfFirstNFLGameInScoringPeriod A UTC timestamp of when the first NFL game
   *                                                      in the scoring period begins.
   * @property {boolean} nflGamesInProgress Whether or not there are any NFL games being played.
   */

  /**
    * @type {ScoreboardModel}
    */
  static responseMap = {
    matchupPeriodId: 'scoreboard.matchupPeriodId',
    scoringPeriodId: 'scoreboard.scoringPeriodId',

    dateOfFirstNFLGameInScoringPeriod: 'scoreboard.dateFirstProGameOfScoringPeriod',
    nflGamesInProgress: 'scoreboard.proGamesInProgress',

    matchups: {
      key: 'scoreboard.matchups',
      ApiModel: ScoreboardMatchup,
      isArray: true
    }
  }
}

export default Scoreboard;
