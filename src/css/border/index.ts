import { flow } from 'fp-ts/lib/function';
import * as RE from 'fp-ts/ReadonlyRecord';
import { BorderEdges } from 'src/css/border/constants';
import { BorderDef, BorderEdge, EdgeDef } from 'src/css/border/types';
import { Style } from 'src/css/types';
import { px, ucFirst } from 'src/css/util';
import { defaultHelpers } from 'src/util';

export * from 'src/css/border/constants';
export * from 'src/css/border/types';

export const [
    splitEdgeDef,
    withDefaultEdgeDef,
    defaultEdgeDef,
  ] = defaultHelpers<EdgeDef>({
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  }),
  [
    splitBorderDef,
    withDefaultBorderDef,
    defaultBorderDef,
  ] = defaultHelpers<BorderDef>({ ...defaultEdgeDef, borderEdges: 'none' });

/**
 * True if the definition will render a border that will take up layout space.
 * A `transparent` border with `borderEdges > 0` and `borderWidth > 0` will
 * return true because this border still takes up layout space.
 **/
export const hasBorder = (borderDef: BorderDef = {}): boolean =>
  !RE.isEmpty(borderDef) &&
  borderDef.borderEdges !== 'none' &&
  borderDef.borderWidth !== 0;

/** Add border edges to an `EdgeDef` making a `BorderDef` */
export const addBorderEdges = (edgeDef: EdgeDef) => (
    borderEdges: BorderEdge = 'all',
  ): BorderDef & { borderEdges: BorderEdge } => ({
    ...edgeDef,
    borderEdges,
  }),
  addAllBorderEdges = (edgeDef: EdgeDef) => addBorderEdges(edgeDef)('all');

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
  } = withDefaultBorderDef(borderDef);

  const edgeList: readonly BorderEdge[] = BorderEdges[borderEdges];

  return Object.fromEntries(
    edgeList.map(edge => [
      `border${ucFirst(edge)}`,
      [px(borderWidth), borderStyle, borderColor].join(' '),
    ]),
  );
};

/**
 * Convert an edge definition into a style object. Same edge is rendered for
 * each of the 4 border sides.
 *
 * @param edgeDef `borderWidth`, `borderStyle` and
 * `borderColor`
 * @returns Style object
 */
export const allBordersCss = flow(addAllBorderEdges, borderCss);
