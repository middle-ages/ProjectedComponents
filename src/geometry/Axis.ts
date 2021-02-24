import { curry2 } from 'fp-ts-std/Function';
import { eqString } from 'fp-ts/lib/Eq';

export type TwoDAxis = 'x' | 'y';
export type ThreeDAxis = 'x' | 'y' | 'z';
export type TwoDRecord<T> = Record<TwoDAxis, T>;
export type ThreeDRecord<T> = Record<ThreeDAxis, T>;

export type Angle3 = Partial<ThreeDRecord<number>>;

export const Axis = {
  isX: curry2(eqString.equals)('x'),
  isY: curry2(eqString.equals)('y'),
  isZ: curry2(eqString.equals)('z'),
  match: (axis: ThreeDAxis) => <T>(x: T, y: T, z: T): T =>
    axis === 'x' ? x : axis === 'y' ? y : z,
} as const;
