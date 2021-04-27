import { FC } from 'react';
import { MetricGuides } from 'src/component/TwoD/Text/MetricGuides';
import { PlainText } from 'src/component/TwoD/Text/PlainText';
import { Style } from 'src/css';
import { mergeDefaultMeasured } from 'src/font/metrics/measured';

export interface MetricText<S extends Style = Style> extends PlainText<S> {
  fromTypoMetrics?: boolean;
}

/**
 * A `PlainText` component but with an overlay showing some font metrics:
 *
 * * Baseline
 * * Left/right edges of the measured text
 *
 * @param fromTypoMetrics uses `WinMetrics` by default. If this flag is true
 * then font metrics will be read from the font `OS/2` table `TypoMetrics`
 * entries as used on Linux Chrome.
 */
export const MetricText: FC<MetricText> = ({
  fromTypoMetrics,
  children,
  ...props
}) => {
  const { fontFamily, fontSize } = mergeDefaultMeasured(props);
  return (
    <PlainText {...props}>
      <MetricGuides {...{ fromTypoMetrics, fontFamily, fontSize }} />
      {children}
    </PlainText>
  );
};
