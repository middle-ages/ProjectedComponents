import { Font } from '@pdf-lib/fontkit';
import { defined } from 'src/util';
import {
  computeTypoBaseLine,
  computeWinBaseLine,
  HMetrics,
  Measured,
  measureText,
} from 'src/font/metrics';
import { FetchedFont } from 'src/font/types';

export class FontManager {
  private cache: Map<string, FetchedFont> = new Map();

  constructor(...loadedFonts: FetchedFont[]) {
    loadedFonts.forEach(loadedFont => {
      this.cache.set(loadedFont.fontFamily, loadedFont);
    });
  }

  get = (family: string): Font => {
    if (!defined(family))
      throw new Error('Requested font but family name is undefined.');
    const res = this.cache.get(family);
    if (!defined(res))
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
    return this.fonts.map(f => f.fontFamily);
  }

  measure = (measured: Measured): HMetrics =>
    measureText(this.get(measured.fontFamily))(measured);

  computeBaseLine = (
    fontFamily: string,
    fontSize: number,
    fromTypoMetrics = false,
  ): number => {
    const font = this.get(fontFamily),
      baseline = (fromTypoMetrics ? computeTypoBaseLine : computeWinBaseLine)(
        font,
        fontSize,
      );

    return (fontSize / font.unitsPerEm) * baseline;
  };

  static from = async (
    loadedFonts: Promise<FetchedFont[]>,
  ): Promise<FontManager> => new FontManager(...(await loadedFonts));
}
