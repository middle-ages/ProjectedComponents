import { flow } from 'fp-ts/lib/function';
import { Lens } from 'monocle-ts';
import { Context, createContext, useContext } from 'react';
import { cssOf, emLineHeight, pxRecord, Style } from 'src/css';
import { FontManager } from 'src/font/manager';
import { DefaultLineHeightEm } from 'src/font/metrics';
import {
  HMetrics,
  Measure,
  Measured,
  mergeDefaultMeasured,
} from 'src/font/metrics/measured';

export const FontContext: Context<FontManager> = createContext(
  new FontManager(),
);

export const useFontContext = () => useContext(FontContext);

/**
 * Compute vertical distance from line top to baseline
 *
 * Requires a `FontContext` in scope.
 *
 * Computed using: `½ × (lineHeight + ascent + lineGap - descent)`
 *
 * @param fontFamily must be loaded into the font manager
 * @param fontSize
 * @param fromTypoMetrics if true, use “TypoMetrics”. If false, uses
 * “WinMetrics” as does Chrome on windows. Default is false
 * @returns distance in pixels
 */

export const useFontBaseline = (
  fontFamily: string,
  fontSize: number,
  fromTypoMetrics?: boolean,
): number =>
  useFontContext().computeBaseLine(fontFamily, fontSize, fromTypoMetrics);

const metricsToMeasure: Lens<HMetrics, Measure> = Lens.fromProps<HMetrics>()([
  'text',
  'fontFamily',
  'fontSize',
  'textWidth',
  'textIndent',
]);

export const useFontMetrics = (measured: Partial<Measured>): Measure =>
  flow(
    mergeDefaultMeasured,
    useFontContext().measure,
    metricsToMeasure.get,
  )(measured);

const defaultTextStyle = cssOf('relative', 'noWrap');

export const useTextBoxMetrics = (measured: Partial<Measured>): Style => {
  const { fontSize, fontFamily, textWidth: width, textIndent } = useFontMetrics(
    measured,
  );

  return {
    fontFamily,
    ...defaultTextStyle,
    ...emLineHeight(DefaultLineHeightEm),
    ...pxRecord({ width, fontSize, textIndent }),
  };
};
