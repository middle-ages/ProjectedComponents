import { NestedCSSProperties } from 'typestyle/lib/types';

/** A stylesheet rule, possibly nested */
export type Style = NestedCSSProperties;

/** A CSS key */
export type StyleKey = keyof Style & string;

export interface TransformStyle {
  transform: string;
}
