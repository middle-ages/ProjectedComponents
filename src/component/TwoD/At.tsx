import { FC } from 'react';
import { Base, baseStyles } from 'src/component/Base';
import { mergeStyles } from 'src/css/merge';

/**
 * A Component placed at some `Point` with some `BorderDef`.
 *
 * Border:
 * @param borderWidth
 * @param borderStyle
 * @param borderColor
 * @param borderEdges
 *
 * Position:
 * @param x
 * @param y
 * @param z
 *
 * 3D:
 * @param is3D
 */
export const At: FC<Base> = ({ styles = [], children, ...props }) => (
  <div className={mergeStyles(...baseStyles(props), ...styles)}>{children}</div>
);
