import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { FontManager } from 'src/font/manager';
import { FetchedFont, FetchFont } from 'src/font/types';

const BASE_FONT_PATH = 'src';

const loadFont = (fetchFont: FetchFont): FetchedFont => {
  const fontData = fs.readFileSync(path.join(BASE_FONT_PATH, fetchFont.src)),
    font = fontkit.create(fontData);
  return { ...fetchFont, font };
};

/** Sync read filesystem fonts in Node.js. */
export const loadLocalFonts = (families: FetchFont[]): FontManager =>
  new FontManager(...families.map(loadFont));
