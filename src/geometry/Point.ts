import { Vec3 } from 'src/geometry/Axis';
import { split } from 'src/util';

export type Point = Partial<Vec3<number | string>>;

export const hasDefined = ({ x, y, z }: Point) =>
    x !== undefined || y !== undefined || z !== undefined,
  splitPoint = split(['x', 'y', 'z']);
