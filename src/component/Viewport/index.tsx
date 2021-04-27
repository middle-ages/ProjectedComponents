import { pipe } from 'fp-ts/lib/function';
import { FC } from 'react';
import { Scene } from 'src/component/Scene';
import { Styled } from 'src/component/Styled';
import { CameraKey, cameraStyle } from 'src/component/Viewport/camera';
import { Orbit, orbitAnimation } from 'src/component/Viewport/orbit';
import {
  animation,
  cssOf,
  defaultClass,
  GridConfig,
  scaleBy,
  transform,
} from 'src/css';
import { style } from 'typestyle';

export * from 'src/component/Viewport/camera';
export * from 'src/component/Viewport/orbit';

export interface Viewport extends Partial<GridConfig>, Styled {
  camera?: CameraKey;
  orbit?: Orbit;
  scale?: number;
  isOrbiting?: boolean;
  reverse?: boolean;
  periodSec?: number;
  perspective?: string;
}

const sceneCss = cssOf('threeD'),
  scaleDivCss = defaultClass('leftTopOrigin');

/**
 * A 3D scene and a camera for looking at it
 *
 * Add 3D components to the `Viewport` and they will be placed in the scene,
 * on an optional background grid, and projected as 2D at the given scale and
 * perspective. Set `isOrbiting` and the camera will rotate on the given axis
 * at the given speed.
 *
 * Viewport:
 * @param camera a camera key of the `CameraKey` type. Defines a 3D angle for
 * the initial camera placement. The isometric angle is default
 * @orbit an orbit for the camera rotation. Ignored unless `isOrbiting`. The
 * orbit is a selection of 1, 2 or 3 axes. E.g.: An orbit of 'xy' will rotate
 * the camera, at equal angular velocity, on both 𝔁 and 𝔂 axes
 * simultaneously. Default is `y`
 * @periodSec the camera completes one turn in `periodSec` seconds. Default is
 * 10 seconds
 * @isOrbiting if true, then the `orbit` and `periodSec` are applied - the
 * camera is rotated around the orbit in a constant rate. Default is `false`
 * @reverse if true, `animation-direction` is reversed. Default is `false`
 * @perspective perspective distance for the CSS `perspective` value. Default
 * is `120em`
 *
 * Scene background grid:
 * @param majorStep
 * @param color
 * @param bgColor
 * @param strokeWidth
 *
 */
export const Viewport: FC<Viewport> = ({
  camera = 'iso' as CameraKey,
  orbit = 'y',
  scale = 1,
  isOrbiting = false,
  reverse = false,
  periodSec = 10,
  perspective = '120em',
  styles = [],
  children,
  ...props
}) => (
  <div className={style(...styles)}>
    <div
      className={scaleDivCss(pipe(scale, scaleBy, transform), {
        perspective,
      })}
    >
      <Scene
        {...props}
        styles={[
          sceneCss,
          cameraStyle(camera),
          cssOf(isOrbiting ? 'play' : 'pause'),
          pipe(orbit, orbitAnimation(camera), animation)(periodSec),
          { animationDirection: reverse ? 'reverse' : 'normal' },
        ]}
      >
        {children}
      </Scene>
    </div>
  </div>
);
