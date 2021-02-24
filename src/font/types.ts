import { Font } from '@pdf-lib/fontkit';

export interface FetchFont {
  fontFamily: string;
  src: string;
}

export interface FetchedFont extends FetchFont {
  font: Font;
}

/** The result of the “measure text” operation. */
export interface FontMeasure {
  fontFamily: string;
  text: string;
  fontSize: number;
  textWidth: number;
  textIndent: number;
}
