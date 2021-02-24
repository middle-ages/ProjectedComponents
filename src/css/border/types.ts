import { BorderDirs, BorderEdges, LineStyles } from 'src/css/border/constants';
import { Color } from 'src/css/valueTypes';

/** 'top' | 'botton' | 'left' | 'right' */
export type BorderDir = typeof BorderDirs[number];

/** The shortcut for a list of sides defined in `borderEdges`. E.g.:
 *  `leftRight ≡ ['left', 'right']`
 **/
export type BorderEdge = keyof typeof BorderEdges;

/**
 * The definition of a single border edge
 * @property borderWidth - in pixel
 * @property borderStyle
 * @property borderColor
 **/
export interface TotalEdgeDef {
  borderWidth: number;
  borderStyle: typeof LineStyles[number];
  borderColor: Color;
}

export interface TotalBorderDef extends TotalEdgeDef {
  borderEdges: BorderEdge;
}

export type EdgeDef = Partial<TotalEdgeDef>;
export type BorderDef = Partial<TotalBorderDef>;

export type EdgeDefKey = keyof EdgeDef;
export type BorderDefKey = keyof BorderDef;

/** All relevant CSS keys related to borders:
 * 1. `border`
 * 1. `borderTop`
 * 1. `borderTopWidth`
 * 1. ...
 *
 */
export type BorderKey = `border` | BorderDirKey | BorderDirDefKey;

export type BorderDirKey = `border${Capitalize<BorderDir>}` | `border`;
export type BorderDirDefKey = `${BorderDirKey}${Capitalize<EdgeDefKey>}`;
