import { FC } from 'react';
import {
  BorderBox,
  mergeDefaultBorderBox,
} from 'src/component/ThreeD/Box/BorderBox';
import { boxThemeStyle } from 'src/component/ThreeD/Box/colors';
import { FaceKey, FaceKey3D } from 'src/component/ThreeD/Box/types';
import { allBordersCss, cssOf, px, rotateBy, Style, translate } from 'src/css';
import { Axis, ThreeDAxis } from 'src/geometry';
import { style } from 'typestyle';

type Transforms = [ThreeDAxis, 'top' | 'left'] | [ThreeDAxis];

const Transforms: Record<FaceKey3D, Transforms> = {
    back: ['z'],
    top: ['x'],
    bottom: ['x', 'top'],
    left: ['y'],
    right: ['y', 'left'],
  },
  defaultFaceStyle = cssOf('absolute', 'leftTopOrigin');

const layout = (depth: number, borderWidth: number) => (
  face: FaceKey3D,
): Style => {
  const [[axis, shift], pad] = [Transforms[face], depth + 2 * borderWidth],
    byAxis = (flag: boolean) => (flag ? px(pad) : '100%');

  return {
    transform: [
      translate({ z: px(-1 * pad) }),
      rotateBy(axis)(90 * Axis.match(axis)(1, -1, 0)),
    ].join(' '),

    ...{ width: byAxis(Axis.isY(axis)), height: byAxis(Axis.isX(axis)) },
    ...(shift !== undefined ? { [shift]: '100%' } : {}),
  };
};

export const faceStyle = ({ addBg = false, face, ...borderBox }: Face) => {
  const {
    depth,
    boxThemeKey,
    borderWidth,
    opacity,
    ...borderDef
  } = mergeDefaultBorderBox(borderBox);

  return style(
    addBg && boxThemeStyle(boxThemeKey, face),
    opacity !== undefined && { opacity },
    allBordersCss({ borderWidth, ...borderDef }),
    ...(face !== 'front'
      ? [defaultFaceStyle, layout(depth, borderWidth)(face)]
      : []),
  );
};

interface Face extends BorderBox {
  face: FaceKey;
  addBg?: boolean;
}

/**
 * One of the six faces of a box
 *
 * Face style
 * @param depth Box size on Z-axis in pixel. The box will be drawn so that
 * the back face will appear to be extruded `depth` pixels to the back
 * @param boxThemeKey a key from the box themes dictionary. Sets the face
 * color scheme. Default is `basic colors`
 * @param opacity
 * @param addBg If true, we add background color from the box theme to the
 * face. Default is false
 *
 * Wireframe line style
 * @param borderColor
 * @param borderWidth
 * @param borderStyle
 */
export const Face: FC<Face> = ({ children, ...props }) => (
  <div className={faceStyle(props)}>{children}</div>
);
