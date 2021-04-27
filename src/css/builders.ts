import { multiply } from 'fp-ts-std/Number';
import { flow, pipe } from 'fp-ts/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { singleton } from 'fp-ts/Record';
import { css } from 'src/css/lib';
import { Style, StyleKey } from 'src/css/types';
import { emRecord, pxRecord } from 'src/css/util';
import { Color, Gap } from 'src/css/valueTypes';
import { Angle3, Point, ThreeDAxis } from 'src/geometry';
import { px } from './util';

const unaryStyle = <V>() => <K extends StyleKey>(k: K) => (v: V): Style =>
    singleton(k, v),
  pxStyle = <K extends StyleKey>(k: K) => flow(px, unaryStyle<string>()(k));

export const translate = (point: Point): string =>
    Object.entries(point)
      .map(([k, v]) => (v !== undefined ? `translate${k}(${v})` : ''))
      .join(' '),
  rotate = (angle: Angle3): string =>
    Object.entries(angle)
      .map(([k, v]) => (v !== undefined ? `rotate${k}(${v}deg)` : ''))
      .join(' ');

export const rotateX = (angle: number) => rotate({ x: angle }),
  rotateY = (angle: number) => rotate({ y: angle }),
  rotateZ = (angle: number) => rotate({ z: angle }),
  rotateBy = (axis: ThreeDAxis) => (angle: number) => rotate({ [axis]: angle }),
  scaleBy = (s: number) => `scale(${s})`;

export const transform = (...parts: string[]): { transform: string } => ({
  transform: parts.join(' '),
});

export const hFlexGapPx = (gap: Gap): Style => ({ gap, ...css.hFlex }),
  vFlexGapPx = (gap: Gap): Style => ({ gap, ...css.vFlex });

export const hPadding = (pad: string | 0) =>
    ({ paddingLeft: pad, paddingRight: pad } as const),
  margin = unaryStyle<string | 0>()('margin'),
  padding = unaryStyle<string | 0>()('padding');

export const sizePx = (width: number, height: number): Style =>
  pxRecord({ width, height });

export const [widthPx, heightPx] = pipe(
  ['width', 'height'] as const,
  RA.map(pxStyle),
);

export const [topLeftBorderRadius, topRightBorderRadius] = [
  pxStyle('borderTopLeftRadius'),
  pxStyle('borderTopRightRadius'),
];

export const bgColor = unaryStyle<Color>()('backgroundColor'),
  fgColor = unaryStyle<Color>()('color'),
  emLineHeight = (h: number) => emRecord({ lineHeight: h, height: h });

export const fontSizePx = pxStyle('fontSize');

export const animation = (animationName: string) => (
  periodSec: number,
): Style => ({
  animationName,
  animationDuration: `${periodSec}s`,
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});

export const add100px = (d: number) => `calc(100% + ${px(d)})`;
export const sub100px = flow(multiply(-1), add100px);
