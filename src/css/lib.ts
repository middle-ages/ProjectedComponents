import * as REC from 'fp-ts/Record';
import { style } from 'typestyle';

const atomic = {
  relative: { position: 'relative' },
  absolute: { position: 'absolute', top: 0, left: 0 },
  borderBox: { boxSizing: 'border-box' },
  contentBox: { boxSizing: 'content-box' },

  w100: { width: '100%' },
  h100: { height: '100%' },
  minContentWidth: { width: 'min-content' },

  centerText: { textAlign: 'center' },

  hFlex: { display: 'flex', flexDirection: 'row' },
  vFlex: { display: 'flex', flexDirection: 'column' },
  flex1: { flex: 1 },
  flexWrap: { flexWrap: 'wrap' },
  alignBaseline: { alignItems: 'baseline' },
  alignTop: { alignItems: 'flex-start' },
  alignBottom: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },

  noOverflow: { overflow: 'hidden' },
  autoOverflow: { overflow: 'auto' },
  noWrap: { whiteSpace: 'nowrap' },

  whiteBg: { background: 'white' },
  blackBorder: { border: '1px solid black' },

  centerOrigin: { transformOrigin: 'center' },
  leftTopOrigin: { transformOrigin: 'left top' },
  threeD: { transformStyle: 'preserve-3d' },
  twoD: { transformStyle: 'flat' },

  play: { animationPlayState: 'running' },
  pause: { animationPlayState: 'paused' },
} as const;

const wh100 = { ...atomic.w100, ...atomic.h100 };

export const composed = {
  wh100,
  absWh100: { ...wh100, ...atomic.absolute },
  relWh100: { ...wh100, ...atomic.relative },

  bwBorder: { ...atomic.whiteBg, ...atomic.blackBorder },
} as const;

export const css = { ...atomic, ...composed } as const,
  cssClasses: Record<CssKey, string> = REC.map(style)(css);

export type CssKey = keyof typeof css;
