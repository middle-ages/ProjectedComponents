import { ThreeDRecord } from 'src/geometry/Axis';
import { defined, split } from 'src/util';

export type Point = Partial<ThreeDRecord<number | string>>;

export const hasDefined = ({ x, y, z }: Point) =>
    defined(x) || defined(y) || defined(z),
  splitPoint = split(['x', 'y', 'z']);
