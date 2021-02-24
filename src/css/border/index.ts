import * as RE from 'fp-ts/ReadonlyRecord';
import {
  BorderEdges,
  HorizontalPadEdges,
  PadDirMultiplier,
  VerticalPadEdges,
} from 'src/css/border/constants';
import {
  BorderDef,
  BorderDefKey,
  BorderEdge,
  EdgeDef,
  EdgeDefKey,
} from 'src/css/border/types';
import { Style } from 'src/css/types';
import { pxValue, ucFirst } from 'src/css/util';
import { mergeDefined, split, ToRequired } from 'src/util';

export * from 'src/css/border/constants';
export * from 'src/css/border/types';

export const defaultEdgeDef: Required<EdgeDef> = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  defaultBorderDef: Required<BorderDef> = {
    ...defaultEdgeDef,
    borderEdges: 'none',
  };

export const edgeDefKeys = Object.keys(defaultEdgeDef) as EdgeDefKey[],
  borderDefKeys = Object.keys(defaultBorderDef) as BorderDefKey[];

export const mergeDefaultEdgeDef: ToRequired<EdgeDef> = mergeDefined(
    defaultEdgeDef,
  ),
  mergeDefaultBorderDef: ToRequired<BorderDef> = mergeDefined(defaultBorderDef);

export const splitEdgeDef = split(edgeDefKeys),
  splitBorderDef = split(borderDefKeys);

/**
 * True if border definition defines a border to be drawn. A `transparent`
 * border with `borderEdges > 0` and `borderWidth > 0` will return true because
 * this border still takes up layout space.
 **/
export const hasBorder = (borderDef: BorderDef = {}): boolean =>
  !RE.isEmpty(borderDef) &&
  borderDef.borderEdges !== 'none' &&
  borderDef.borderWidth !== 0;

/**
 * Measure pixels taken up by the horizontal borders. Sum of `left` and `right`
 * border width.
 **/
export const measureBorderHPad = (borderDef: BorderDef = {}): number => {
  if (!hasBorder(borderDef)) return 0;
  const { borderEdges, borderWidth } = mergeDefaultBorderDef(borderDef);

  return borderWidth * PadDirMultiplier[HorizontalPadEdges[borderEdges]];
};

/**
 * Measure pixels taken up by the vertical borders. Sum of `top` and `bottom`
 * border width.
 **/
export const measureBorderVPad = (borderDef: BorderDef = {}): number => {
  if (!hasBorder(borderDef)) return 0;
  const { borderEdges, borderWidth } = mergeDefaultBorderDef(borderDef);

  return borderWidth * PadDirMultiplier[VerticalPadEdges[borderEdges]];
};

export const measureBorderPad = (
  borderDef: BorderDef = {},
): [number, number] => [
  measureBorderHPad(borderDef),
  measureBorderVPad(borderDef),
];

/** Add border edges to an `EdgeDef` making a `BorderDef` */
export const addBorderEdges = (edgeDef: EdgeDef) => (
  borderEdges: BorderEdge = 'all',
): BorderDef & { borderEdges: BorderEdge } => ({
  ...edgeDef,
  borderEdges,
});

/**
 * Convert a border definition into a style object.
 *
 * @param borderDef The border definition: `borderWidth`, `borderStyle`,
 * `borderColor`, and `borderEdges`.
 * @returns Style object
 */
export const borderCss = (borderDef: BorderDef = {}): Style => {
  if (!hasBorder(borderDef)) return {};

  const {
    borderWidth,
    borderStyle,
    borderColor,
    borderEdges,
  } = mergeDefaultBorderDef(borderDef);

  const edgeList: readonly BorderEdge[] = BorderEdges[borderEdges];

  return Object.fromEntries(
    edgeList.map(edge => [
      `border${ucFirst(edge)}`,
      [pxValue(borderWidth), borderStyle, borderColor].join(' '),
    ]),
  );
};

/**
 * @param edgeDef `borderWidth`, `borderStyle` and
 * `borderColor`
 * @returns Style object
 */
export const allBordersCss = (edgeDef: EdgeDef = {}): Style =>
  borderCss({ ...edgeDef, borderEdges: 'all' });
