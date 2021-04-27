import { flow, pipe } from 'fp-ts/lib/function';
import { css, rotate, Style } from 'src/css';
import { Angle3, ZeroAngle3 } from 'src/geometry';
import { mergeDefined } from 'src/util';

interface Camera {
  angle?: Angle3;
}

type Cameras = typeof cameras;

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

const camera = (key: CameraKey): Camera => cameras[key],
  cameraAngle = (camera?: Camera): Angle3 =>
    mergeDefined(ZeroAngle3)(camera?.angle ?? {});

export type CameraKey = keyof Cameras;

export const cameraKeyAngle = flow(camera, cameraAngle),
  cameraStyle = (key: CameraKey): Style => ({
    ...css.centerOrigin,
    transform: pipe(key, cameraKeyAngle, rotate),
  });
