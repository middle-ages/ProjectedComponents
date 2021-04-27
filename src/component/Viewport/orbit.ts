import { flow, pipe } from 'fp-ts/lib/function';
import { CameraKey, cameraKeyAngle } from 'src/component/Viewport/camera';
import { rotate } from 'src/css';
import { Angle3, invDeg } from 'src/geometry';
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
    [key]:
      value === undefined ? 0 : orbit.includes(key) ? invDeg(value) : value,
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

/**
 * Generate an animation name from a camera angle and an orbit
 *
 * @param from a name of a camera angle
 * @returns a function from `Orbit` to the string animation name generated
 *
 * Example:
 * ```
 * import { animation, orbitAnimation } from 'projected-components';
 *
 * const camera    = 'front';                       // front camera angle
 * const orbit     = 'yz';                          // rotate on YZ axes
 * const periodSec = 2;                             // 1 turn / 2 seconds
 * const keyframes = orbitAnimation(camera)(orbit);
 * const style     = animation(keyframes)(periodSec)
 * ```
 */
export const orbitAnimation: OrbitAnimation = flow(cameraKeyAngle, orbitFrames);
