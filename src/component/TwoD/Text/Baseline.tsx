import { FC } from 'react';
import { borderCss, css, defaultCss, hPx } from 'src/css';
import { useFontBaseline } from 'src/font';

export const className = defaultCss(css.borderBox, css.absolute, css.w100),
  baselineBorder = {
    borderColor: '#ff0000ff',
    borderStyle: 'dashed',
    borderEdges: 'bottom',
  } as const;

export interface Baseline {
  fontFamily: string;
  fontSize: number;
  fromTypoMetrics?: boolean;
}

export const Baseline: FC<Baseline> = ({
  fontFamily,
  fontSize,
  fromTypoMetrics = false,
}) => (
  <div
    className={className(
      hPx(useFontBaseline(fontFamily, fontSize, fromTypoMetrics)),
      borderCss({ ...baselineBorder, borderWidth: fontSize / 16 }),
    )}
  />
);
