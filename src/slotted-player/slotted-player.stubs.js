import Player from '../player/player.js';

/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  isKeeper: false,
  isLocked: true,
  player: new Player({
    eligiblePositions: [
      'QB',
      'Bench'
    ],
    firstName: 'Tom',
    isActive: true,
    isIREligible: false,
    jerseyNumber: '12',
    lastName: 'Brady',
    percentOwned: 99.80315,
    percentOwnedChange: 0.20315,
    percentStarted: 81.69291,
    playerId: 2330
  }),
  position: 'QB'
};

const serverResponse = {
  playerPotentialTransactions: {
    Drop: '3_2330_9_0_-1_1002'
  },
  lockStatus: 4,
  opponentProTeamId: -1,
  isQueuedWaiverLocked: false,
  isTradeLocked: false,
  watchList: false,
  slotCategoryId: 0,
  isKeeper: false,
  player: {
    lastName: 'Brady',
    percentChange: 0.20315,
    lastVideoDate: '2017-12-15T07:56:35.553Z',
    percentOwned: 99.80315,
    lastNewsDate: '2018-02-05T05:29:17.000Z',
    percentStarted: 81.69291,
    universeId: 1,
    isActive: true,
    droppable: true,
    firstName: 'Tom',
    defaultPositionId: 1,
    healthStatus: 0,
    jersey: '12',
    draftRank: 24.4,
    eligibleSlotCategoryIds: [
      0,
      20
    ],
    proTeamId: 17,
    isIREligible: false,
    tickerId: 1870523,
    sportsId: 2330,
    value: -1,
    gameStarterStatus: -2147483648,
    playerId: 2330
  }
};

export { localObject, serverResponse };
