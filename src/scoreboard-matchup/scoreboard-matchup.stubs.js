import Team from '../team/team.js';

/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  awayTeam: new Team({
    abbreviation: 'GOAT',
    awayLosses: 1,
    awayTies: 0,
    awayWinningPercentage: 0,
    awayWins: 5,
    division: {
      divisionId: 0,
      divisionName: 'Division 1',
      size: 4
    },
    divisionLosses: 2,
    divisionStanding: undefined,
    divisionTies: 0,
    divisionWinningPercentage: 0.66667,
    divisionWins: 4,
    firstName: 'The Boston',
    homeLosses: 3,
    homeTies: 0,
    homeWinningPercentage: 0,
    homeWins: 4,
    lastName: 'TE Party',
    leagueId: undefined,
    leagueStanding: undefined,
    logoURL: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg',
    losses: 4,
    pointsAgainst: 1131.4,
    pointsFor: 1305.78,
    seasonId: undefined,
    streakLength: 1,
    streakType: 'W',
    teamId: 1,
    ties: 0,
    waiverRank: 6,
    winningPercentage: 0.69231,
    wins: 9
  }),
  awayTeamScore: 103.84,
  homeTeam: new Team({
    abbreviation: 'GRON',
    awayLosses: 2,
    awayTies: 0,
    awayWinningPercentage: 0,
    awayWins: 4,
    division: {
      divisionId: 1,
      divisionName: 'Division 2',
      size: 4
    },
    divisionLosses: 4,
    divisionStanding: undefined,
    divisionTies: 0,
    divisionWinningPercentage: 0.33333,
    divisionWins: 2,
    firstName: 'Prestige',
    homeLosses: 6,
    homeTies: 0,
    homeWinningPercentage: 0,
    homeWins: 1,
    lastName: 'Worldwide',
    leagueId: undefined,
    leagueStanding: undefined,
    logoURL: 'http://3219a2.medialib.glogster.com/media/f8/f81cfe4e18dba8da78f1e654f311d7852eedf937770ef0670f656835288409ca/prestige-png.png',
    losses: 8,
    pointsAgainst: 1232.94,
    pointsFor: 1062.82,
    seasonId: undefined,
    streakLength: 1,
    streakType: 'L',
    teamId: 2,
    ties: 0,
    waiverRank: 5,
    winningPercentage: 0.38462,
    wins: 5
  }),
  homeTeamScore: 56.64,
  isByeWeek: false,
  winner: new Team({
    abbreviation: 'GOAT',
    awayLosses: 1,
    awayTies: 0,
    awayWinningPercentage: 0,
    awayWins: 5,
    division: {
      divisionId: 0,
      divisionName: 'Division 1',
      size: 4
    },
    divisionLosses: 2,
    divisionStanding: undefined,
    divisionTies: 0,
    divisionWinningPercentage: 0.66667,
    divisionWins: 4,
    firstName: 'The Boston',
    homeLosses: 3,
    homeTies: 0,
    homeWinningPercentage: 0,
    homeWins: 4,
    lastName: 'TE Party',
    leagueId: undefined,
    leagueStanding: undefined,
    logoURL: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg',
    losses: 4,
    pointsAgainst: 1131.4,
    pointsFor: 1305.78,
    seasonId: undefined,
    streakLength: 1,
    streakType: 'W',
    teamId: 1,
    ties: 0,
    waiverRank: 6,
    winningPercentage: 0.69231,
    wins: 9
  })
};

const serverResponse = {
  winner: 'away',
  teams: [
    {
      score: 56.64,
      teamId: 2,
      team: {
        division: {
          size: 4,
          divisionName: 'Division 2',
          divisionId: 1
        },
        teamAbbrev: 'GRON',
        waiverRank: 5,
        teamId: 2,
        record: {
          pointsAgainst: 1232.94,
          divisionTies: 0,
          streakLength: 1,
          homeTies: 0,
          overallWins: 5,
          pointsFor: 1062.82,
          divisionPercentage: 0.33333,
          homeLosses: 6,
          awayWins: 4,
          overallPercentage: 0.38462,
          overallLosses: 8,
          divisionLosses: 4,
          divisionWins: 2,
          homeWins: 1,
          awayPercentage: 0,
          streakType: 2,
          awayLosses: 2,
          overallTies: 0,
          divisionStanding: 4,
          overallStanding: 8,
          homePercentage: 0,
          awayTies: 0
        },
        teamLocation: 'Prestige',
        teamNickname: 'Worldwide',
        logoType: 'customValid',
        logoUrl: 'http://3219a2.medialib.glogster.com/media/f8/f81cfe4e18dba8da78f1e654f311d7852eedf937770ef0670f656835288409ca/prestige-png.png'
      },
      playerIDs: [
        17556,
        16944,
        10456,
        14924,
        10475,
        16800,
        11237,
        17822,
        60021,
        17619,
        12731,
        5536,
        60029,
        8479,
        15920,
        9592
      ],
      home: true
    },
    {
      score: 103.84,
      teamId: 1,
      team: {
        division: {
          size: 4,
          divisionName: 'Division 1',
          divisionId: 0
        },
        teamAbbrev: 'GOAT',
        waiverRank: 6,
        teamId: 1,
        record: {
          pointsAgainst: 1131.4,
          divisionTies: 0,
          streakLength: 1,
          homeTies: 0,
          overallWins: 9,
          pointsFor: 1305.78,
          divisionPercentage: 0.66667,
          homeLosses: 3,
          awayWins: 5,
          overallPercentage: 0.69231,
          overallLosses: 4,
          divisionLosses: 2,
          divisionWins: 4,
          homeWins: 4,
          awayPercentage: 0,
          streakType: 1,
          awayLosses: 1,
          overallTies: 0,
          divisionStanding: 1,
          overallStanding: 1,
          homePercentage: 0,
          awayTies: 0
        },
        teamLocation: 'The Boston',
        teamNickname: 'TE Party',
        logoType: 'customValid',
        logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
      },
      playerIDs: [
        12514,
        17919,
        13229,
        15795,
        12563,
        15818,
        13981,
        14885,
        17907,
        17593,
        17827,
        18104,
        60008,
        18314,
        15705,
        60033
      ],
      home: false
    }
  ],
  bye: false
};

export { localObject, serverResponse };
