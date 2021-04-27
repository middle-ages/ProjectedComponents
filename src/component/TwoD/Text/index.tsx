import { FC } from 'react';
import { Base } from 'src/component/Base';
import { MetricText } from 'src/component/TwoD/Text/MetricText';
import { PlainText, TextStyle } from 'src/component/TwoD/Text/PlainText';
import { Style } from 'src/css';
import { Measured, measuredKeys } from 'src/font/metrics/measured';
import { split } from 'src/util';

export * from 'src/component/TwoD/Text/MetricGuides';
export * from 'src/component/TwoD/Text/MetricText';
export * from 'src/component/TwoD/Text/PlainText';

/**
 * The type of props used by components that show text and possibly font
 * metrics
 **/
export interface MetricProps extends Partial<Measured> {
  showMetrics?: boolean;
  fromTypoMetrics?: boolean;
}

export type Text<S extends Style = Style> = Base<TextStyle<S>> & MetricProps;

export const textKeys = [
    'showMetrics',
    'fromTypoMetrics',
    ...measuredKeys,
  ] as const,
  splitText = split(textKeys);

/**
 * A `PlainText` component that optionally shows some font metrics
 *
 * Font metrics:
 * @param showMetrics  - set to `true` to overlay the baseline ruler over the
 * component. Default is false
 * @param fromTypoMetrics - uses `WinMetrics` by default. If this flag is true
 * then font metrics will be read from the `OS/2` table `TypoMetrics`
 * entries. Default is false
 *
 * Text props:
 * @param text
 * @param fontFamily
 * @param fontSize
 *
 * Border props:
 * @param borderWidth
 * @param borderColor
 * @param borderStyle
 * @param borderEdges
 *
 * Point translate props:
 * @param x
 * @param y
 * @param z
 */
export const Text: FC<Text> = ({ showMetrics = false, children, ...props }) => {
  const TextTag = showMetrics ? MetricText : PlainText;

  return <TextTag {...props}>{children}</TextTag>;
};
