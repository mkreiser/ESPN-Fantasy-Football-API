import ApiModel from '../api-model/api-model.js';
import Team from './team.js';

import { localObject, serverResponse } from './team.stubs.js';

describe('Team', () => {
  let team;

  beforeEach(() => {
    team = new Team();
  });

  afterEach(() => {
    team = null;
  });

  test('extends ApiModel', () => {
    expect(team).toBeInstanceOf(ApiModel);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      team = Team.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      team = Team.buildFromLocal(localObject);
    });

    test('parses data correctly', () => {
      expect(team).toMatchSnapshot();
    });
  });
});
