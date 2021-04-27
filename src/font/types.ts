import { Font } from '@pdf-lib/fontkit';

/** * A request to fetch some font, local or remote */
export interface FetchFont {
  fontFamily: string;
  src: string;
}

/** A fetched font */
export interface FetchedFont extends FetchFont {
  font: Font;
}
