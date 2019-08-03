import axios from 'axios';
import _ from 'lodash';
import q from 'q';

import Boxscore from '../boxscore/boxscore';
import FreeAgentPlayer from '../free-agent-player/free-agent-player';
import Player from '../player/player';
import Team from '../team/team';

import Client from './client';

describe('Client', () => {
  describe('constructor', () => {
    describe('when options are not passed', () => {
      const testPropIsUndefined = (prop) => {
        test(`${prop} is undefined`, () => {
          const newInstance = new Client();
          expect(_.get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
    });

    describe('when options are passed', () => {
      const testPropIsSetFromOptions = (prop) => {
        test(`${prop} is set from options`, () => {
          const value = 203123;
          const newInstance = new Client({ [prop]: value });
          expect(_.get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
    });

    describe('when all cookies are passed on options', () => {
      test('sets cookies', () => {
        const espnS2 = 'some_espn_s2';
        const SWID = 'some_swid';

        const client = new Client({ espnS2, SWID });

        expect(client.espnS2).toBe(espnS2);
        expect(client.SWID).toBe(SWID);
      });
    });

    describe('when only espnS2 is passed on options', () => {
      test('does not set cookies', () => {
        const espnS2 = 'some_espn_s2';

        const client = new Client({ espnS2 });

        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });

    describe('when only SWID is passed on options', () => {
      test('does not set cookies', () => {
        const SWID = 'some_swid';

        const client = new Client({ SWID });

        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });

    describe('when no cookies are passed on options', () => {
      test('does not set cookies', () => {
        const client = new Client();

        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });
  });

  describe('instance methods', () => {
    describe('_buildAxiosConfig', () => {
      describe('when espnS2 is set on the instance', () => {
        describe('when SWID is set on the instance', () => {
          test('returns an axiosConfig with Cookie merged onto headers', () => {
            const espnS2 = 'some_espn_s2';
            const SWID = 'some_swid';
            const passedConfig = {
              headers: { something: 'with a value' },
              baseRoute: 'some/base/route'
            };

            const cookieHeaders = { Cookie: `espn_s2=${espnS2}; SWID=${SWID};` };
            const cookieConfig = { headers: cookieHeaders, withCredentials: true };

            const client = new Client({ espnS2, SWID });
            const axiosConfig = client._buildAxiosConfig(passedConfig);
            expect(axiosConfig).toEqual(_.merge({}, passedConfig, cookieConfig));
          });
        });

        describe('when SWID is not set on the instance', () => {
          test('returns the passed axiosConfig', () => {
            const espnS2 = 'some_espn_s2';
            const passedConfig = {
              headers: { something: 'with a value' },
              baseRoute: 'some/base/route'
            };

            const client = new Client({ espnS2 });
            const axiosConfig = client._buildAxiosConfig(passedConfig);
            expect(axiosConfig).toEqual(passedConfig);
          });
        });
      });

      describe('when espnS2 is not set on the instance', () => {
        describe('when SWID is set on the instance', () => {
          test('returns the passed axiosConfig', () => {
            const SWID = 'some_swid';
            const passedConfig = {
              headers: { something: 'with a value' },
              baseRoute: 'some/base/route'
            };

            const client = new Client({ SWID });
            const axiosConfig = client._buildAxiosConfig(passedConfig);
            expect(axiosConfig).toEqual(passedConfig);
          });
        });

        describe('when SWID is not set on the instance', () => {
          test('returns the passed axiosConfig', () => {
            const passedConfig = {
              headers: { something: 'with a value' },
              baseRoute: 'some/base/route'
            };

            const client = new Client();
            const axiosConfig = client._buildAxiosConfig(passedConfig);
            expect(axiosConfig).toEqual(passedConfig);
          });
        });
      });
    });

    describe('setCookies', () => {
      describe('when espnS2 is set on the instance', () => {
        describe('when SWID is set on the instance', () => {
          test('sets cookies on the instance', () => {
            const espnS2 = 'some_espn_s2';
            const SWID = 'some_swid';

            const client = new Client();
            client.setCookies({ espnS2, SWID });

            expect(client.espnS2).toBe(espnS2);
            expect(client.SWID).toBe(SWID);
          });
        });

        describe('when SWID is not set on the instance', () => {
          test('does not set cookies on the instance', () => {
            const espnS2 = 'some_espn_s2';

            const client = new Client();
            client.setCookies({ espnS2 });

            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });
      });

      describe('when espnS2 is not set on the instance', () => {
        describe('when SWID is set on the instance', () => {
          test('does not set cookies on the instance', () => {
            const SWID = 'some_swid';

            const client = new Client();
            client.setCookies({ SWID });

            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });

        describe('when SWID is not set on the instance', () => {
          test('does not set cookies on the instance', () => {
            const client = new Client();
            client.setCookies({});

            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });
      });
    });

    describe('getBoxscoreForWeek', () => {
      let client;
      let leagueId;
      let matchupPeriodId;
      let scoringPeriodId;
      let seasonId;

      beforeEach(() => {
        leagueId = 213213;
        matchupPeriodId = 2;
        scoringPeriodId = 3;
        seasonId = 2018;

        client = new Client({ leagueId });

        jest.spyOn(axios, 'get').mockImplementation();
      });

      test('calls axios.get with the correct params', () => {
        const routeBase = `${seasonId}/segments/0/leagues/${leagueId}`;
        const routeParams = `?view=mMatchup&view=mMatchupScore&scoringPeriodId=${scoringPeriodId}`;
        const route = `${routeBase}${routeParams}`;

        const config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);
        axios.get.mockReturnValue(q());

        client.getBoxscoreForWeek({ seasonId, matchupPeriodId, scoringPeriodId });
        expect(axios.get).toBeCalledWith(route, config);
      });

      describe('before the promise resolves', () => {
        test('does not invoke callback', () => {
          jest.spyOn(Boxscore, 'buildFromServer').mockImplementation();
          axios.get.mockReturnValue(q());

          client.getBoxscoreForWeek({ seasonId, matchupPeriodId, scoringPeriodId });
          expect(Boxscore.buildFromServer).not.toBeCalled();
        });
      });

      describe('after the promise resolves', () => {
        test('maps response data into Boxscores', async () => {
          const response = {
            data: {
              schedule: [{
                matchupPeriodId,
                home: { teamId: 2 },
                away: { teamId: 3 }
              }, {
                matchupPeriodId,
                home: { teamId: 5 },
                away: { teamId: 6 }
              }, {
                matchupPeriodId: matchupPeriodId + 1,
                home: { teamId: 6 },
                away: { teamId: 2 }
              }]
            }
          };

          const promise = q(response);
          axios.get.mockReturnValue(promise);

          const boxscores = await client.getBoxscoreForWeek({
            seasonId, matchupPeriodId, scoringPeriodId
          });

          expect.hasAssertions();
          expect(boxscores.length).toBe(2);
          _.forEach(boxscores, (boxscore, index) => {
            expect(boxscore).toBeInstanceOf(Boxscore);
            expect(boxscore.homeTeamId).toBe(response.data.schedule[index].home.teamId);
            expect(boxscore.awayTeamId).toBe(response.data.schedule[index].away.teamId);
          });
        });
      });
    });

    describe('getFreeAgents', () => {
      let client;
      let leagueId;
      let scoringPeriodId;
      let seasonId;

      beforeEach(() => {
        leagueId = 213213;
        scoringPeriodId = 3;
        seasonId = 2018;

        client = new Client({ leagueId });

        jest.spyOn(axios, 'get').mockImplementation();
      });

      test('calls axios.get with the correct params', () => {
        const routeBase = `${seasonId}/segments/0/leagues/${leagueId}`;
        const routeParams = `?scoringPeriodId=${scoringPeriodId}&view=kona_player_info`;
        const route = `${routeBase}${routeParams}`;

        const config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);
        axios.get.mockReturnValue(q());

        client.getFreeAgents({ seasonId, scoringPeriodId });
        expect(axios.get).toBeCalledWith(route, config);
      });

      describe('before the promise resolves', () => {
        test('does not invoke callback', () => {
          jest.spyOn(FreeAgentPlayer, 'buildFromServer').mockImplementation();
          axios.get.mockReturnValue(q());

          client.getFreeAgents({ seasonId, scoringPeriodId });
          expect(FreeAgentPlayer.buildFromServer).not.toBeCalled();
        });
      });

      describe('after the promise resolves', () => {
        test('maps response data into FreeAgentPlayers', async () => {
          const response = {
            data: {
              players: [{
                player: {
                  firstName: 'Test',
                  lastName: 'McTestFace',
                  stats: [{
                    seasonId,
                    statSourceId: 1,
                    statSplitTypeId: 0,
                    stats: [{
                      23: 2341,
                      24: 234,
                      25: 123
                    }]
                  }]
                }
              }, {
                player: {
                  firstName: 'Stable',
                  lastName: 'Genius',
                  stats: [{
                    seasonId,
                    statSourceId: 1,
                    statSplitTypeId: 0,
                    stats: [{
                      23: 32,
                      24: 23124,
                      25: 0
                    }]
                  }]
                }
              }]
            }
          };

          const promise = q(response);
          axios.get.mockReturnValue(promise);

          const freeAgents = await client.getFreeAgents({ seasonId, scoringPeriodId });

          expect.hasAssertions();
          expect(freeAgents.length).toBe(2);
          _.forEach(freeAgents, (freeAgent, index) => {
            expect(freeAgent).toBeInstanceOf(FreeAgentPlayer);
            expect(freeAgent.player.firstName).toBe(response.data.players[index].player.firstName);
            expect(freeAgent.player.lastName).toBe(response.data.players[index].player.lastName);
          });
        });
      });
    });

    describe('getTeamsAtWeek', () => {
      let client;
      let leagueId;
      let scoringPeriodId;
      let seasonId;

      beforeEach(() => {
        leagueId = 213213;
        scoringPeriodId = 3;
        seasonId = 2018;

        client = new Client({ leagueId });

        jest.spyOn(axios, 'get').mockImplementation();
      });

      test('calls axios.get with the correct params', () => {
        const routeBase = `${seasonId}/segments/0/leagues/${leagueId}`;
        const routeParams = `?scoringPeriodId=${scoringPeriodId}&view=mRoster&view=mTeam`;
        const route = `${routeBase}${routeParams}`;

        const config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);
        axios.get.mockReturnValue(q());

        client.getTeamsAtWeek({ seasonId, scoringPeriodId });
        expect(axios.get).toBeCalledWith(route, config);
      });

      describe('before the promise resolves', () => {
        test('does not invoke callback', () => {
          jest.spyOn(Team, 'buildFromServer').mockImplementation();
          axios.get.mockReturnValue(q());

          client.getTeamsAtWeek({ seasonId, scoringPeriodId });
          expect(Team.buildFromServer).not.toBeCalled();
        });
      });

      describe('after the promise resolves', () => {
        test('maps response data into Teams', async () => {
          const response = {
            data: {
              teams: [{
                abbrev: 'SWAG',
                location: 'First ',
                nickname: 'Last',
                record: {
                  overall: {
                    wins: 3,
                    losses: 11
                  }
                },
                roster: {
                  entries: [{
                    playerPoolEntry: {
                      firstName: 'Joe',
                      lastName: 'Montana'
                    }
                  }]
                }
              }, {
                abbrev: 'JS',
                location: 'First ',
                nickname: 'Last',
                record: {
                  overall: {
                    wins: 5,
                    losses: 11
                  }
                },
                roster: {
                  entries: [{
                    playerPoolEntry: {
                      firstName: 'Joe',
                      lastName: 'Smith'
                    }
                  }]
                }
              }, {
                abbrev: 'SWAG',
                location: 'First ',
                nickname: 'Last',
                record: {
                  overall: {
                    wins: 11,
                    losses: 8
                  }
                },
                roster: {
                  entries: [{
                    playerPoolEntry: {
                      firstName: 'Joe',
                      lastName: 'Brown'
                    }
                  }]
                }
              }]
            }
          };

          const promise = q(response);
          axios.get.mockReturnValue(promise);

          const teams = await client.getTeamsAtWeek({ seasonId, scoringPeriodId });

          expect.hasAssertions();
          expect(teams.length).toBe(3);
          _.forEach(teams, (team, index) => {
            expect(team).toBeInstanceOf(Team);
            expect(team.abbreviation).toBe(response.data.teams[index].abbrev);

            expect(team.wins).toBe(response.data.teams[index].record.overall.wins);
            expect(team.losses).toBe(response.data.teams[index].record.overall.losses);

            expect(team.roster).toEqual(expect.any(Array));
            expect(team.roster[0]).toBeInstanceOf(Player);
            expect(team.roster[0].firstName).toBe(
              response.data.teams[index].roster.entries[0].playerPoolEntry.firstName
            );
          });
        });
      });
    });
  });
});
