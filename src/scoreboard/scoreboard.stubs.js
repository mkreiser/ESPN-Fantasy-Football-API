/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  dateOfFirstNFLGameInScoringPeriod: '2017-11-10T01:25:00.000Z',
  matchupPeriodId: 10,
  nflGamesInProgress: false,
  scoringPeriodId: 10
};

const serverResponse = {
  metadata: {
    dateModifiedUser: '2018-12-25T10:53:04.330Z',
    serverDate: '2018-12-25T20:33:45.379Z',
    defaults: {},
    seasonId: '2017',
    leagueId: '336358',
    dateModifiedLeague: '2018-04-13T08:33:20.250Z',
    status: 'offseason'
  },
  scoreboard: {
    matchups: [
      {
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
      },
      {
        winner: 'away',
        teams: [
          {
            score: 99.76,
            teamId: 8,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 2',
                divisionId: 1
              },
              teamAbbrev: 'BOIS',
              waiverRank: 1,
              teamId: 8,
              record: {
                pointsAgainst: 1240.04,
                divisionTies: 0,
                streakLength: 2,
                homeTies: 0,
                overallWins: 5,
                pointsFor: 1328.1,
                divisionPercentage: 0.33333,
                homeLosses: 5,
                awayWins: 4,
                overallPercentage: 0.38462,
                overallLosses: 8,
                divisionLosses: 4,
                divisionWins: 2,
                homeWins: 1,
                awayPercentage: 0,
                streakType: 1,
                awayLosses: 3,
                overallTies: 0,
                divisionStanding: 3,
                overallStanding: 6,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: 'Team',
              teamNickname: 'ASS',
              logoType: 'customValid',
              logoUrl: 'http://sportsdata-corpsite-wordpress.s3.amazonaws.com/wp-content/uploads/2014/03/Ben-Tate-01.jpg'
            },
            playerIDs: [
              15825,
              17834,
              13215,
              16731,
              16777,
              16790,
              13232,
              10452,
              17610,
              11283,
              60026,
              14993,
              8416,
              18187,
              17933,
              16504
            ],
            home: true
          },
          {
            score: 109.8,
            teamId: 5,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 2',
                divisionId: 1
              },
              teamAbbrev: 'fuck',
              waiverRank: 4,
              teamId: 5,
              record: {
                pointsAgainst: 1278.42,
                divisionTies: 0,
                streakLength: 2,
                homeTies: 0,
                overallWins: 6,
                pointsFor: 1233.26,
                divisionPercentage: 0.5,
                homeLosses: 5,
                awayWins: 4,
                overallPercentage: 0.46154,
                overallLosses: 7,
                divisionLosses: 3,
                divisionWins: 3,
                homeWins: 2,
                awayPercentage: 0,
                streakType: 2,
                awayLosses: 2,
                overallTies: 0,
                divisionStanding: 2,
                overallStanding: 5,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: 'fuck fantasy ',
              teamNickname: 'football',
              logoType: 'customValid',
              logoUrl: 'https://i.ytimg.com/vi/5LlQNty_C8s/hqdefault.jpg'
            },
            playerIDs: [
              16737,
              14221,
              18193,
              5528,
              18225,
              17795,
              15009,
              14198,
              17580,
              18306,
              60014,
              11122,
              9761,
              17794,
              14163,
              17781
            ],
            home: false
          }
        ],
        bye: false
      },
      {
        winner: 'home',
        teams: [
          {
            score: 95.66,
            teamId: 4,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 1',
                divisionId: 0
              },
              teamAbbrev: 'REES',
              waiverRank: 7,
              teamId: 4,
              record: {
                pointsAgainst: 1290.12,
                divisionTies: 0,
                streakLength: 1,
                homeTies: 0,
                overallWins: 7,
                pointsFor: 1297.26,
                divisionPercentage: 0.66667,
                homeLosses: 4,
                awayWins: 5,
                overallPercentage: 0.53846,
                overallLosses: 6,
                divisionLosses: 2,
                divisionWins: 4,
                homeWins: 2,
                awayPercentage: 0,
                streakType: 1,
                awayLosses: 2,
                overallTies: 0,
                divisionStanding: 3,
                overallStanding: 4,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: 'Feed',
              teamNickname: 'Zeeeke ',
              logoType: 'none',
              logoUrl: ''
            },
            playerIDs: [
              13934,
              18218,
              17797,
              13216,
              2580,
              16730,
              13994,
              4527,
              17784,
              16782,
              11923,
              18097,
              60023,
              15880,
              18078,
              17739
            ],
            home: true
          },
          {
            score: 94.12,
            teamId: 3,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 1',
                divisionId: 0
              },
              teamAbbrev: 'ARCH',
              waiverRank: 8,
              teamId: 3,
              record: {
                pointsAgainst: 1280,
                divisionTies: 0,
                streakLength: 1,
                homeTies: 0,
                overallWins: 5,
                pointsFor: 1155.34,
                divisionPercentage: 0.16667,
                homeLosses: 4,
                awayWins: 3,
                overallPercentage: 0.38462,
                overallLosses: 8,
                divisionLosses: 5,
                divisionWins: 1,
                homeWins: 2,
                awayPercentage: 0,
                streakType: 1,
                awayLosses: 4,
                overallTies: 0,
                divisionStanding: 4,
                overallStanding: 7,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: 'Archie',
              teamNickname: 'Cooper',
              logoType: 'customValid',
              logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
            },
            playerIDs: [
              13983,
              17133,
              17677,
              18279,
              15847,
              11788,
              14881,
              17689,
              11238,
              18178,
              15966,
              60010,
              16725,
              17175,
              16795,
              11270
            ],
            home: false
          }
        ],
        bye: false
      },
      {
        winner: 'away',
        teams: [
          {
            score: 53.68,
            teamId: 12,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 2',
                divisionId: 1
              },
              teamAbbrev: 'YOC',
              waiverRank: 3,
              teamId: 12,
              record: {
                pointsAgainst: 1250.94,
                divisionTies: 0,
                streakLength: 1,
                homeTies: 0,
                overallWins: 7,
                pointsFor: 1219.6,
                divisionPercentage: 0.83333,
                homeLosses: 3,
                awayWins: 4,
                overallPercentage: 0.53846,
                overallLosses: 6,
                divisionLosses: 1,
                divisionWins: 5,
                homeWins: 3,
                awayPercentage: 0,
                streakType: 2,
                awayLosses: 3,
                overallTies: 0,
                divisionStanding: 1,
                overallStanding: 2,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: 'FRICKIN',
              teamNickname: 'JOOOOOSH!',
              logoType: 'customValid',
              logoUrl: 'https://pbs.twimg.com/profile_images/475052828722221057/ZZeoYB2Q.jpeg'
            },
            playerIDs: [
              13982,
              17586,
              14886,
              14912,
              14880,
              17676,
              18382,
              12460,
              60030,
              14816,
              17856,
              15072,
              17208,
              14129,
              3609,
              60016
            ],
            home: true
          },
          {
            score: 117.96,
            teamId: 9,
            team: {
              division: {
                size: 4,
                divisionName: 'Division 1',
                divisionId: 0
              },
              teamAbbrev: '��',
              waiverRank: 2,
              teamId: 9,
              record: {
                pointsAgainst: 1186.94,
                divisionTies: 0,
                streakLength: 1,
                homeTies: 0,
                overallWins: 8,
                pointsFor: 1288.64,
                divisionPercentage: 0.5,
                homeLosses: 2,
                awayWins: 3,
                overallPercentage: 0.61538,
                overallLosses: 5,
                divisionLosses: 3,
                divisionWins: 3,
                homeWins: 5,
                awayPercentage: 0,
                streakType: 2,
                awayLosses: 3,
                overallTies: 0,
                divisionStanding: 2,
                overallStanding: 3,
                homePercentage: 0,
                awayTies: 0
              },
              teamLocation: '2 Gurleys',
              teamNickname: 'One Cup',
              logoType: 'custom',
              logoUrl: 'http://i.imgur.com/C17g1Af.gif'
            },
            playerIDs: [
              17442,
              14005,
              17683,
              2330,
              17929,
              13217,
              16040,
              14054,
              17178,
              15835,
              17809,
              18409,
              16913,
              12483,
              9704,
              60003
            ],
            home: false
          }
        ],
        bye: false
      }
    ],
    matchupPeriodId: 10,
    scoringPeriodId: 10,
    dateFirstProGameOfScoringPeriod: '2017-11-10T01:25:00.000Z',
    proGamesInProgress: false
  }
};

export { localObject, serverResponse };
