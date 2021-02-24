import { without } from 'fp-ts-std/Array';
import { reject } from 'fp-ts-std/Record';
import { eqString } from 'fp-ts/lib/Eq';
import { not, pipe } from 'fp-ts/lib/function';
import { defined } from 'src/util/Any';
import { EmptyRecord } from 'src/util/types';

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

export const mergeN = <T>(...objects: T[]): T => Object.assign({}, ...objects);

export const filterUndefValues = <T>(
  unfiltered: Record<string, T>,
): Record<string, T> => pipe(defined, not, reject)(unfiltered);

export const mergeDefined = <T extends Record<string, any>>(first: T) => (
  ...rest: Partial<T>[]
) => mergeN(...[first, ...rest].map(filterUndefValues)) as T;

export const isEmptyRecord = (x: Record<PropertyKey, any>): x is EmptyRecord =>
  !Object.keys(x).length;

export const split = <K extends string>(keys: K[]) => <
  T extends Partial<{ [P in K]: T[P] }>
>(
  o: T,
): [Partial<Pick<T, K>>, Omit<T, K>] => {
  const withKeys: Pick<T, K> = pipe(o, picks(...keys.filter(key => key in o))),
    restKeys = without(eqString)(keys as string[])(
      Object.keys(o),
    ) as (keyof Omit<T, K>)[],
    withRestKeys = pipe(o, picks(...restKeys));
  return [withKeys, withRestKeys];
};
