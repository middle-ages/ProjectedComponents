import { css } from 'src/css/lib';
import { Style } from 'src/css/types';
import { emValue, maybePxValue, pxRecord, pxValue } from 'src/css/util';
import { Color } from 'src/css/valueTypes';
import { Angle3, Point, ThreeDAxis } from 'src/geometry';
import { defined, EmptyRecord } from 'src/util';

export const add100px = (d: number) => `calc(100% + ${pxValue(d)})`;

export const translate = ({ x, y, z }: Point): string =>
    [
      ['X', x],
      ['Y', y],
      ['Z', z],
    ]
      .map(([k, v]) => (defined(v) ? `translate${k}(${maybePxValue(v)})` : ''))
      .join(' '),
  rotate = ({ x, y, z }: Angle3): string =>
    [
      ['X', x],
      ['Y', y],
      ['Z', z],
    ]
      .map(([k, v]) => (defined(v) ? `rotate${k}(${v ?? 0}deg)` : ''))
      .join(' '),
  rotateX = (angle: number) => rotate({ x: angle }),
  rotateY = (angle: number) => rotate({ y: angle }),
  rotateZ = (angle: number) => rotate({ z: angle }),
  rotateBy = (axis: ThreeDAxis) => (angle: number) => rotate({ [axis]: angle }),
  invAngle = (deg: number): number =>
    deg % 360 === 0 ? Math.abs(360 - deg) : (deg - Math.sign(deg) * 360) % 360,
  translateLeft = (shift: number) => ({ x: pxValue(-1 * shift) } as const),
  translateRight = (shift: number) => ({ x: pxValue(shift) } as const);

export const flexGap = (
    gap: number | string | undefined,
  ): EmptyRecord | { gap: string & {} } =>
    defined(gap)
      ? {
          gap: `${maybePxValue(gap)}`,
        }
      : {},
  hFlexGapPx = (gap: number | string | undefined): Style => ({
    ...flexGap(gap),
    ...css.hFlex,
  }),
  vFlexGapPx = (gap: number | string | undefined): Style => ({
    ...flexGap(gap),
    ...css.vFlex,
  }),
  hPadding = (pad: number | string) =>
    ({
      paddingLeft: maybePxValue(pad),
      paddingRight: maybePxValue(pad),
    } as const),
  marginPx = (margin: number): Style => ({ margin: pxValue(margin) }),
  paddingPx = (pad: number): Style => ({ padding: pxValue(pad) });

export const wPx = (width: number): Style => pxRecord({ width }),
  hPx = (height: number): Style => pxRecord({ height }),
  whPx = (width: number, height: number): Style =>
    pxRecord({
      width,
      height,
    });

export const backgroundColor = (color: Color): Style => ({ background: color }),
  foregroundColor = (color: Color): Style => ({ color: color }),
  emLineHeight = (h: number) =>
    ({
      lineHeight: emValue(h),
      height: emValue(h),
    } as const),
  topLeftBorderRadius = (width: number): Style => ({
    borderTopLeftRadius: pxValue(width),
  }),
  topRightBorderRadius = (width: number): Style => ({
    borderTopRightRadius: pxValue(width),
  }),
  animation = (animationName: string) => (periodSec: number): Style => ({
    animationName,
    animationDuration: `${periodSec}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  });
