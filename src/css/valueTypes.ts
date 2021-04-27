import { Property as CSSTypes } from 'csstype';

export type FlexDir = CSSTypes.FlexDirection;
export type Background = CSSTypes.Background;
export type Color = CSSTypes.Color;
export type Gap = CSSTypes.Gap;
export type LineStyle = CSSTypes.BorderStyle;
export type Width = string | 0;
export type Height = string | 0;

export type BackgroundKey = 'background' | 'backgroundColor';

/** Font-related CSS keys that are set from font metrics */
export type FontKey =
  | 'width'
  | 'height'
  | 'fontFamily'
  | 'fontSize'
  | 'textIndent'
  | 'lineHeight';
