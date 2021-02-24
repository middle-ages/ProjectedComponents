import { mergeDefined, split } from 'src/util/Object';

describe('Object util', () => {
  describe('split', () => {
    test('basic', () =>
      expect(split(['a'])({ a: 1, b: 2 })).toEqual([{ a: 1 }, { b: 2 }]));
    test('1st bigger', () =>
      expect(split(['a', 'b'])({ a: 1, b: 2, c: 3 })).toEqual([
        { a: 1, b: 2 },
        { c: 3 },
      ]));
    test('no keys', () => expect(split([])({ a: 1 })).toEqual([{}, { a: 1 }]));
  });

  describe('mergeDefined', () => {
    test('2nd undef undef', () =>
      expect(mergeDefined({ a: 1 })({ a: undefined })).toEqual({ a: 1 }));
    test('2nd defined', () =>
      expect(mergeDefined({ a: 1 })({ a: 2 })).toEqual({ a: 2 }));
  });
});
