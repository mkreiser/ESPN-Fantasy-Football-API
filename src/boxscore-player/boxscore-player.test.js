import SlottedPlayer from '../slotted-player/slotted-player.js';

import BoxscorePlayer from './boxscore-player.js';

import { localObject, serverResponse } from './boxscore-player.stubs.js';

describe('BoxscorePlayer', () => {
  test('extends SlottedPlayer', () => {
    const instance = new BoxscorePlayer();
    expect(instance).toBeInstanceOf(SlottedPlayer);
  });

  describe('when creating a team from a server response', () => {
    test('parses and assigns data correctly', () => {
      const instance = BoxscorePlayer.buildFromServer(serverResponse);
      expect(instance).toMatchSnapshot();
    });
  });

  describe('when creating a team locally', () => {
    test('parses and assigns data correctly', () => {
      const instance = new BoxscorePlayer(localObject);
      expect(instance).toMatchSnapshot();
    });
  });
});
