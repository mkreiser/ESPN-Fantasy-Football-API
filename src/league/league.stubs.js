import Team from '../team/team.js';

/**
 * Use your editor's collapse functionality to collapse `serverResponse` and make this easier to
 * read/edit.
 */

const teamArray = [
  new Team({
    abbreviation: 'GOAT',
    divisionStanding: 1,
    firstName: 'The Boston',
    lastName: 'TE Party',
    leagueId: 336358,
    leagueStanding: 1,
    losses: 4,
    pointsAgainst: 1131.4,
    pointsFor: 1305.78,
    seasonId: 2017,
    teamId: 1,
    ties: 0,
    waiverRank: 6,
    wins: 9
  }),
  new Team({
    abbreviation: 'GRON',
    divisionStanding: 4,
    firstName: 'Prestige',
    lastName: 'Worldwide',
    leagueId: 336358,
    leagueStanding: 8,
    losses: 8,
    pointsAgainst: 1232.94,
    pointsFor: 1062.82,
    seasonId: 2017,
    teamId: 2,
    ties: 0,
    waiverRank: 5,
    wins: 5
  }),
  new Team({
    abbreviation: 'ARCH',
    divisionStanding: 4,
    firstName: 'Archie',
    lastName: 'Cooper',
    leagueId: 336358,
    leagueStanding: 7,
    losses: 8,
    pointsAgainst: 1280,
    pointsFor: 1155.34,
    seasonId: 2017,
    teamId: 3,
    ties: 0,
    waiverRank: 8,
    wins: 5
  }),
  new Team({
    abbreviation: 'REES',
    divisionStanding: 3,
    firstName: 'Feed',
    lastName: 'Zeeeke ',
    leagueId: 336358,
    leagueStanding: 4,
    losses: 6,
    pointsAgainst: 1290.12,
    pointsFor: 1297.26,
    seasonId: 2017,
    teamId: 4,
    ties: 0,
    waiverRank: 7,
    wins: 7
  }),
  new Team({
    abbreviation: 'fuck',
    divisionStanding: 2,
    firstName: 'fuck fantasy ',
    lastName: 'football',
    leagueId: 336358,
    leagueStanding: 5,
    losses: 7,
    pointsAgainst: 1278.42,
    pointsFor: 1233.26,
    seasonId: 2017,
    teamId: 5,
    ties: 0,
    waiverRank: 4,
    wins: 6
  }),
  new Team({
    abbreviation: 'BOIS',
    divisionStanding: 3,
    firstName: 'Team',
    lastName: 'ASS',
    leagueId: 336358,
    leagueStanding: 6,
    losses: 8,
    pointsAgainst: 1240.04,
    pointsFor: 1328.1,
    seasonId: 2017,
    teamId: 8,
    ties: 0,
    waiverRank: 1,
    wins: 5
  }),
  new Team({
    abbreviation: '��',
    divisionStanding: 2,
    firstName: '2 Gurleys',
    lastName: 'One Cup',
    leagueId: 336358,
    leagueStanding: 3,
    losses: 5,
    pointsAgainst: 1186.94,
    pointsFor: 1288.64,
    seasonId: 2017,
    teamId: 9,
    ties: 0,
    waiverRank: 2,
    wins: 8
  }),
  new Team({
    abbreviation: 'YOC',
    divisionStanding: 1,
    firstName: 'FRICKIN',
    lastName: 'JOOOOOSH!',
    leagueId: 336358,
    leagueStanding: 2,
    losses: 6,
    pointsAgainst: 1250.94,
    pointsFor: 1219.6,
    seasonId: 2017,
    teamId: 12,
    ties: 0,
    waiverRank: 3,
    wins: 7
  })
];

const localObject = {
  allowsTrades: true,
  firstMatchupId: 1,
  firstWeekId: 1,
  lastMatchupId: 15,
  lastWeekId: 17,
  leagueId: 336358,
  name: 'The Ocho',
  numPlayoffTeams: 4,
  numRegularSeasonMatchups: 13,
  numTeams: 8,
  regularSeasonMatchupLength: 1,
  playoffMatchupLength: 2,
  scoringDecimalPlaces: 2,
  seasonId: '2017',
  tradeRevisionHours: 48,
  teams: teamArray,
  draftOrder: teamArray,
  finalRankings: teamArray,
  playoffSeedOrder: teamArray,
  divisions: [{
    divisionId: 0,
    name: 'Division 1',
    size: 4
  }, {
    divisionId: 1,
    name: 'Division 2',
    size: 4
  }]
};

