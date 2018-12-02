/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const localObject = {
  abbreviation: 'mk',
  divisionStanding: 2,
  firstName: '2 Gurleys',
  lastName: 'One Cup',
  leagueStanding: 3,
  losses: 5,
  pointsAgainst: 1186.94,
  pointsFor: 1288.64,
  teamId: 9,
  ties: 0,
  waiverRank: 2,
  wins: 8
};

const serverResponse = {
  teamAbbrev: 'mk',
  scheduleItems: [
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'GRON',
            waiverRank: 5,
            teamId: 2,
            teamLocation: 'Prestige',
            teamNickname: 'Worldwide',
            logoType: 'customValid',
            logoUrl: 'http://3219a2.medialib.glogster.com/media/f8/f81cfe4e18dba8da78f1e654f311d7852eedf937770ef0670f656835288409ca/prestige-png.png'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            90.48
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 2,
          homeTeamScores: [
            97.08
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 1
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'ARCH',
            waiverRank: 8,
            teamId: 3,
            teamLocation: 'Archie',
            teamNickname: 'Cooper',
            logoType: 'customValid',
            logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            78.32
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 3,
          homeTeamScores: [
            90.48
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 2
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'YOC',
            waiverRank: 3,
            teamId: 12,
            teamLocation: 'FRICKIN',
            teamNickname: 'JOOOOOSH!',
            logoType: 'customValid',
            logoUrl: 'https://pbs.twimg.com/profile_images/475052828722221057/ZZeoYB2Q.jpeg'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            78.7
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 12,
          homeTeamScores: [
            125.02
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 3
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'fuck',
            waiverRank: 4,
            teamId: 5,
            teamLocation: 'fuck fantasy ',
            teamNickname: 'football',
            logoType: 'customValid',
            logoUrl: 'https://i.ytimg.com/vi/5LlQNty_C8s/hqdefault.jpg'
          },
          awayTeamScores: [
            98.28
          ],
          homeTeamBonus: 0,
          homeTeamId: 5,
          awayTeamId: 9,
          homeTeamScores: [
            116.56
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 4
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'GOAT',
            waiverRank: 6,
            teamId: 1,
            teamLocation: 'The Boston',
            teamNickname: 'TE Party',
            logoType: 'customValid',
            logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
          },
          awayTeamScores: [
            64.12
          ],
          homeTeamBonus: 0,
          homeTeamId: 1,
          awayTeamId: 9,
          homeTeamScores: [
            94.36
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 5
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'REES',
            waiverRank: 7,
            teamId: 4,
            teamLocation: 'Feed',
            teamNickname: 'Zeeeke ',
            logoType: 'none',
            logoUrl: ''
          },
          awayTeamScores: [
            95.18
          ],
          homeTeamBonus: 0,
          homeTeamId: 4,
          awayTeamId: 9,
          homeTeamScores: [
            110.14
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 6
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'BOIS',
            waiverRank: 1,
            teamId: 8,
            teamLocation: 'Team',
            teamNickname: 'ASS',
            logoType: 'customValid',
            logoUrl: 'http://sportsdata-corpsite-wordpress.s3.amazonaws.com/wp-content/uploads/2014/03/Ben-Tate-01.jpg'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            104.02
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 8,
          homeTeamScores: [
            109.76
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 7
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'GRON',
            waiverRank: 5,
            teamId: 2,
            teamLocation: 'Prestige',
            teamNickname: 'Worldwide',
            logoType: 'customValid',
            logoUrl: 'http://3219a2.medialib.glogster.com/media/f8/f81cfe4e18dba8da78f1e654f311d7852eedf937770ef0670f656835288409ca/prestige-png.png'
          },
          awayTeamScores: [
            112.32
          ],
          homeTeamBonus: 0,
          homeTeamId: 2,
          awayTeamId: 9,
          homeTeamScores: [
            71.5
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 8
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'ARCH',
            waiverRank: 8,
            teamId: 3,
            teamLocation: 'Archie',
            teamNickname: 'Cooper',
            logoType: 'customValid',
            logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
          },
          awayTeamScores: [
            99.64
          ],
          homeTeamBonus: 0,
          homeTeamId: 3,
          awayTeamId: 9,
          homeTeamScores: [
            85.18
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 9
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'YOC',
            waiverRank: 3,
            teamId: 12,
            teamLocation: 'FRICKIN',
            teamNickname: 'JOOOOOSH!',
            logoType: 'customValid',
            logoUrl: 'https://pbs.twimg.com/profile_images/475052828722221057/ZZeoYB2Q.jpeg'
          },
          awayTeamScores: [
            117.96
          ],
          homeTeamBonus: 0,
          homeTeamId: 12,
          awayTeamId: 9,
          homeTeamScores: [
            53.68
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 10
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'fuck',
            waiverRank: 4,
            teamId: 5,
            teamLocation: 'fuck fantasy ',
            teamNickname: 'football',
            logoType: 'customValid',
            logoUrl: 'https://i.ytimg.com/vi/5LlQNty_C8s/hqdefault.jpg'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            104.02
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 5,
          homeTeamScores: [
            97.6
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 11
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'GOAT',
            waiverRank: 6,
            teamId: 1,
            teamLocation: 'The Boston',
            teamNickname: 'TE Party',
            logoType: 'customValid',
            logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            91.46
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 1,
          homeTeamScores: [
            99.28
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 12
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'REES',
            waiverRank: 7,
            teamId: 4,
            teamLocation: 'Feed',
            teamNickname: 'Zeeeke ',
            logoType: 'none',
            logoUrl: ''
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          awayTeamScores: [
            108.52
          ],
          homeTeamBonus: 0,
          homeTeamId: 9,
          awayTeamId: 4,
          homeTeamScores: [
            81.92
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 13
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 2',
              divisionId: 1
            },
            teamAbbrev: 'YOC',
            waiverRank: 3,
            teamId: 12,
            teamLocation: 'FRICKIN',
            teamNickname: 'JOOOOOSH!',
            logoType: 'customValid',
            logoUrl: 'https://pbs.twimg.com/profile_images/475052828722221057/ZZeoYB2Q.jpeg'
          },
          awayTeamScores: [
            104.72,
            106.72
          ],
          homeTeamBonus: 0,
          homeTeamId: 12,
          awayTeamId: 9,
          homeTeamScores: [
            66.44,
            109.74
          ],
          outcome: 2
        }
      ],
      matchupPeriodId: 14
    },
    {
      matchups: [
        {
          awayTeamAdjustment: 0,
          homeTeamAdjustment: 0,
          matchupTypeId: 0,
          awayTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: '��',
            waiverRank: 2,
            teamId: 9,
            teamLocation: '2 Gurleys',
            teamNickname: 'One Cup',
            logoType: 'custom',
            logoUrl: 'http://i.imgur.com/C17g1Af.gif'
          },
          isBye: false,
          homeTeam: {
            division: {
              size: 4,
              divisionName: 'Division 1',
              divisionId: 0
            },
            teamAbbrev: 'GOAT',
            waiverRank: 6,
            teamId: 1,
            teamLocation: 'The Boston',
            teamNickname: 'TE Party',
            logoType: 'customValid',
            logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
          },
          awayTeamScores: [
            114.36,
            72.4
          ],
          homeTeamBonus: 0,
          homeTeamId: 1,
          awayTeamId: 9,
          homeTeamScores: [
            108.8,
            86.78
          ],
          outcome: 1
        }
      ],
      matchupPeriodId: 15
    }
  ],
  waiverRank: 2,
  teamLocation: '2 Gurleys',
  teamNickname: 'One Cup',
  owners: [
    {
      firstName: 'Mike',
      lastName: 'Kreiser',
      photoUrl: 'http://f.espncdn.com/avatars/stealthenigma/medium',
      inviteId: 0,
      joined: true,
      primaryOwner: true,
      userProfileId: 22510266,
      ownerId: 22510266,
      userName: 'stealthenigma',
      leagueManager: true
    }
  ],
  logoUrl: 'http://i.imgur.com/C17g1Af.gif',
  division: {
    size: 4,
    divisionName: 'Division 1',
    divisionId: 0
  },
  percentile: 0,
  teamTransactions: {
    drops: 38,
    moveToActive: 61,
    moveToIR: 0,
    amountPaid: 0,
    acquisitionBudgetSpent: 0,
    overallAcquisitionTotal: 37,
    trades: 0,
    matchupAcquisitionTotals: [
      {
        total: 0,
        matchupPeriodId: 1
      },
      {
        total: 2,
        matchupPeriodId: 2
      },
      {
        total: 3,
        matchupPeriodId: 3
      },
      {
        total: 2,
        matchupPeriodId: 4
      },
      {
        total: 5,
        matchupPeriodId: 5
      },
      {
        total: 4,
        matchupPeriodId: 6
      },
      {
        total: 2,
        matchupPeriodId: 7
      },
      {
        total: 3,
        matchupPeriodId: 8
      },
      {
        total: 3,
        matchupPeriodId: 9
      },
      {
        total: 2,
        matchupPeriodId: 10
      },
      {
        total: 1,
        matchupPeriodId: 11
      },
      {
        total: 1,
        matchupPeriodId: 12
      },
      {
        total: 2,
        matchupPeriodId: 13
      },
      {
        total: 2,
        matchupPeriodId: 14
      },
      {
        total: 4,
        matchupPeriodId: 15
      }
    ],
    miscTeamCharges: 0,
    offseasonAcquisitionTotal: 1
  },
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
  rank: 0,
  divisionStanding: 2,
  logoType: 'custom',
  overallStanding: 3
};

export { localObject, serverResponse };
