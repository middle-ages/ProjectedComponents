import { flow } from 'fp-ts/lib/function';
import { Styled } from 'src/component/Styled';
import {
  borderCss,
  BorderDef,
  css,
  OmitBase,
  Style,
  transform,
  translate,
} from 'src/css';
import { hasDefined, Point, splitPoint } from 'src/geometry';
import { Optional } from 'src/util';

/**
 * Props for components that have:
 * 1. A list of styles of type `Optional<S>`
 * 1. 3D coordinates where they will be placed when rendered
 * 1. A border on the edges defined by `borderEdges`
 * 1. A boolean property `is3D`. If true, children can be transformed on the Z
 * dimension. Sets CSS `transform-style` to `preserve-3d`
 *
 * Owns the style keys:
 * 1. `border`, `border-(top|bottom|left|right)`,
 * `border-(top|bottom|left|right)-(style|width|color)`
 * 1. `transform-style`
 */
export interface Base<S extends Style = Style>
  extends Styled<OmitBase<S>>,
    Point,
    BorderDef {
  is3D?: boolean;
}

/** Same as `Base`, except the border, if existing, is on _all_ sides */
export type BorderBase<S extends Style = Style> = Omit<Base<S>, 'borderEdges'>;

/** Convert `Base` props into the correct styles */
export const baseStyles = ({
  is3D,
  ...props
}: Omit<Base, 'styles'>): Optional<Style>[] => {
  const [point, borderDef] = splitPoint(props);

  return [
    hasDefined(point) && flow(translate, transform)(point),
    borderCss(borderDef),
    is3D && css.threeD,
  ];
};
