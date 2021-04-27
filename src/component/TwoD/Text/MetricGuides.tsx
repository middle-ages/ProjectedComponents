import { FC } from 'react';
import { borderCss, defaultClass, heightPx } from 'src/css';
import { useFontBaseline } from 'src/font';

export const className = defaultClass('absolute', 'w100'),
  baselineBorder = {
    borderColor: '#ff0000ff',
    borderStyle: 'dashed',
    borderEdges: 'bottom',
  } as const;

export interface MetricGuides {
  fontFamily: string;
  fontSize: number;
  fromTypoMetrics?: boolean;
}

export const MetricGuides: FC<MetricGuides> = ({
  fontFamily,
  fontSize,
  fromTypoMetrics = false,
}) => (
  <div
    className={className(
      heightPx(useFontBaseline(fontFamily, fontSize, fromTypoMetrics)),
      borderCss({ ...baselineBorder, borderWidth: fontSize / 16 }),
    )}
  />
);
