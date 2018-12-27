/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  eligiblePositions: [
    'QB',
    'Bench'
  ],
  firstName: 'Aaron',
  isActive: true,
  isDroppable: undefined,
  isIREligible: false,
  jerseyNumber: '12',
  lastName: 'Rodgers',
  percentOwned: 99.11713,
  percentOwnedChange: 0.16773,
  percentStarted: 68.05881,
  playerId: 8439
};

const serverResponse = {
  lastName: 'Rodgers',
  percentChange: 0.16773,
  lastVideoDate: '2018-01-17T01:06:49.053Z',
  percentOwned: 99.11713,
  lastNewsDate: '2018-12-23T22:12:51.000Z',
  percentStarted: 68.05881,
  universeId: 2,
  isActive: true,
  droppable: true,
  firstName: 'Aaron',
  defaultPositionId: 1,
  healthStatus: 0,
  jersey: '12',
  draftRank: 22.2,
  eligibleSlotCategoryIds: [
    0,
    20
  ],
  proTeamId: 9,
  isIREligible: false,
  tickerId: 2129320,
  sportsId: 8439,
  value: -1,
  gameStarterStatus: -2147483648,
  playerId: 8439
};

export { localObject, serverResponse };