const serverResponse = {
  metadata: {
    dateModifiedUser: '2018-11-30T13:41:03.350Z',
    serverDate: '2018-12-02T00:38:38.327Z',
    defaults: {},
    seasonId: '2017',
    leagueId: '336358',
    dateModifiedLeague: '2018-04-13T08:33:20.250Z',
    status: 'offseason'
  },
  leaguesettings: {
    finalRegularSeasonMatchupPeriodId: 13,
    seasonAcquisitionLimit: -1,
    vetoVotesRequired: 0,
    leagueFormatTypeId: 0,
    draftStatusTypeId: 2,
    draftOrderTypeId: 0,
    matchupPeriodTypeId: 1,
    finalMatchupPeriodId: 15,
    playoffTieRule: 1,
    waiverDetails: [
      {
        processedCount: 1,
        dateProcessed: 20130813
      },
      {
        processedCount: 1,
        dateProcessed: 20130817
      },
      {
        processedCount: 6,
        dateProcessed: 20130911
      },
      {
        processedCount: 1,
        dateProcessed: 20130913
      },
      {
        processedCount: 8,
        dateProcessed: 20130918
      },
      {
        processedCount: 1,
        dateProcessed: 20130920
      },
      {
        processedCount: 6,
        dateProcessed: 20130925
      },
      {
        processedCount: 1,
        dateProcessed: 20130927
      },
      {
        processedCount: 9,
        dateProcessed: 20131002
      },
      {
        processedCount: 2,
        dateProcessed: 20131004
      },
      {
        processedCount: 1,
        dateProcessed: 20131006
      },
      {
        processedCount: 7,
        dateProcessed: 20131009
      },
      {
        processedCount: 1,
        dateProcessed: 20131011
      },
      {
        processedCount: 1,
        dateProcessed: 20131013
      },
      {
        processedCount: 9,
        dateProcessed: 20131016
      },
      {
        processedCount: 1,
        dateProcessed: 20131018
      },
      {
        processedCount: 13,
        dateProcessed: 20131023
      },
      {
        processedCount: 1,
        dateProcessed: 20131025
      },
      {
        processedCount: 8,
        dateProcessed: 20131030
      },
      {
        processedCount: 2,
        dateProcessed: 20131101
      },
      {
        processedCount: 9,
        dateProcessed: 20131106
      },
      {
        processedCount: 1,
        dateProcessed: 20131108
      },
      {
        processedCount: 9,
        dateProcessed: 20131113
      },
      {
        processedCount: 9,
        dateProcessed: 20131120
      },
      {
        processedCount: 1,
        dateProcessed: 20131122
      },
      {
        processedCount: 8,
        dateProcessed: 20131127
      },
      {
        processedCount: 3,
        dateProcessed: 20131204
      },
      {
        processedCount: 1,
        dateProcessed: 20131206
      },
      {
        processedCount: 7,
        dateProcessed: 20131211
      },
      {
        processedCount: 6,
        dateProcessed: 20131218
      },
      {
        processedCount: 11,
        dateProcessed: 20131225
      },
      {
        processedCount: 1,
        dateProcessed: 20131228
      },
      {
        processedCount: 1,
        dateProcessed: 20131231
      },
      {
        processedCount: 1,
        dateProcessed: 20140813
      },
      {
        processedCount: 1,
        dateProcessed: 20140818
      },
      {
        processedCount: 4,
        dateProcessed: 20140910
      },
      {
        processedCount: 6,
        dateProcessed: 20140917
      },
      {
        processedCount: 1,
        dateProcessed: 20140920
      },
      {
        processedCount: 9,
        dateProcessed: 20140924
      },
      {
        processedCount: 1,
        dateProcessed: 20140926
      },
      {
        processedCount: 6,
        dateProcessed: 20141001
      },
      {
        processedCount: 1,
        dateProcessed: 20141003
      },
      {
        processedCount: 11,
        dateProcessed: 20141008
      },
      {
        processedCount: 1,
        dateProcessed: 20141010
      },
      {
        processedCount: 8,
        dateProcessed: 20141015
      },
      {
        processedCount: -1,
        dateProcessed: 20141017
      },
      {
        processedCount: 7,
        dateProcessed: 20141022
      },
      {
        processedCount: 1,
        dateProcessed: 20141023
      },
      {
        processedCount: 7,
        dateProcessed: 20141029
      },
      {
        processedCount: 10,
        dateProcessed: 20141105
      },
      {
        processedCount: 1,
        dateProcessed: 20141106
      },
      {
        processedCount: 7,
        dateProcessed: 20141112
      },
      {
        processedCount: 1,
        dateProcessed: 20141116
      },
      {
        processedCount: 12,
        dateProcessed: 20141119
      },
      {
        processedCount: 1,
        dateProcessed: 20141121
      },
      {
        processedCount: 5,
        dateProcessed: 20141126
      },
      {
        processedCount: 1,
        dateProcessed: 20141127
      },
      {
        processedCount: 5,
        dateProcessed: 20141203
      },
      {
        processedCount: 2,
        dateProcessed: 20141205
      },
      {
        processedCount: 9,
        dateProcessed: 20141210
      },
      {
        processedCount: 5,
        dateProcessed: 20141217
      },
      {
        processedCount: 1,
        dateProcessed: 20141219
      },
      {
        processedCount: 7,
        dateProcessed: 20141224
      },
      {
        processedCount: 1,
        dateProcessed: 20150911
      },
      {
        processedCount: 9,
        dateProcessed: 20150916
      },
      {
        processedCount: 1,
        dateProcessed: 20150917
      },
      {
        processedCount: 1,
        dateProcessed: 20150919
      },
      {
        processedCount: 8,
        dateProcessed: 20150923
      },
      {
        processedCount: 10,
        dateProcessed: 20150930
      },
      {
        processedCount: 2,
        dateProcessed: 20151001
      },
      {
        processedCount: 8,
        dateProcessed: 20151007
      },
      {
        processedCount: 1,
        dateProcessed: 20151010
      },
      {
        processedCount: 6,
        dateProcessed: 20151014
      },
      {
        processedCount: 5,
        dateProcessed: 20151021
      },
      {
        processedCount: 7,
        dateProcessed: 20151028
      },
      {
        processedCount: 7,
        dateProcessed: 20151104
      },
      {
        processedCount: 1,
        dateProcessed: 20151107
      },
      {
        processedCount: 7,
        dateProcessed: 20151111
      },
      {
        processedCount: 4,
        dateProcessed: 20151118
      },
      {
        processedCount: 4,
        dateProcessed: 20151125
      },
      {
        processedCount: 1,
        dateProcessed: 20151126
      },
      {
        processedCount: 7,
        dateProcessed: 20151202
      },
      {
        processedCount: 3,
        dateProcessed: 20151209
      },
      {
        processedCount: 7,
        dateProcessed: 20151216
      },
      {
        processedCount: 6,
        dateProcessed: 20151223
      },
      {
        processedCount: 1,
        dateProcessed: 20151224
      },
      {
        processedCount: 1,
        dateProcessed: 20151226
      },
      {
        processedCount: 4,
        dateProcessed: 20151230
      },
      {
        processedCount: 2,
        dateProcessed: 20151231
      },
      {
        processedCount: 6,
        dateProcessed: 20160914
      },
      {
        processedCount: 1,
        dateProcessed: 20160916
      },
      {
        processedCount: 9,
        dateProcessed: 20160921
      },
      {
        processedCount: 1,
        dateProcessed: 20160924
      },
      {
        processedCount: 3,
        dateProcessed: 20160928
      },
      {
        processedCount: 7,
        dateProcessed: 20161005
      },
      {
        processedCount: 1,
        dateProcessed: 20161006
      },
      {
        processedCount: 4,
        dateProcessed: 20161012
      },
      {
        processedCount: 6,
        dateProcessed: 20161019
      },
      {
        processedCount: 4,
        dateProcessed: 20161026
      },
      {
        processedCount: 7,
        dateProcessed: 20161102
      },
      {
        processedCount: 1,
        dateProcessed: 20161104
      },
      {
        processedCount: 7,
        dateProcessed: 20161109
      },
      {
        processedCount: 1,
        dateProcessed: 20161110
      },
      {
        processedCount: 1,
        dateProcessed: 20161111
      },
      {
        processedCount: 8,
        dateProcessed: 20161116
      },
      {
        processedCount: 5,
        dateProcessed: 20161123
      },
      {
        processedCount: 5,
        dateProcessed: 20161130
      },
      {
        processedCount: 5,
        dateProcessed: 20161207
      },
      {
        processedCount: 7,
        dateProcessed: 20161214
      },
      {
        processedCount: 1,
        dateProcessed: 20161215
      },
      {
        processedCount: 3,
        dateProcessed: 20161221
      },
      {
        processedCount: 9,
        dateProcessed: 20161228
      },
      {
        processedCount: 1,
        dateProcessed: 20170827
      },
      {
        processedCount: 7,
        dateProcessed: 20170913
      },
      {
        processedCount: 7,
        dateProcessed: 20170920
      },
      {
        processedCount: 1,
        dateProcessed: 20170923
      },
      {
        processedCount: 4,
        dateProcessed: 20170927
      },
      {
        processedCount: 11,
        dateProcessed: 20171004
      },
      {
        processedCount: 3,
        dateProcessed: 20171005
      },
      {
        processedCount: 1,
        dateProcessed: 20171007
      },
      {
        processedCount: 1,
        dateProcessed: 20171008
      },
      {
        processedCount: 8,
        dateProcessed: 20171011
      },
      {
        processedCount: 2,
        dateProcessed: 20171013
      },
      {
        processedCount: 7,
        dateProcessed: 20171018
      },
      {
        processedCount: 1,
        dateProcessed: 20171020
      },
      {
        processedCount: 9,
        dateProcessed: 20171025
      },
      {
        processedCount: 2,
        dateProcessed: 20171026
      },
      {
        processedCount: 12,
        dateProcessed: 20171101
      },
      {
        processedCount: 1,
        dateProcessed: 20171103
      },
      {
        processedCount: 8,
        dateProcessed: 20171108
      },
      {
        processedCount: 1,
        dateProcessed: 20171109
      },
      {
        processedCount: 3,
        dateProcessed: 20171110
      },
      {
        processedCount: 6,
        dateProcessed: 20171115
      },
      {
        processedCount: 3,
        dateProcessed: 20171122
      },
      {
        processedCount: 5,
        dateProcessed: 20171129
      },
      {
        processedCount: 1,
        dateProcessed: 20171130
      },
      {
        processedCount: 5,
        dateProcessed: 20171206
      },
      {
        processedCount: 1,
        dateProcessed: 20171207
      },
      {
        processedCount: 5,
        dateProcessed: 20171213
      },
      {
        processedCount: 1,
        dateProcessed: 20171216
      },
      {
        processedCount: 8,
        dateProcessed: 20171220
      },
      {
        processedCount: 1,
        dateProcessed: 20171221
      },
      {
        processedCount: 1,
        dateProcessed: 20171224
      },
      {
        processedCount: 5,
        dateProcessed: 20171227
      },
      {
        processedCount: 1,
        dateProcessed: 20171230
      }
    ],
    premiumTypeId: 0,
    waiverHours: 24,
    tradeLimit: -1,
    defaultUniverseId: 0,
    divisions: [
      {
        size: 4,
        name: 'Division 1',
        divisionId: 0
      },
      {
        size: 4,
        name: 'Division 2',
        divisionId: 1
      }
    ],
    leagueStatusTypeId: 3,
    regularSeasonMatchupLength: 1,
    slotCategoryItems: [
      {
        num: 1,
        slotCategoryId: 0
      },
      {
        num: 0,
        slotCategoryId: 1
      },
      {
        num: 2,
        slotCategoryId: 2
      },
      {
        num: 0,
        slotCategoryId: 3
      },
      {
        num: 2,
        slotCategoryId: 4
      },
      {
        num: 0,
        slotCategoryId: 5
      },
      {
        num: 1,
        slotCategoryId: 6
      },
      {
        num: 0,
        slotCategoryId: 7
      },
      {
        num: 0,
        slotCategoryId: 8
      },
      {
        num: 0,
        slotCategoryId: 9
      },
      {
        num: 0,
        slotCategoryId: 10
      },
      {
        num: 0,
        slotCategoryId: 11
      },
      {
        num: 0,
        slotCategoryId: 12
      },
      {
        num: 0,
        slotCategoryId: 13
      },
      {
        num: 0,
        slotCategoryId: 14
      },
      {
        num: 0,
        slotCategoryId: 15
      },
      {
        num: 1,
        slotCategoryId: 16
      },
      {
        num: 1,
        slotCategoryId: 17
      },
      {
        num: 0,
        slotCategoryId: 18
      },
      {
        num: 0,
        slotCategoryId: 19
      },
      {
        num: 7,
        slotCategoryId: 20
      },
      {
        num: 0,
        slotCategoryId: 21
      },
      {
        num: 0,
        slotCategoryId: 22
      },
      {
        num: 1,
        slotCategoryId: 23
      },
      {
        num: 0,
        slotCategoryId: 24
      }
    ],
    accessTypeId: 1,
    matchupAcquisitionLimits: [
      {
        matchupPeriodId: 1,
        limit: -1
      },
      {
        matchupPeriodId: 2,
        limit: -1
      },
      {
        matchupPeriodId: 3,
        limit: -1
      },
      {
        matchupPeriodId: 4,
        limit: -1
      },
      {
        matchupPeriodId: 5,
        limit: -1
      },
      {
        matchupPeriodId: 6,
        limit: -1
      },
      {
        matchupPeriodId: 7,
        limit: -1
      },
      {
        matchupPeriodId: 8,
        limit: -1
      },
      {
        matchupPeriodId: 9,
        limit: -1
      },
      {
        matchupPeriodId: 10,
        limit: -1
      },
      {
        matchupPeriodId: 11,
        limit: -1
      },
      {
        matchupPeriodId: 12,
        limit: -1
      },
      {
        matchupPeriodId: 13,
        limit: -1
      },
      {
        matchupPeriodId: 14,
        limit: -1
      },
      {
        matchupPeriodId: 15,
        limit: -1
      }
    ],
    season: 2017,
    playoffTeamCount: 4,
    draftOrder: [
      9,
      8,
      4,
      12,
      3,
      1,
      5,
      2
    ],
    tieRule: 0,
    id: 336358,
    leagueMembers: [
      {
        firstName: 'Michael',
        lastName: 'Gronski',
        isLeagueCreator: true,
        inviteId: 0,
        userProfileId: 22497889,
        isLeagueManager: false,
        userName: '--MG--'
      },
      {
        firstName: 'scottie',
        lastName: 'munson',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 22505985,
        isLeagueManager: false,
        userName: 'scottiemunson'
      },
      {
        firstName: 'Bryan',
        lastName: 'Gronski',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 6492902,
        isLeagueManager: false,
        userName: 'bgronk16'
      },
      {
        firstName: 'Jacob',
        lastName: 'Chrysler',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 22510590,
        isLeagueManager: false,
        userName: 'chrysla10'
      },
      {
        firstName: 'Mike',
        lastName: 'Kreiser',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 22510266,
        isLeagueManager: true,
        userName: 'stealthenigma'
      },
      {
        firstName: 'Kyle',
        lastName: 'Martin',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 22522623,
        isLeagueManager: false,
        userName: 'HDvHSFAN 20'
      },
      {
        firstName: 'Brian ',
        lastName: 'Reese',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 22578013,
        isLeagueManager: false,
        userName: 'BthemanReese'
      },
      {
        firstName: 'Chris',
        lastName: 'Martin',
        isLeagueCreator: false,
        inviteId: 0,
        userProfileId: 30348863,
        isLeagueManager: false,
        userName: 'OSUisbetterthanIU'
      }
    ],
    waiverOrderSystemTypeId: 0,
    tieRuleRawStatId: -1,
    playoffSeedings: [
      1,
      12,
      9,
      4,
      5,
      8,
      3,
      2
    ],
    teams: {
      1: {
        teamAbbrev: 'GOAT',
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  98.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 4,
                homeTeamScores: [
                  80.68
                ],
                outcome: 2
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
                awayTeamScores: [
                  110.1
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 1,
                homeTeamScores: [
                  79.6
                ],
                outcome: 2
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  97.16
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 2,
                homeTeamScores: [
                  81.02
                ],
                outcome: 2
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  105.78
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 1,
                homeTeamScores: [
                  99.1
                ],
                outcome: 2
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
                  106.34
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 1,
                homeTeamScores: [
                  68.52
                ],
                outcome: 2
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  75.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 12,
                homeTeamScores: [
                  107.26
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  117.82
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 1,
                homeTeamScores: [
                  91.36
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  120.52
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 8,
                homeTeamScores: [
                  70.86
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
                  103.84
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 1,
                homeTeamScores: [
                  56.64
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  84.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 3,
                homeTeamScores: [
                  127.8
                ],
                outcome: 1
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  97.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 5,
                homeTeamScores: [
                  108.46
                ],
                outcome: 1
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  115.54,
                  63.78
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 4,
                homeTeamScores: [
                  122.46,
                  146.1
                ],
                outcome: 1
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
        waiverRank: 6,
        teamLocation: 'The Boston',
        teamNickname: 'TE Party',
        owners: [
          {
            firstName: 'Michael',
            lastName: 'Gronski',
            photoUrl: 'http://f.espncdn.com/avatars/--MG--/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 22497889,
            ownerId: 22497889,
            leagueManager: true
          }
        ],
        logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg',
        division: {
          size: 4,
          divisionName: 'Division 1',
          divisionId: 0
        },
        percentile: 0,
        teamTransactions: {
          drops: 47,
          moveToActive: 47,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 47,
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
              total: 3,
              matchupPeriodId: 6
            },
            {
              total: 5,
              matchupPeriodId: 7
            },
            {
              total: 1,
              matchupPeriodId: 8
            },
            {
              total: 4,
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
              total: 6,
              matchupPeriodId: 14
            },
            {
              total: 10,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 0
        },
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
        rank: 0,
        divisionStanding: 1,
        logoType: 'customValid',
        overallStanding: 1
      },
      2: {
        teamAbbrev: 'GRON',
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  108.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 2,
                homeTeamScores: [
                  84.04
                ],
                outcome: 2
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  97.16
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 2,
                homeTeamScores: [
                  81.02
                ],
                outcome: 2
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
                  89.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 12,
                homeTeamScores: [
                  56.08
                ],
                outcome: 2
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
                  83.44
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 5,
                homeTeamScores: [
                  82.26
                ],
                outcome: 2
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
                  86.84
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 8,
                homeTeamScores: [
                  75.32
                ],
                outcome: 2
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
                  74.26
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 3,
                homeTeamScores: [
                  74.02
                ],
                outcome: 2
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
                  76.92
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 4,
                homeTeamScores: [
                  81.5
                ],
                outcome: 1
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
                  103.84
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 1,
                homeTeamScores: [
                  56.64
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
                  113.66
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 2,
                homeTeamScores: [
                  111.18
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
                  92.62
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 2,
                homeTeamScores: [
                  79.88
                ],
                outcome: 2
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
                awayTeamScores: [
                  63.5
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 2,
                homeTeamScores: [
                  153.04
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 13
          },
          {
            matchups: [
              {
                awayTeamAdjustment: 0,
                homeTeamAdjustment: 0,
                matchupTypeId: 3,
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  69.84,
                  116.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 2,
                homeTeamScores: [
                  79.34,
                  64.48
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
                matchupTypeId: 3,
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
                awayTeamScores: [
                  83.84,
                  90.32
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 2,
                homeTeamScores: [
                  85.16,
                  124.38
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 5,
        teamLocation: 'Prestige',
        teamNickname: 'Worldwide',
        owners: [
          {
            firstName: 'Bryan',
            lastName: 'Gronski',
            photoUrl: 'http://f.espncdn.com/avatars/bgronk16/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 6492902,
            ownerId: 6492902,
            leagueManager: false
          }
        ],
        logoUrl: 'http://3219a2.medialib.glogster.com/media/f8/f81cfe4e18dba8da78f1e654f311d7852eedf937770ef0670f656835288409ca/prestige-png.png',
        division: {
          size: 4,
          divisionName: 'Division 2',
          divisionId: 1
        },
        percentile: 0,
        teamTransactions: {
          drops: 67,
          moveToActive: 122,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 67,
          trades: 0,
          matchupAcquisitionTotals: [
            {
              total: 0,
              matchupPeriodId: 1
            },
            {
              total: 4,
              matchupPeriodId: 2
            },
            {
              total: 7,
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
              total: 1,
              matchupPeriodId: 7
            },
            {
              total: 6,
              matchupPeriodId: 8
            },
            {
              total: 4,
              matchupPeriodId: 9
            },
            {
              total: 7,
              matchupPeriodId: 10
            },
            {
              total: 6,
              matchupPeriodId: 11
            },
            {
              total: 2,
              matchupPeriodId: 12
            },
            {
              total: 3,
              matchupPeriodId: 13
            },
            {
              total: 7,
              matchupPeriodId: 14
            },
            {
              total: 8,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 1
        },
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
        rank: 0,
        divisionStanding: 4,
        logoType: 'customValid',
        overallStanding: 8
      },
      3: {
        teamAbbrev: 'ARCH',
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  136.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 5,
                homeTeamScores: [
                  72.22
                ],
                outcome: 2
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  78.4
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 4,
                homeTeamScores: [
                  84.7
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  105.78
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 1,
                homeTeamScores: [
                  99.1
                ],
                outcome: 2
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
                awayTeamScores: [
                  95.62
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 3,
                homeTeamScores: [
                  92.96
                ],
                outcome: 2
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
                  80.92
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 3,
                homeTeamScores: [
                  91.4
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
                  74.26
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 3,
                homeTeamScores: [
                  74.02
                ],
                outcome: 2
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
                  104.58
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 3,
                homeTeamScores: [
                  73.72
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  94.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 3,
                homeTeamScores: [
                  95.66
                ],
                outcome: 1
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  84.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 3,
                homeTeamScores: [
                  127.8
                ],
                outcome: 1
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  121.26
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 8,
                homeTeamScores: [
                  91.92
                ],
                outcome: 2
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  92.14
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 12,
                homeTeamScores: [
                  110.28
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 13
          },
          {
            matchups: [
              {
                awayTeamAdjustment: 0,
                homeTeamAdjustment: 0,
                matchupTypeId: 3,
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  69.84,
                  116.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 2,
                homeTeamScores: [
                  79.34,
                  64.48
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
                matchupTypeId: 3,
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
                  92.22,
                  70.64
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 3,
                homeTeamScores: [
                  113.5,
                  95.66
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 8,
        teamLocation: 'Archie',
        teamNickname: 'Cooper',
        owners: [
          {
            firstName: 'scottie',
            lastName: 'munson',
            photoUrl: 'http://f.espncdn.com/avatars/scottiemunson/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 22505985,
            ownerId: 22505985,
            leagueManager: false
          }
        ],
        logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg',
        division: {
          size: 4,
          divisionName: 'Division 1',
          divisionId: 0
        },
        percentile: 0,
        teamTransactions: {
          drops: 25,
          moveToActive: 55,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 25,
          trades: 0,
          matchupAcquisitionTotals: [
            {
              total: 0,
              matchupPeriodId: 1
            },
            {
              total: 0,
              matchupPeriodId: 2
            },
            {
              total: 2,
              matchupPeriodId: 3
            },
            {
              total: 0,
              matchupPeriodId: 4
            },
            {
              total: 3,
              matchupPeriodId: 5
            },
            {
              total: 3,
              matchupPeriodId: 6
            },
            {
              total: 1,
              matchupPeriodId: 7
            },
            {
              total: 1,
              matchupPeriodId: 8
            },
            {
              total: 1,
              matchupPeriodId: 9
            },
            {
              total: 4,
              matchupPeriodId: 10
            },
            {
              total: 1,
              matchupPeriodId: 11
            },
            {
              total: 0,
              matchupPeriodId: 12
            },
            {
              total: 0,
              matchupPeriodId: 13
            },
            {
              total: 2,
              matchupPeriodId: 14
            },
            {
              total: 7,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 0
        },
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
        rank: 0,
        divisionStanding: 4,
        logoType: 'customValid',
        overallStanding: 7
      },
      4: {
        teamAbbrev: 'REES',
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  98.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 4,
                homeTeamScores: [
                  80.68
                ],
                outcome: 2
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  108.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 2,
                homeTeamScores: [
                  84.04
                ],
                outcome: 2
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  78.4
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 4,
                homeTeamScores: [
                  84.7
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  136.58
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 8,
                homeTeamScores: [
                  96.62
                ],
                outcome: 2
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
                  120.4
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 4,
                homeTeamScores: [
                  113.64
                ],
                outcome: 2
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
                  113.04
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 4,
                homeTeamScores: [
                  95.62
                ],
                outcome: 2
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  117.82
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 1,
                homeTeamScores: [
                  91.36
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
                  76.92
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 4,
                homeTeamScores: [
                  81.5
                ],
                outcome: 1
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  94.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 3,
                homeTeamScores: [
                  95.66
                ],
                outcome: 1
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
                awayTeamScores: [
                  123.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 4,
                homeTeamScores: [
                  92.9
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  107.38
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 12,
                homeTeamScores: [
                  99.62
                ],
                outcome: 2
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  115.54,
                  63.78
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 4,
                homeTeamScores: [
                  122.46,
                  146.1
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 14
          },
          {
            matchups: [
              {
                awayTeamAdjustment: 0,
                homeTeamAdjustment: 0,
                matchupTypeId: 1,
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
                  73.2,
                  124.1
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 4,
                homeTeamScores: [
                  73.96,
                  65.62
                ],
                outcome: 2
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 7,
        teamLocation: 'Feed',
        teamNickname: 'Zeeeke ',
        owners: [
          {
            firstName: 'Brian ',
            lastName: 'Reese',
            photoUrl: 'http://f.espncdn.com/avatars/BthemanReese/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 22578013,
            ownerId: 22578013,
            leagueManager: false
          }
        ],
        logoUrl: '',
        division: {
          size: 4,
          divisionName: 'Division 1',
          divisionId: 0
        },
        percentile: 0,
        teamTransactions: {
          drops: 38,
          moveToActive: 90,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 38,
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
              total: 0,
              matchupPeriodId: 3
            },
            {
              total: 2,
              matchupPeriodId: 4
            },
            {
              total: 2,
              matchupPeriodId: 5
            },
            {
              total: 2,
              matchupPeriodId: 6
            },
            {
              total: 3,
              matchupPeriodId: 7
            },
            {
              total: 1,
              matchupPeriodId: 8
            },
            {
              total: 3,
              matchupPeriodId: 9
            },
            {
              total: 4,
              matchupPeriodId: 10
            },
            {
              total: 3,
              matchupPeriodId: 11
            },
            {
              total: 2,
              matchupPeriodId: 12
            },
            {
              total: 3,
              matchupPeriodId: 13
            },
            {
              total: 4,
              matchupPeriodId: 14
            },
            {
              total: 5,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 2
        },
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
        rank: 0,
        divisionStanding: 3,
        logoType: 'none',
        overallStanding: 4
      },
      5: {
        teamAbbrev: 'fuck',
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  136.74
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 5,
                homeTeamScores: [
                  72.22
                ],
                outcome: 2
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
                  109.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 12,
                homeTeamScores: [
                  89.42
                ],
                outcome: 2
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
                  90.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 8,
                homeTeamScores: [
                  97.92
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
                  83.44
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 5,
                homeTeamScores: [
                  82.26
                ],
                outcome: 2
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
                  106.34
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 1,
                homeTeamScores: [
                  68.52
                ],
                outcome: 2
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
                  113.04
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 4,
                homeTeamScores: [
                  95.62
                ],
                outcome: 2
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
                  104.58
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 3,
                homeTeamScores: [
                  73.72
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
                  80.5
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 5,
                homeTeamScores: [
                  103.38
                ],
                outcome: 1
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
                awayTeamScores: [
                  109.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 5,
                homeTeamScores: [
                  99.76
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
                  92.62
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 2,
                homeTeamScores: [
                  79.88
                ],
                outcome: 2
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  97.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 5,
                homeTeamScores: [
                  108.46
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 13
          },
          {
            matchups: [
              {
                awayTeamAdjustment: 0,
                homeTeamAdjustment: 0,
                matchupTypeId: 3,
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
                  91.42,
                  97.34
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 8,
                homeTeamScores: [
                  84.14,
                  96.84
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
                matchupTypeId: 3,
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
                  92.22,
                  70.64
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 3,
                homeTeamScores: [
                  113.5,
                  95.66
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 4,
        teamLocation: 'fuck fantasy ',
        teamNickname: 'football',
        owners: [
          {
            firstName: 'Chris',
            lastName: 'Martin',
            photoUrl: 'http://f.espncdn.com/avatars/OSUisbetterthanIU/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 30348863,
            ownerId: 30348863,
            leagueManager: false
          }
        ],
        logoUrl: 'https://i.ytimg.com/vi/5LlQNty_C8s/hqdefault.jpg',
        division: {
          size: 4,
          divisionName: 'Division 2',
          divisionId: 1
        },
        percentile: 0,
        teamTransactions: {
          drops: 51,
          moveToActive: 93,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 51,
          trades: 0,
          matchupAcquisitionTotals: [
            {
              total: 0,
              matchupPeriodId: 1
            },
            {
              total: 3,
              matchupPeriodId: 2
            },
            {
              total: 5,
              matchupPeriodId: 3
            },
            {
              total: 2,
              matchupPeriodId: 4
            },
            {
              total: 0,
              matchupPeriodId: 5
            },
            {
              total: 3,
              matchupPeriodId: 6
            },
            {
              total: 6,
              matchupPeriodId: 7
            },
            {
              total: 4,
              matchupPeriodId: 8
            },
            {
              total: 5,
              matchupPeriodId: 9
            },
            {
              total: 5,
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
              total: 1,
              matchupPeriodId: 13
            },
            {
              total: 6,
              matchupPeriodId: 14
            },
            {
              total: 7,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 2
        },
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
        rank: 0,
        divisionStanding: 2,
        logoType: 'customValid',
        overallStanding: 5
      },
      8: {
        teamAbbrev: 'BOIS',
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
                  61.64
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 8,
                homeTeamScores: [
                  73.7
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
                awayTeamScores: [
                  110.1
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 1,
                homeTeamScores: [
                  79.6
                ],
                outcome: 2
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
                  90.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 8,
                homeTeamScores: [
                  97.92
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  136.58
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 8,
                homeTeamScores: [
                  96.62
                ],
                outcome: 2
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
                awayTeamScores: [
                  95.62
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 3,
                homeTeamScores: [
                  92.96
                ],
                outcome: 2
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
                  86.84
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 8,
                homeTeamScores: [
                  75.32
                ],
                outcome: 2
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
                awayTeamScores: [
                  121.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 12,
                homeTeamScores: [
                  88.18
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  120.52
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 8,
                homeTeamScores: [
                  70.86
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
                awayTeamScores: [
                  109.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 5,
                homeTeamScores: [
                  99.76
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
                awayTeamScores: [
                  123.8
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 4,
                homeTeamScores: [
                  92.9
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  121.26
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 8,
                homeTeamScores: [
                  91.92
                ],
                outcome: 2
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
                awayTeamScores: [
                  63.5
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 2,
                homeTeamScores: [
                  153.04
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 13
          },
          {
            matchups: [
              {
                awayTeamAdjustment: 0,
                homeTeamAdjustment: 0,
                matchupTypeId: 3,
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
                  91.42,
                  97.34
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 8,
                homeTeamScores: [
                  84.14,
                  96.84
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
                matchupTypeId: 3,
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
                awayTeamScores: [
                  83.84,
                  90.32
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 2,
                homeTeamScores: [
                  85.16,
                  124.38
                ],
                outcome: 1
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 1,
        teamLocation: 'Team',
        teamNickname: 'ASS',
        owners: [
          {
            firstName: 'Kyle',
            lastName: 'Martin',
            photoUrl: 'http://f.espncdn.com/avatars/HDvHSFAN 20/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 22522623,
            ownerId: 22522623,
            leagueManager: false
          }
        ],
        logoUrl: 'http://sportsdata-corpsite-wordpress.s3.amazonaws.com/wp-content/uploads/2014/03/Ben-Tate-01.jpg',
        division: {
          size: 4,
          divisionName: 'Division 2',
          divisionId: 1
        },
        percentile: 0,
        teamTransactions: {
          drops: 16,
          moveToActive: 39,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 16,
          trades: 0,
          matchupAcquisitionTotals: [
            {
              total: 0,
              matchupPeriodId: 1
            },
            {
              total: 0,
              matchupPeriodId: 2
            },
            {
              total: 3,
              matchupPeriodId: 3
            },
            {
              total: 3,
              matchupPeriodId: 4
            },
            {
              total: 1,
              matchupPeriodId: 5
            },
            {
              total: 4,
              matchupPeriodId: 6
            },
            {
              total: 0,
              matchupPeriodId: 7
            },
            {
              total: 1,
              matchupPeriodId: 8
            },
            {
              total: 2,
              matchupPeriodId: 9
            },
            {
              total: 0,
              matchupPeriodId: 10
            },
            {
              total: 0,
              matchupPeriodId: 11
            },
            {
              total: 0,
              matchupPeriodId: 12
            },
            {
              total: 0,
              matchupPeriodId: 13
            },
            {
              total: 0,
              matchupPeriodId: 14
            },
            {
              total: 2,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 0
        },
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
        rank: 0,
        divisionStanding: 3,
        logoType: 'customValid',
        overallStanding: 6
      },
      9: {
        teamAbbrev: '��',
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
      },
      12: {
        teamAbbrev: 'YOC',
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
                  61.64
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 8,
                homeTeamScores: [
                  73.7
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
                  109.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 5,
                awayTeamId: 12,
                homeTeamScores: [
                  89.42
                ],
                outcome: 2
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
                  89.08
                ],
                homeTeamBonus: 0,
                homeTeamId: 2,
                awayTeamId: 12,
                homeTeamScores: [
                  56.08
                ],
                outcome: 2
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
                  120.4
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 4,
                homeTeamScores: [
                  113.64
                ],
                outcome: 2
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
                  80.92
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 3,
                homeTeamScores: [
                  91.4
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
                  teamAbbrev: 'GOAT',
                  waiverRank: 6,
                  teamId: 1,
                  teamLocation: 'The Boston',
                  teamNickname: 'TE Party',
                  logoType: 'customValid',
                  logoUrl: 'http://assets.nydailynews.com/polopoly_fs/1.1443336.1378094427!/img/httpImage/image.jpg_gen/derivatives/article_750/sport-nfl-football.jpg'
                },
                awayTeamScores: [
                  75.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 1,
                awayTeamId: 12,
                homeTeamScores: [
                  107.26
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
                awayTeamScores: [
                  121.12
                ],
                homeTeamBonus: 0,
                homeTeamId: 8,
                awayTeamId: 12,
                homeTeamScores: [
                  88.18
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
                  80.5
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 5,
                homeTeamScores: [
                  103.38
                ],
                outcome: 1
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
                  113.66
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 2,
                homeTeamScores: [
                  111.18
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
                  teamAbbrev: 'REES',
                  waiverRank: 7,
                  teamId: 4,
                  teamLocation: 'Feed',
                  teamNickname: 'Zeeeke ',
                  logoType: 'none',
                  logoUrl: ''
                },
                awayTeamScores: [
                  107.38
                ],
                homeTeamBonus: 0,
                homeTeamId: 4,
                awayTeamId: 12,
                homeTeamScores: [
                  99.62
                ],
                outcome: 2
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
                  teamAbbrev: 'ARCH',
                  waiverRank: 8,
                  teamId: 3,
                  teamLocation: 'Archie',
                  teamNickname: 'Cooper',
                  logoType: 'customValid',
                  logoUrl: 'http://www.insidethehall.com/wp-content/uploads/2017/03/IUArchie0008-1.jpg'
                },
                awayTeamScores: [
                  92.14
                ],
                homeTeamBonus: 0,
                homeTeamId: 3,
                awayTeamId: 12,
                homeTeamScores: [
                  110.28
                ],
                outcome: 1
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
                matchupTypeId: 1,
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
                  73.2,
                  124.1
                ],
                homeTeamBonus: 0,
                homeTeamId: 12,
                awayTeamId: 4,
                homeTeamScores: [
                  73.96,
                  65.62
                ],
                outcome: 2
              }
            ],
            matchupPeriodId: 15
          }
        ],
        waiverRank: 3,
        teamLocation: 'FRICKIN',
        teamNickname: 'JOOOOOSH!',
        owners: [
          {
            firstName: 'Jacob',
            lastName: 'Chrysler',
            photoUrl: 'http://f.espncdn.com/avatars/chrysla10/medium',
            inviteId: 0,
            joined: true,
            primaryOwner: true,
            userProfileId: 22510590,
            ownerId: 22510590,
            leagueManager: false
          }
        ],
        logoUrl: 'https://pbs.twimg.com/profile_images/475052828722221057/ZZeoYB2Q.jpeg',
        division: {
          size: 4,
          divisionName: 'Division 2',
          divisionId: 1
        },
        percentile: 0,
        teamTransactions: {
          drops: 32,
          moveToActive: 71,
          moveToIR: 0,
          amountPaid: 0,
          acquisitionBudgetSpent: 0,
          overallAcquisitionTotal: 32,
          trades: 0,
          matchupAcquisitionTotals: [
            {
              total: 1,
              matchupPeriodId: 1
            },
            {
              total: 1,
              matchupPeriodId: 2
            },
            {
              total: 1,
              matchupPeriodId: 3
            },
            {
              total: 2,
              matchupPeriodId: 4
            },
            {
              total: 3,
              matchupPeriodId: 5
            },
            {
              total: 1,
              matchupPeriodId: 6
            },
            {
              total: 4,
              matchupPeriodId: 7
            },
            {
              total: 4,
              matchupPeriodId: 8
            },
            {
              total: 4,
              matchupPeriodId: 9
            },
            {
              total: 4,
              matchupPeriodId: 10
            },
            {
              total: 0,
              matchupPeriodId: 11
            },
            {
              total: 0,
              matchupPeriodId: 12
            },
            {
              total: 1,
              matchupPeriodId: 13
            },
            {
              total: 1,
              matchupPeriodId: 14
            },
            {
              total: 3,
              matchupPeriodId: 15
            }
          ],
          miscTeamCharges: 0,
          offseasonAcquisitionTotal: 2
        },
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
        rank: 0,
        divisionStanding: 1,
        logoType: 'customValid',
        overallStanding: 2
      }
    },
    rosterMoveLimit: -1,
    inviteKey: 'b9238',
    draftAuctionBudget: 200,
    futureKeeperCount: 0,
    allowOutOfUniverseStatsAndTrades: false,
    allowsTrades: true,
    scoringTypeId: 1,
    size: 8,
    finalCalculatedRanking: [
      1,
      9,
      4,
      12,
      8,
      2,
      5,
      3
    ],
    finalScoringPeriodId: 17,
    dateDraftCompleted: '2017-08-26T01:23:13.013Z',
    name: 'The Ocho',
    lineupLocktimeType: 0,
    dateDraft: '2017-08-25T23:30:00.000Z',
    draftTypeId: 1,
    positionItems: [
      {
        positionId: 0,
        max: 0
      },
      {
        positionId: 1,
        max: 4
      },
      {
        positionId: 2,
        max: 8
      },
      {
        positionId: 3,
        max: 8
      },
      {
        positionId: 4,
        max: 3
      },
      {
        positionId: 5,
        max: 3
      },
      {
        positionId: 6,
        max: 0
      },
      {
        positionId: 7,
        max: 0
      },
      {
        positionId: 8,
        max: 0
      },
      {
        positionId: 9,
        max: 0
      },
      {
        positionId: 10,
        max: 0
      },
      {
        positionId: 11,
        max: 0
      },
      {
        positionId: 12,
        max: 0
      },
      {
        positionId: 13,
        max: 0
      },
      {
        positionId: 14,
        max: 0
      },
      {
        positionId: 15,
        max: 0
      },
      {
        positionId: 16,
        max: 3
      },
      {
        positionId: 17,
        max: 0
      }
    ],
    leagueSubTypeId: 0,
    playoffMatchupLength: 2,
    currentKeeperCount: 0,
    scoringPeriodsByMatchupPeriod: {
      1: [
        1
      ],
      2: [
        2
      ],
      3: [
        3
      ],
      4: [
        4
      ],
      5: [
        5
      ],
      6: [
        6
      ],
      7: [
        7
      ],
      8: [
        8
      ],
      9: [
        9
      ],
      10: [
        10
      ],
      11: [
        11
      ],
      12: [
        12
      ],
      13: [
        13
      ],
      14: [
        14,
        15
      ],
      15: [
        16,
        17
      ]
    },
    playoffHomeTeamBonus: 0,
    playoffTieRuleRawStatId: 0,
    isViewable: true,
    playoffSeedingTieRule: 1,
    playerAcquisitionBudget: 100,
    waiverProcessDays: 123,
    waiverProcessHour: 8,
    usesPlayerAcquisitionBudget: false,
    homeTeamBonus: 0,
    firstMatchupPeriodId: 1,
    playoffSeedingTieRuleRawStatId: 0,
    timePerDraftSelection: 120,
    restrictionTypeId: 0,
    playerAcquisitionType: 1,
    minimumBidAmount: 1,
    scoringItems: [
      {
        isTeamScoringItem: false,
        statId: 3,
        isReverseItem: false,
        points: 0.04
      },
      {
        isTeamScoringItem: false,
        statId: 4,
        isReverseItem: false,
        points: 4
      },
      {
        isTeamScoringItem: false,
        statId: 19,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: false,
        statId: 20,
        isReverseItem: false,
        points: -2
      },
      {
        isTeamScoringItem: false,
        statId: 24,
        isReverseItem: false,
        points: 0.1
      },
      {
        isTeamScoringItem: false,
        statId: 25,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 26,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: false,
        statId: 42,
        isReverseItem: false,
        points: 0.1
      },
      {
        isTeamScoringItem: false,
        statId: 43,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 44,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: false,
        statId: 63,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 72,
        isReverseItem: false,
        points: -2
      },
      {
        isTeamScoringItem: false,
        statId: 74,
        isReverseItem: false,
        points: 5
      },
      {
        isTeamScoringItem: false,
        statId: 77,
        isReverseItem: false,
        points: 4
      },
      {
        isTeamScoringItem: false,
        statId: 80,
        isReverseItem: false,
        points: 3
      },
      {
        isTeamScoringItem: false,
        statId: 85,
        isReverseItem: false,
        points: -1
      },
      {
        isTeamScoringItem: false,
        statId: 86,
        isReverseItem: false,
        points: 1
      },
      {
        isTeamScoringItem: false,
        statId: 88,
        isReverseItem: false,
        points: -1
      },
      {
        isTeamScoringItem: true,
        statId: 89,
        isReverseItem: false,
        points: 5
      },
      {
        isTeamScoringItem: true,
        statId: 90,
        isReverseItem: false,
        points: 4
      },
      {
        isTeamScoringItem: true,
        statId: 91,
        isReverseItem: false,
        points: 3
      },
      {
        isTeamScoringItem: true,
        statId: 92,
        isReverseItem: false,
        points: 1
      },
      {
        isTeamScoringItem: false,
        statId: 93,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 93,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 95,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 96,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 97,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 98,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 99,
        isReverseItem: false,
        points: 1
      },
      {
        isTeamScoringItem: false,
        statId: 101,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 101,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 102,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 102,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 103,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 103,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: false,
        statId: 104,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 104,
        isReverseItem: false,
        points: 6
      },
      {
        isTeamScoringItem: true,
        statId: 123,
        isReverseItem: false,
        points: -1
      },
      {
        isTeamScoringItem: true,
        statId: 124,
        isReverseItem: false,
        points: -3
      },
      {
        isTeamScoringItem: true,
        statId: 125,
        isReverseItem: false,
        points: -5
      },
      {
        isTeamScoringItem: true,
        statId: 128,
        isReverseItem: false,
        points: 5
      },
      {
        isTeamScoringItem: true,
        statId: 129,
        isReverseItem: false,
        points: 3
      },
      {
        isTeamScoringItem: true,
        statId: 130,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 132,
        isReverseItem: false,
        points: -1
      },
      {
        isTeamScoringItem: true,
        statId: 133,
        isReverseItem: false,
        points: -3
      },
      {
        isTeamScoringItem: true,
        statId: 134,
        isReverseItem: false,
        points: -5
      },
      {
        isTeamScoringItem: true,
        statId: 135,
        isReverseItem: false,
        points: -6
      },
      {
        isTeamScoringItem: true,
        statId: 136,
        isReverseItem: false,
        points: -7
      },
      {
        isTeamScoringItem: false,
        statId: 206,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: true,
        statId: 206,
        isReverseItem: false,
        points: 2
      },
      {
        isTeamScoringItem: false,
        statId: 209,
        isReverseItem: false,
        points: 1
      },
      {
        isTeamScoringItem: true,
        statId: 209,
        isReverseItem: false,
        points: 1
      }
    ],
    scoringDecimalPlaces: 2,
    regularSeasonMatchupPeriodCount: 13,
    tradeRevisionHours: 48,
    firstScoringPeriodId: 1,
    defaultWaiverOrder: 0,
    leagueTypeId: 0,
    usingUndroppableList: true,
    rosterLocktimeType: 0,
    draftPickTradingEnabled: true,
    finance: {
      entryFee: 0,
      drop: 0,
      loss: 0,
      trade: 0,
      moveToActive: 0,
      moveToIR: 0,
      acquisition: 0,
      miscFee: 0
    }
  }
};

export { localObject, serverResponse };
