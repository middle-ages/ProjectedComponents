import { pipe } from 'fp-ts/lib/function';
import { mergeDefined, mergeObjectsT, split, typedKeys } from 'src/util/Object';

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
      pipe(
        { a: 1 },
        mergeDefined({ a: undefined } as Partial<{ a: number }>),
        expect,
      ).toEqual({ a: 1 }));
    test('2nd defined', () =>
      pipe({ a: 2 }, mergeDefined({ a: 1 }), expect).toEqual({ a: 2 }));
  });

  describe('typedKeys', () => {
    const obj = { a: 'a' as string, b: 'b' as string, c: 1, d: true } as const;
    test('2 entries of same type', () =>
      pipe(obj, typedKeys, expect).toEqual(['a', 'b', 'c', 'd']));
  });

  describe('mergeObjectT', () => {
    const o1 = { a: 1, b: 2 } as const,
      o2 = { a: 3, c: 4 } as const;
    test('some disjoint some override entries', () =>
      pipe([o1, o2], mergeObjectsT, expect).toEqual({ a: 3, b: 2, c: 4 }));
  });
});
