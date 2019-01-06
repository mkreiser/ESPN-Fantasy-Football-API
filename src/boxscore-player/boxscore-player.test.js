import SlottedPlayer from '../slotted-player/slotted-player.js';

import BoxscorePlayer from './boxscore-player.js';

import { localObject, serverResponse } from './boxscore-player.stubs.js';

describe('BoxscorePlayer', () => {
  let boxscorePlayer;

  beforeEach(() => {
    boxscorePlayer = new BoxscorePlayer();
  });

  afterEach(() => {
    boxscorePlayer = null;
  });

  test('extends SlottedPlayer', () => {
    expect(boxscorePlayer).toBeInstanceOf(SlottedPlayer);
  });

  describe('attribute population from server response', () => {
    beforeEach(() => {
      boxscorePlayer = BoxscorePlayer.buildFromServer(serverResponse);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayer).toMatchSnapshot();
    });
  });

  describe('attribute population from local object', () => {
    beforeEach(() => {
      boxscorePlayer = new BoxscorePlayer(localObject);
    });

    test('parses data correctly', () => {
      expect(boxscorePlayer).toMatchSnapshot();
    });
  });
});
