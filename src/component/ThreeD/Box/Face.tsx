import * as RA from 'fp-ts/ReadonlyArray';
import { FC } from 'react';
import { BoxThemeKey, boxThemeStyle } from 'src/component/ThreeD/Box/colors';
import { Face, ThreeDFace } from 'src/component/ThreeD/Box/types';
import {
  allBordersCss,
  cssOf,
  defaultEdgeDef,
  pxValue,
  rotateBy,
  Style,
  TotalEdgeDef,
  translate,
} from 'src/css';
import { Axis, ThreeDAxis } from 'src/geometry';
import { defined, mergeDefined, split, ToRequired } from 'src/util';
import { style } from 'typestyle';

export interface TotalBoxDef {
  depth: number;
  boxThemeKey: BoxThemeKey;
  opacity: number;
}

export type BoxDef = Partial<TotalBoxDef>;
export type BoxDefKey = keyof TotalBoxDef;

export type TotalBoxFace = TotalBoxDef & TotalEdgeDef;
export type BoxFace = Partial<TotalBoxFace>;
export type BoxFaceKey = keyof TotalBoxFace;

export const defaultBoxDef: TotalBoxDef = {
    depth: 18,
    boxThemeKey: 'primary',
    opacity: 1,
  },
  boxDefKeys = Object.keys(defaultBoxDef) as BoxDefKey[],
  mergeDefaultBoxDef: ToRequired<BoxDef> = mergeDefined(defaultBoxDef),
  splitBoxDef = split(boxDefKeys);

export const defaultBoxFace: TotalBoxFace = {
    ...defaultBoxDef,
    ...defaultEdgeDef,
  },
  boxFaceKeys = Object.keys(defaultBoxFace) as BoxFaceKey[],
  mergeDefaultBoxFace: ToRequired<BoxFace> = mergeDefined(defaultBoxFace);

const faceTransforms: Record<
  ThreeDFace,
  [ThreeDAxis, 'top' | 'left'] | [ThreeDAxis]
> = {
  back: ['z'],
  top: ['x'],
  bottom: ['x', 'top'],
  left: ['y'],
  right: ['y', 'left'],
};

const layout = (depth: number, borderWidth: number) => (
  face: ThreeDFace,
): Style => {
  const [axis, shift] = faceTransforms[face],
    borderPad = 2 * borderWidth,
    [depthPx, borderPadPx] = RA.ap([depth, borderPad])([pxValue]),
    z = translate({ z: -1 * (depth + borderPad) }) + ' ',
    allButBorders = `calc(100% - ${borderPadPx})`;

  return {
    ...cssOf('absolute', 'topLeftOrigin'),

    ...{ width: Axis.isY(axis) ? depthPx : allButBorders },
    ...{ height: Axis.isX(axis) ? depthPx : allButBorders },

    transform: z + rotateBy(axis)(90 * Axis.match(axis)(1, -1, 0)),

    ...(defined(shift) ? { [shift]: '100%' } : {}),
  };
};

export const faceStyle = ({ face, ...args }: BoxFace & { face: Face }) => {
  const {
      depth,
      boxThemeKey,
      borderWidth,
      opacity,
      ...borderDef
    } = mergeDefaultBoxFace(args),
    styles = [
      allBordersCss({ borderWidth, ...borderDef }),
      defined(opacity) && { opacity },
      ...(face !== 'front' ? [layout(depth, borderWidth)(face)] : []),
    ];

  return style(boxThemeStyle(boxThemeKey, face), ...styles);
};

/**
 * One of the six faces of a box.
 *
 * Face style
 * @param depth - Box size on Z-axis in pixel. The box will be drawn so that
 * the back face will appear to be extruded `depth` pixels to the back
 * @param boxThemeKey - a key from the box themes dictionary. Sets the face
 * color scheme. Default is `basic colors`
 *
 * Wireframe line style
 * @param borderColor
 * @param borderWidth
 * @param borderStyle
 */
export const BoxFace: FC<BoxFace & { face: Face }> = ({
  children,
  ...props
}) => <div className={faceStyle(props)}>{children}</div>;
