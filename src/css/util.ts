import { Optional } from 'src/util/types';
import { Style } from 'src/css/types';
import { style } from 'typestyle';

export const ucFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const pxValue = (v: number | undefined): string => (v ?? 0) + 'px',
  maybePxValue = (v: number | string | undefined): string =>
    v === undefined ? '0px' : isNaN(v as any) ? (v as string) : v + 'px',
  pxRecord = <K extends string>(v: Record<K, number>) =>
    Object.fromEntries(
      Object.entries(v).map(([k, v]) => [k, v + 'px']),
    ) as Record<K, string>;

export const emValue = (v: number | undefined): string => (v ?? 0) + 'em';

/** Curried version of `typestyle/style`. */
export const defaultCss = (...head: Optional<Style>[]) => (
  ...tail: Optional<Style>[]
): string => style(...head, ...tail);
