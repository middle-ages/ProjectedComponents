export const square = <T>(x: T): readonly [T, T] => [x, x] as const;
