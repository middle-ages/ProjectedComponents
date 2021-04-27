import fontkit from '@pdf-lib/fontkit';
import { flow } from 'fp-ts/lib/function';
import fs from 'fs';
import path from 'path';
import { FontManager } from 'src/font/manager';
import { FetchedFont, FetchFont } from 'src/font/types';

const BASE_FONT_PATH = 'src';

const loadFont = (fetchFont: FetchFont): FetchedFont => ({
  ...fetchFont,
  font: flow(
    path.join,
    fs.readFileSync,
    fontkit.create,
  )(BASE_FONT_PATH, fetchFont.src),
});

/** Sync read filesystem fonts in Node.js. */
export const loadLocalFonts = (families: FetchFont[]): FontManager =>
  new FontManager(...families.map(loadFont));
