import { flow, pipe } from 'fp-ts/lib/function';
import { Lens } from 'monocle-ts';
import { Context, createContext, useContext } from 'react';
import { css, emLineHeight, hPadding, pxRecord, Style } from 'src/css';
import { FontManager } from 'src/font/manager';
import {
  DefaultLineHeightEm,
  HMetrics,
  Measured,
  mergeDefaultMeasured,
} from 'src/font/metrics';
import { FontMeasure } from 'src/font/types';

export const FontContext: Context<FontManager> = createContext(
  new FontManager(),
);

export const useFontContext = () => useContext(FontContext);

export const useFontBaseline = (
  fontFamily: string,
  fontSize: number,
  fromTypoMetrics?: boolean,
): number =>
  useFontContext().computeBaseLine(fontFamily, fontSize, fromTypoMetrics);

const metricsToMeasure: Lens<
  HMetrics,
  FontMeasure
> = Lens.fromProps<HMetrics>()([
  'text',
  'fontFamily',
  'fontSize',
  'textWidth',
  'textIndent',
]);

export const useFontMetrics = (measured: Partial<Measured>): FontMeasure =>
  flow(
    mergeDefaultMeasured,
    useFontContext().measure,
    metricsToMeasure.get,
  )(measured);

export const useTextBoxMetrics = (measured: Partial<Measured>): Style => {
  const { fontSize, fontFamily, textWidth: width, textIndent, hPad } = pipe(
    measured,
    mergeDefaultMeasured,
    useFontContext().measure,
  );

  return {
    fontFamily,
    ...css.relative,
    ...css.noWrap,
    ...emLineHeight(DefaultLineHeightEm),
    ...(hPad ? hPadding(hPad) : {}),
    ...pxRecord({ width, fontSize, textIndent }),
  };
};
