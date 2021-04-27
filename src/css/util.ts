import { flip } from 'fp-ts-std/Function';
import * as RA from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/lib/function';
import * as RE from 'fp-ts/Record';
import { tupled } from 'fp-ts/lib/function';
import { css, cssClasses, CssKey } from 'src/css/lib';
import { Style } from 'src/css/types';
import { mergeObjects, picks, pluck } from 'src/util';
import { Optional } from 'src/util/types';
import { classes, style } from 'typestyle';

export const ucFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// csx functions that suffix units (E.g. “em()”) returns types incompatible with
// TypeStyle NestedCssProperties
type AddUnit = (v: number) => string & {};
export const px: AddUnit = v => `${v.toFixed(3)}px`;
export const em: AddUnit = v => `${v.toFixed(1)}em`;

/** Project a numeric record into a record of CSS `px` values */
export const pxRecord = RE.map(px);
/** Project a numeric record into a record of CSS `em` values */
export const emRecord = RE.map(em);

/** Filter false and undefined values from a style list */
export const cleanStyles = (styles: Optional<Style>[]) =>
  styles.filter(x => x !== undefined && x !== false) as Style[];

/**
 * Convert a list of style keys from `src/css/lib:css` into a `Style`
 *
 * Example:
 * `se
 * ``
 * cssOf('relative', 'noWrap') ≡ {
 *   position:   relative,
 *   whitespace: noWrap,
 * }
 * ```
 */
export const cssOf = <K extends CssKey>(...keys: K[]): Style =>
  pipe(css, picks(...keys), Object.values, tupled(mergeObjects));

/**
 * Same as `cssOf` but returns a generated CSS class names instead of a
 * `Style`
 */
export const classOf = <K extends CssKey>(...keys: K[]): string =>
  pipe(keys, pipe(cssClasses, flip(pluck), RA.map), classes);

/**
 * Curried version of `typestyle/style`: takes two lists of styles and returns
 * a generated CSS class name. The lists may include `undefined` or `false`
 * values. They will be filtered.
 */
export const defaultCss = (...head: Optional<Style>[]) => (
  ...tail: Optional<Style>[]
): string => style(...head, ...tail);

/**
 * Same as `defaultCss` but returns a generated CSS class name instead of a
 * `Style`
 */
export const defaultClass = flow(cssOf, defaultCss);
