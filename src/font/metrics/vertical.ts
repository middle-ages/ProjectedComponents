import { Font } from '@pdf-lib/fontkit';

export const DefaultLineHeightEm = 1.5;

const Os2Keys = [
  'typoAscender',
  'typoDescender',
  'typoLineGap',
  'winDescent',
  'winAscent',
] as const;

type Os2Data = Record<typeof Os2Keys[number], number>;

/** Fontkit typescript declarations are missing these. */
declare module '@pdf-lib/fontkit' {
  export interface Font {
    os2: Os2Data;
  }
}

const readOs2 = (font: Font): Os2Data => font['OS/2'] as any;

export const computeWinBaseLine = (
  font: Font,
  fontSize: number,
  lineHeight = DefaultLineHeightEm,
): number => {
  const { lineGap, unitsPerEm: uem } = font,
    { winDescent, winAscent } = readOs2(font);
  return (lineHeight * uem + winAscent + lineGap - winDescent) / 2;
};

export const computeTypoBaseLine = (
  font: Font,
  fontSize: number,
  lineHeight = DefaultLineHeightEm,
): number => {
  const { unitsPerEm: uem } = font,
    { typoAscender, typoLineGap, typoDescender } = readOs2(font);
  return (lineHeight * uem + typoAscender + typoLineGap + typoDescender) / 2;
};
