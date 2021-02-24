import { FC } from 'react';
import { BorderedAt } from 'src/component/TwoD/At';
import { NoDirFlexStyle, VFlex } from 'src/component/TwoD/Flex';
import { MetricProps, Text } from 'src/component/TwoD/Text';
import {
  addBorderEdges,
  backgroundColor,
  Color,
  css,
  foregroundColor,
  splitEdgeDef,
  Style,
  topRightBorderRadius,
} from 'src/css';
import { fallbackFontSize } from 'src/font';
import { splitPoint } from 'src/geometry';

export interface LabeledProps {
  labelColor?: Color;
  labelBgColor?: Color;
  labelOpacity?: number;
  isThreeD?: boolean;
}

export type LabeledKey = keyof LabeledProps;

/**
 * `Labeled` component is bordered on all edges.
 */
export type Labeled<S extends Style = Style> = LabeledProps &
  MetricProps &
  BorderedAt<NoDirFlexStyle<S>>;

/**
 * A container that adds a label above its children.
 *
 * Label colors:
 * @param labelColor label text color
 * @param labelBgColor label text background color
 * @param labelOpacity
 * @param isThreeD set to true if children have a Z dimension
 *
 * Label text props:
 * @param text label text
 * @param fontFamily label font family
 * @param fontSize label font size in pixels, default is `12`
 * @param hPad total horizontal label padding in pixels
 * @param showMetrics
 * @param fromTypoMetrics
 *
 * Border edge props. `borderEdges` is fixed at `all`.
 * @param borderWidth
 * @param borderColor
 * @param borderStyle
 *
 * Point translate props:
 * @param x
 * @param y
 * @param z
 */
export const Labeled: FC<Labeled> = ({
  labelColor = 'black',
  labelBgColor = '#fffff0',
  labelOpacity: opacity = 1,
  isThreeD = false,
  children,
  styles = [],
  ...props
}) => {
  const [edgeDef, noEdge] = splitEdgeDef(props),
    [point, userTextProps] = splitPoint(noEdge),
    textProps = fallbackFontSize(12)(userTextProps);

  const labelStyles = [
    backgroundColor(labelBgColor),
    foregroundColor(labelColor),
    topRightBorderRadius((3 / 4) * textProps.fontSize),
    { opacity },
  ];

  const threeDStyle = isThreeD ? css.preserveThreed : {},
    borderFor = addBorderEdges(edgeDef);

  return (
    <VFlex {...point} styles={[threeDStyle, ...styles]} gap={0}>
      <Text {...textProps} {...borderFor('noBottom')} styles={labelStyles} />
      {children}
    </VFlex>
  );
};
