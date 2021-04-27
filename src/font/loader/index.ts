import * as AR from 'fp-ts/lib/ReadonlyArray';
import { pipe } from 'fp-ts/lib/function';
import { loadFont } from 'src/font/loader/loadRemote';
import { sheetToFonts } from 'src/font/loader/styleSheet';
import { FontManager } from 'src/font/manager';

export * from 'src/font/loader/loadLocal';

/**
 * Loads async all fonts that appear in stylesheets, returns a promise of a
 * `FontManager` with all fonts loaded.
 */
export const loadStyleSheetFonts = (): Promise<FontManager> => {
  const res = pipe(
    window.document.styleSheets,
    Array.from,
    AR.chain(sheetToFonts),
    AR.map(loadFont),
    Promise.all.bind(Promise),
    FontManager.from,
  );
  return res;
};

/** Runs `f` async with a loaded font manager. */
export const withFontManager = <T>(
  f: (fontManager: FontManager) => T,
): Promise<T> => loadStyleSheetFonts().then(f);
