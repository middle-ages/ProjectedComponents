import { pipe } from 'fp-ts/lib/function';
import * as REC from 'fp-ts/Record';
import { style } from 'typestyle';
import { mergeN, picks } from 'src/util';
import { Style } from 'src/css/types';

const atomic = {
  relative: { position: 'relative' },
  absolute: { position: 'absolute', top: 0, left: 0 },
  borderBox: { boxSizing: 'border-box' },
  contentBox: { boxSizing: 'content-box' },

  w100: { width: '100%' },
  h100: { height: '100%' },
  minContentWidth: { width: 'min-content' },

  hFlex: { display: 'flex', flexDirection: 'row' },
  vFlex: { display: 'flex', flexDirection: 'column' },
  flex1: { flex: 1 },
  flexWrap: { flexWrap: 'wrap' },
  alignBaseline: { alignItems: 'baseline' },
  alignTop: { alignItems: 'top' },
  stretch: { alignItems: 'stretch' },

  noOverflow: { overflow: 'hidden' },
  autoOverflow: { overflow: 'auto' },
  noWrap: { whiteSpace: 'nowrap' },

  whiteBg: { background: 'white' },
  greyBg: { background: 'grey' },
  transparentBg: { background: 'transparent' },

  blackBorder: { border: '1px solid black' },

  rotateIsometric: {
    transform: 'rotateX(-30deg) rotateY(30deg) rotateZ(0deg)',
  },
  rotateInvIsometric: {
    transform: 'rotateX(330deg) rotateY(30deg) rotateZ(0deg)',
  },
  centerOrigin: { transformOrigin: 'center' },
  topLeftOrigin: { transformOrigin: 'top left' },
  preserveThreed: { transformStyle: 'preserve-3d' },

  play: { animationPlayState: 'running' },
  pause: { animationPlayState: 'paused' },
} as const;

export const composed = {
  wh100: { ...atomic.w100, ...atomic.h100 },
  absWh100: { ...atomic.w100, ...atomic.h100, ...atomic.absolute },

  bwBorder: { ...atomic.whiteBg, ...atomic.blackBorder },

  isometric: {
    ...atomic.rotateIsometric,
    ...atomic.preserveThreed,
  },
} as const;

export const css = { ...atomic, ...composed } as const,
  cssClasses: Record<StyleKey, string> = REC.map(style)(css);

export type Css = typeof css;

export const cssOf = <K extends StyleKey>(...keys: K[]): Style =>
    mergeN(...pipe(css, picks(...keys), Object.values)),
  cssClassOf = <K extends StyleKey>(key: K): string => cssClasses[key];

export type Styles = typeof css;
export type StyleKey = keyof Styles;
