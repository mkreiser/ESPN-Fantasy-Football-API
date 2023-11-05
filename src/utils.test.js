import {
  flattenObject,
  flattenObjectSansNumericKeys
} from './utils';

describe('flattenObject', () => {
  describe('when there is a nested object with numerical keys', () => {
    test('flattens the object', () => {
      const data = {
        a: {
          b: {
            '1': 2
          }
        }
      };

      const result = flattenObject(data);
      expect(result).toStrictEqual({ '1': 2 });
    });
  });

  describe('when there is a nested object without numerical keys', () => {
    test('flattens the object', () => {
      const data = {
        a: {
          b: {
            c: 2
          }
        }
      };

      const result = flattenObject(data);
      expect(result).toStrictEqual({ c: 2 });
    });
  });

  describe('when there is an array as a value', () => {
    test('simply sets the array and does not flatten any array entries', () => {
      const data = {
        array: [{ a: 1 }]
      };

      const result = flattenObject(data);
      expect(result).toStrictEqual(data);
    });
  });
});


describe('flattenObjectSansNumericKeys', () => {
  describe('when there is a nested object with numerical keys', () => {
    test('flattens the object up to the object with numerical keys', () => {
      const data = {
        a: {
          b: {
            '1': 2
          }
        }
      };

      const result = flattenObjectSansNumericKeys(data);
      expect(result).toStrictEqual({
        b: {
          '1': 2
        }
      });
    });
  });

  describe('when there is a nested object without numerical keys', () => {
    test('flattens the object', () => {
      const data = {
        a: {
          b: {
            c: 2
          }
        }
      };

      const result = flattenObjectSansNumericKeys(data);
      expect(result).toStrictEqual({ c: 2 });
    });
  });

  describe('when there is an array as a value', () => {
    test('simply sets the array and does not flatten any array entries', () => {
      const data = {
        array: [{ a: 1 }]
      };

      const result = flattenObjectSansNumericKeys(data);
      expect(result).toStrictEqual(data);
    });
  });
});
