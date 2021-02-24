import { Font } from '@pdf-lib/fontkit';
import { divide, multiply } from 'fp-ts-std/Number';
import { flow, pipe } from 'fp-ts/lib/function';
import { map as recMap } from 'fp-ts/Record';
import { mergeDefined, split, ToRequired } from 'src/util';

/**
 * A string of text to be measured in a font size/family with given
 * horizontal padding and horizontal border width.
 */
export interface Measured {
  fontFamily: string;
  fontSize: number;
  text: string;
  hPad: number;
}

export type MeasuredKey = keyof Measured;

export interface NumericHMetrics {
  advanceWidth: number;
  textWidth: number;
  minX: number;
  maxX: number;
  textIndent: number;
  bearingRight: number;
}

export type HMetrics = Measured & NumericHMetrics;

export const defaultMeasured: Measured = {
    fontFamily: 'Roboto',
    fontSize: 16,
    text: ' ',
    hPad: 6,
  },
  measuredKeys = Object.keys(defaultMeasured) as MeasuredKey[],
  mergeDefaultMeasured: ToRequired<Partial<Measured>> = mergeDefined(
    defaultMeasured,
  ),
  splitMeasured = split(measuredKeys);

export const fallbackFontSize = (fontSize: number) => (
  measured: Partial<Measured>,
) => ({ fontSize, ...measured } as Partial<Measured> & { fontSize: number });

export const measureText = (font: Font) => (
  userMeasured: Partial<Measured> = {},
): HMetrics => {
  const measured = mergeDefined(defaultMeasured)(userMeasured),
    { fontSize, text } = measured,
    { unitsPerEm } = font,
    {
      advanceWidth,
      bbox: { minX, maxX },
    } = font.layout(text),
    uemToPx = flow(multiply(fontSize), divide(unitsPerEm)),
    textWidth = maxX - minX;

  return {
    ...measured,
    ...pipe(
      {
        advanceWidth,
        textWidth,
        minX,
        maxX,
        textIndent: -1 * minX,
        bearingRight: advanceWidth - textWidth,
      },
      recMap(uemToPx),
    ),
  };
};
