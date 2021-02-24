import { flow, pipe } from 'fp-ts/lib/function';
import { CameraKey, cameraKeyAngle } from 'src/component/Viewport/camera';
import { invAngle, rotate } from 'src/css';
import { Angle3 } from 'src/geometry';
import { defined } from 'src/util';
import { keyframes } from 'typestyle';

export type Orbit = typeof Orbits[number];
export type OrbitAnimation = (cameraKey: CameraKey) => (orbit: Orbit) => string;

type OrthoOrbit = keyof Angle3;

export const OrthoOrbits: OrthoOrbit[] = ['x', 'y', 'z'],
  Orbits = [...OrthoOrbits, 'xy', 'xz', 'yz', 'xyz'] as const;

const invAngle3 = ({ x, y, z }: Angle3) => (orbit: Orbit): Angle3 => {
  const inverseOrbitKey = (
    key: 'x' | 'y' | 'z',
    value: number | undefined,
  ) => ({
    [key]: !defined(value) ? 0 : orbit.includes(key) ? invAngle(value) : value,
  });

  return {
    ...inverseOrbitKey('x', x),
    ...inverseOrbitKey('y', y),
    ...inverseOrbitKey('z', z),
  };
};

const orbitFrames = (from: Angle3) => (orbit: Orbit): string =>
  keyframes({
    from: { transform: rotate(from) },
    to: { transform: pipe(orbit, invAngle3(from), rotate) },
  });

/** Generate an animation name from an orbit and a camera angle. */
export const orbitAnimation: OrbitAnimation = flow(cameraKeyAngle, orbitFrames);
