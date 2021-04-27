import { Font } from '@pdf-lib/fontkit';
import * as RA from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import {} from 'fp-ts/lib/Record';
import {
  computeTypoBaseLine,
  computeWinBaseLine,
  measureText,
} from 'src/font/metrics';
import { HMetrics, Measured } from 'src/font/metrics/measured';
import { FetchedFont } from 'src/font/types';
import { pluck } from '../util/Object';

export class FontManager {
  private cache: Map<string, FetchedFont> = new Map();

  constructor(...loadedFonts: FetchedFont[]) {
    loadedFonts.forEach(loadedFont => {
      this.cache.set(loadedFont.fontFamily, loadedFont);
    });
  }

  get = (family: string): Font => {
    if (family === undefined)
      throw new Error('Requested font but family name is undefined.');

    const res = this.cache.get(family);
    if (res === undefined)
      throw new Error(
        `No font found for family name “${family}”. ` +
          (this.cache.size
            ? `These families have been loaded: ${this.families
                .map(f => `“${f}”`)
                .join(', ')}`
            : 'No font families have been loaded.'),
      );
    return res.font;
  };

  get fonts(): FetchedFont[] {
    return Array.from(this.cache.values());
  }

  get families(): string[] {
    return pipe('fontFamily', pluck, RA.map)(this.fonts);
  }

  measure = (measured: Measured): HMetrics =>
    pipe(measured.fontFamily, this.get, measureText)(measured);

  /**
   * Distance in pixels from top of text line (1.5em `line-height`) to baseline
   *
   */
  computeBaseLine = (
    fontFamily: string,
    fontSize: number,
    fromTypoMetrics = false,
  ): number => {
    const font = this.get(fontFamily),
      baseline = (fromTypoMetrics ? computeTypoBaseLine : computeWinBaseLine)(
        font,
      );

    return (fontSize / font.unitsPerEm) * baseline;
  };

  static from = async (
    loadedFonts: Promise<FetchedFont[]>,
  ): Promise<FontManager> => new FontManager(...(await loadedFonts));
}
