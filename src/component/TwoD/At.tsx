import { FC } from 'react';
import { Styled } from 'src/component/types';
import {
  borderCss,
  BorderDef,
  EdgeDef,
  OmitAt,
  Style,
  translate,
} from 'src/css';
import { hasDefined, Point, splitPoint } from 'src/geometry';
import { style } from 'typestyle';

/**
 * The props type for components that have a:
 * 1. List of styles
 * 1. 3D coordinates
 * 1. A border on the edges defined by `borderEdges`
 */
export type At<S extends Style = Style> = Styled<OmitAt<S>> & Point & BorderDef;

/**
 * Same as `At`, except the border, if existing, is on _all_ sides.
 * `BorderedAt<S> ≡ Omit<At<S>, 'borderEdges'>`
 */
export type BorderedAt<S extends Style = Style> = Styled<OmitAt<S>> &
  Point &
  EdgeDef;

/**
 * A Component placed at some `Point` with some `BorderDef`.
 *
 * Border:
 * @param borderWidth
 * @param borderStyle
 * @param borderColor
 *
 * Position:
 * @param x
 * @param y
 * @param z
 */
export const At: FC<At> = ({ styles = [], children, ...props }) => {
  const [point, borderDef] = splitPoint(props);

  return (
    <div
      className={style(
        hasDefined(point) && { transform: translate(point) },
        borderCss(borderDef),
        ...styles,
      )}
    >
      {children}
    </div>
  );
};
