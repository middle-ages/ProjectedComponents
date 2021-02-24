import { flow, pipe } from 'fp-ts/lib/function';
import { css, rotate, Style } from 'src/css';
import { Angle3 } from 'src/geometry';
import { mergeDefined } from 'src/util';

interface Camera {
  angle?: Angle3;
}

export type Cameras = typeof cameras;
export type CameraKey = keyof Cameras;

const cameras = {
  front: {},
  back: { angle: { y: -180 } },
  top: { angle: { x: -90 } },
  bottom: { angle: { x: 90 } },
  left: { angle: { y: 90 } },
  right: { angle: { y: -90 } },

  iso: { angle: { x: -30, y: 30 } },
  invIso: { angle: { x: 30, y: -30 } },
  iso45: { angle: { x: -15, y: 45 } },
  invIso45: { angle: { x: 15, y: -45 } },

  frontTopLeft: { angle: { x: -45, y: 45 } },
  frontTopRight: { angle: { x: -45, y: -45 } },
  frontBottomLeft: { angle: { x: 45, y: 45 } },
  frontBottomRight: { angle: { x: 45, y: -45 } },
} as const;

export const cameraKeys = Object.keys(cameras) as CameraKey[];

const camera = (key: CameraKey): Camera => cameras[key],
  cameraAngle = (camera?: Camera): Angle3 =>
    mergeDefined({ x: 0, y: 0, z: 0 })(camera?.angle ?? {});

export const cameraKeyAngle = flow(camera, cameraAngle),
  cameraStyle = (key: CameraKey): Style => ({
    ...css.centerOrigin,
    transform: pipe(key, cameraKeyAngle, rotate),
  });
