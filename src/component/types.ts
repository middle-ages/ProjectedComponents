import { FunctionComponent } from 'react';
import { Style } from 'src/css';
import { Point } from 'src/geometry';
import { Optional } from 'src/util';

/** The type of component that has a list of stylesheet rules. The list will be
 * filtered from any `undefined` or `false` values before being merged into a
 * single rule that will be added to some DOM element
 */
export interface Styled<S extends Style = Style> {
  styles?: Optional<S>[];
}

export type StyledPoint<S extends Style = Style> = Styled<
  Omit<S, 'transform'>
> &
  Point;
