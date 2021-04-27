import { Font } from '@pdf-lib/fontkit';
import { divide, multiply } from 'fp-ts-std/Number';
import { flow, pipe } from 'fp-ts/lib/function';
import * as RE from 'fp-ts/ReadonlyRecord';
import {
  HMetrics,
  Measured,
  mergeDefaultMeasured,
} from 'src/font/metrics/measured';

export const measureText = (font: Font) => (
  measured: Partial<Measured> = {},
): HMetrics => {
  const totalMeasured = mergeDefaultMeasured(measured),
    [{ fontSize, text }, { unitsPerEm }] = [totalMeasured, font],
    { advanceWidth, bbox } = font.layout(text),
    { minX, maxX } = bbox,
    uemToPx = flow(multiply(fontSize), divide(unitsPerEm)),
    textWidth = maxX - minX;

  return {
    ...totalMeasured,
    ...pipe(
      {
        advanceWidth,
        textWidth,
        minX,
        maxX,
        textIndent: -1 * minX,
        bearingRight: advanceWidth - textWidth,
      },
      RE.map(uemToPx),
    ),
  };
};
