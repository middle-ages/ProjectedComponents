import { defaultHelpers } from 'src/util';

/**
 * A string of text and its font size/family. Members of this type can be
 * measured for their font metrics by a font manager, assuming it has loaded
 * the given font family.
 */
export interface Measured {
  fontFamily: string;
  fontSize: number;
  text: string;
}

export type MeasuredKey = keyof Measured;

/** The result of the “measure text” operation */
export interface Measure extends Measured {
  textWidth: number;
  textIndent: number;
}

/** Full horizontal font metrics of the measured text */
export interface HMetrics extends Measure {
  minX: number;
  maxX: number;
  bearingRight: number;
  advanceWidth: number;
}

export const [
  splitMeasured,
  mergeDefaultMeasured,
  defaultMeasured,
  measuredKeys,
] = defaultHelpers<Partial<Measured>>({
  fontFamily: 'Roboto',
  fontSize: 16,
  text: ' ',
});

/** Set a default font size on a partial `Measured` unless it has one */
export const fallbackFontSize = (fontSize: number) => (
  measured: Partial<Measured>,
) => ({ fontSize, ...measured } as Partial<Measured> & { fontSize: number });
