import { without } from 'fp-ts-std/Array';
import { reject } from 'fp-ts-std/Record';
import { pipe, tupled } from 'fp-ts/lib/function';
import { Eq as StringEq } from 'fp-ts/string';
import { ToRequired } from 'src/util/types';
import { U } from 'ts-toolbelt';

/** Pick a subset of an object by keys.
```
const picked: { a: number; b: string } = picks(
  'a',
  'b',
)({ a: 1, b: 'foo', c: /re/ });
```
*/

export const picks = <KS extends readonly PropertyKey[]>(...keys: KS) => <
  T extends { [K in KS[number]]: T[K] }
>(
  o: T,
): Pick<T, KS[number]> => {
  const res = {} as Pick<T, KS[number]>;
  keys.forEach((key: KS[number]) => {
    res[key] = o[key];
  });
  return res;
};

export const mergeObjects = <T>(...objects: readonly T[]): T =>
  Object.assign({}, ...objects);

/** Tupled version of `mergeObject` */
type MergeObjectsT = <T>(objects: readonly T[]) => T;
export const mergeObjectsT: MergeObjectsT = tupled(mergeObjects);

export const filterNonValues = <T>(
  unfiltered: Record<string, T>,
): Record<string, T> =>
  pipe(
    unfiltered,
    reject(x => x === undefined),
  );

export const mergeDefined = <T>(first: T) => (...rest: Partial<T>[]): T =>
  mergeObjects(...[first, ...rest].map(filterNonValues)) as T;

type Split<S extends T, T> = [Pick<S, keyof T>, Omit<S, keyof T>];
export const split = <K extends string>(keys: readonly K[]) => <
  T extends Partial<{ [P in K]: T[P] }>
>(
  o: T,
): [Pick<T, K>, Omit<T, K>] => {
  const withKeys: Pick<T, K> = pipe(o, picks(...keys.filter(key => key in o))),
    restKeys = without(StringEq)([...keys])(Object.keys(o)) as (keyof Omit<
      T,
      K
    >)[],
    withRestKeys = pipe(o, picks(...restKeys));
  return [withKeys, withRestKeys];
};

/** Tuple of keys of `T`
 *
 * Discards the value types of `T`. Example:
 * ```
 * type Obj = {x: string;y: string;z: number};
 * type Keys = KeyList<Obj>; // ['x', 'y', 'z']
 * ```
 */
export type KeyList<T> = U.ListOf<keyof T> & (keyof T)[];

export interface TypedKeys {
  <T>(o: T): KeyList<T>;
}

/**
 * Like `Object.keys`, but returns an ordered list of the key union members
 * instead of `string[]`. Useful only when `T` is an exact type.
 * ```
 * const keys: ['x', 'y', 'z'] = typedKeys({x: 1, y: 'foo', z: [3, 4]});
 * ```
 */
export const typedKeys: TypedKeys = o =>
  (Object.keys(o) as unknown) as KeyList<typeof o>;

/** Spread a total value of type `T` into some useful utilities
 *
 * Products 4 elements from a default member of `T`.
 *
 * @param defaultDef a default member of `T`
 * @returns 4-tuple of:
 * 1. A function that splits into two disjoint sets, any union with `T` into a
 * pair of `T`, and an object with all entries left over after picking out the
 * keys of `T`
 * 2. A function that merges defaults into missing/undefined entries of the
 * input. Results in a total `T`
 * 3. The default `T`. Useful when building defaults of composites of `T`
 * 4. The tuple of `T` keys, of the type `KeyList<T>`. Useful when building key
 * lists for composites of `T`
 */
export const defaultHelpers = <T>(
  defaultDef: Required<T>,
): [
  <S extends T>(o: S) => Split<S, T>,
  ToRequired<T>,
  Required<T>,
  KeyList<T>,
] => [
  pipe(defaultDef, typedKeys, split),
  mergeDefined(defaultDef),
  defaultDef,
  typedKeys(defaultDef),
];

export const pluck = <K extends string>(k: K) => <T extends { [P in K]: T[P] }>(
  o: T,
): T[K] => o[k];

/**
 * Curried create singleton record, value first
 *
 * @param v The value
 * @param k The key
 * @returns `{[k]: v}`
 */
export const unaryObject = <V>(v: V) => <K extends string>(k: K) =>
  ({ [k]: v } as Record<K, V>);
