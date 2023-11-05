import DraftPlayer from './draft-player.js';

describe('DraftPlayer', () => {
  describe('class methods', () => {
    describe('getIDParams', () => {
      const testReturnsUndefined = ({ playerId, seasonId }) => {
        test('returns undefined', () => {
          const params = { playerId, seasonId };
          expect(DraftPlayer.getIDParams(params)).toBeUndefined();
        });
      };

      describe('when called with no params', () => {
        test('returns undefined', () => {
          expect(DraftPlayer.getIDParams()).toBeUndefined();
        });
      });

      describe('when playerId is defined', () => {
        describe('when seasonId is defined', () => {
          test('returns a valid caching playerId', () => {
            const params = { playerId: 341243, seasonId: 2017 };

            const returnedCachingId = DraftPlayer.getIDParams(params);
            expect(returnedCachingId).toEqual(params);
          });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({ playerId: 341243 });
        });
      });

      describe('when playerId is undefined', () => {
        describe('when seasonId is defined', () => {
          testReturnsUndefined({ seasonId: 2017 });
        });

        describe('when seasonId is undefined', () => {
          testReturnsUndefined({});
        });
      });
    });
  });
});
