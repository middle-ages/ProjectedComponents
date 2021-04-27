import { curry2 } from 'fp-ts-std/Function';
import { eqString } from 'fp-ts/lib/Eq';

export type TwoDAxis = 'x' | 'y';
export type ThreeDAxis = 'x' | 'y' | 'z';
export type Vec3<T = number> = Record<ThreeDAxis, T>;

export type Angle3 = Partial<Vec3>;

export const ThreeDAxis: ThreeDAxis[] = ['x', 'y', 'z'];

export const ZeroAngle3: Angle3 = { x: 0, y: 0, z: 0 };

const axisEq = curry2(eqString.equals),
  axisIs = { isX: axisEq('x'), isY: axisEq('y'), isZ: axisEq('z') };

export const Axis = {
  ...axisIs,
  match: (axis: ThreeDAxis) => <T>(x: T, y: T, z: T): T =>
    axis === 'x' ? x : axis === 'y' ? y : z,
} as const;

export const invDeg = (deg: number): number =>
  deg % 360 === 0 ? Math.abs(360 - deg) : (deg - Math.sign(deg) * 360) % 360;
