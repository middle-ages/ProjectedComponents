import { flip } from 'fp-ts-std/Function';
import { flow, pipe, tupled } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { Style, StyleKey } from 'src/css';
import { cleanStyles } from 'src/css/util';
import { mergeObjectsT, Optional, split, unaryObject } from 'src/util';
import { style } from 'typestyle';

const mergeEntry = (o1: Style, o2: Style) => <K extends StyleKey>(
  k: K,
): Style => {
  const [v1, v2] = [o1[k], o2[k]],
    obj = flip(unaryObject)(k);

  return v1 === undefined
    ? v2 === undefined
      ? {}
      : obj(`${v2}`) // -v₁ +v₂
    : v2 === undefined
    ? obj(`${v1}`) // +v₁ -v₂
    : obj([v1, v2].join(k === 'transform' ? ' ' : ','));
};

const mergeKeys = ['background', 'boxShadow', 'transform'] as const;

/**
 * Merge 2 styles paying special attention to lossless merging of values that
 * can be stacked, like `background` and `transform`
 *
 * @param s1
 * @param s2
 * @returns merged style
 *
 * #### Limitations
 *
 * 1. Overrides and information loss is implicit for properties not merged.
 * E.g.: if `display` is present in both styles, the 1st is silently discarded.
 * Most of the time this is desired behavior
 * 1. Sometimes you actually want override behavior on properties that merge
 */
export const mergeCssPair = <S1 extends Style, S2 extends Style>(
  s1: S1,
  s2: S2,
): Style => {
  const [[toMerge1, noMerge1], [toMerge2, noMerge2]] = pipe(
    [s1, s2],
    pipe(mergeKeys, split, RA.map),
  );
  return {
    ...noMerge1,
    ...noMerge2,
    ...pipe(
      mergeKeys,
      flow(mergeEntry, RA.map)(toMerge1, toMerge2),
      mergeObjectsT,
    ),
  };
};

/**
 * Like mergeCssPair but takes N styles and filters `false` & `undefined` from
 * style list before merging
 */
export const mergeCss = (...styles: Optional<Style>[]): Style =>
  pipe(styles, cleanStyles, RA.reduce({}, mergeCssPair));

/**
 * Like mergeCss but returns the generated class name instead of the merged
 * style
 */
export const mergeStyles = (...styles: Optional<Style>[]): string =>
  flow(tupled(mergeCss), style)(styles);
