import { px } from 'csx';
import { pipe } from 'fp-ts/lib/function';
import { FC } from 'react';
import { BorderBase } from 'src/component/Base';
import { NoDirFlexStyle, VFlex } from 'src/component/TwoD/Flex';
import { MetricProps, Text } from 'src/component/TwoD/Text';
import {
  addBorderEdges,
  bgColor,
  Color,
  css,
  fgColor,
  hPadding,
  splitEdgeDef,
  Style,
  topRightBorderRadius,
  withDefaultEdgeDef,
} from 'src/css';
import { fallbackFontSize } from 'src/font';
import { splitPoint } from 'src/geometry';
import { pluck } from 'src/util';

export interface LabeledProps {
  labelColor?: Color;
  labelBgColor?: Color;
  labelOpacity?: number;
  labelHPad?: string | 0;
  innerBorder?: boolean;
}

/**
 * `Labeled` component is bordered on all edges.
 */
export type Labeled<S extends Style = Style> = LabeledProps &
  MetricProps &
  BorderBase<NoDirFlexStyle<S>>;

/**
 * A container that adds a label above its children.
 *
 * Label colors:
 * @param labelColor label text color. Default is 'black'
 * @param labelBgColor label text background color. Default is `#fffff0`
 * @param labelOpacity default is `1`
 * @param labelHPad override default horizontal text padding of label
 * @param innerBorder if true, and the label has a border, then a horizontal
 * line is drawn separating the label and its children. Default is `false`
 * @param is3D set to true if children have a Z dimension. Default is
 * `false`
 *
 * Label text props:
 * @param text label text
 * @param fontFamily label font family
 * @param fontSize label font size in pixels, default is `12`
 * @param showMetrics
 * @param fromTypoMetrics
 *
 * Border edge props. `borderEdges` is fixed at `all`.
 * @param borderWidth set to `0` to remove default borders
 * @param borderColor set to `transparent` to remove default borders but leave
 * the space they occupy alone
 * @param borderStyle
 *
 * Point:
 * @param x
 * @param y
 * @param z
 */
export const Labeled: FC<Labeled> = ({
  labelColor = 'black',
  labelBgColor = '#fffff0',
  labelOpacity: opacity = 1,
  labelHPad,
  innerBorder = false,
  children,
  styles = [],
  ...props
}) => {
  const [edgeDef, noEdge] = splitEdgeDef(props),
    [point, userTextProps] = splitPoint(noEdge),
    textProps = fallbackFontSize(12)(userTextProps),
    borderWidth = pipe(withDefaultEdgeDef(edgeDef), pluck('borderWidth'), px);

  const labelStyles = [
    { opacity, top: borderWidth },
    innerBorder ? {} : { zIndex: 1 },
    css.relative,
    bgColor(labelBgColor),
    fgColor(labelColor),
    topRightBorderRadius((3 / 4) * textProps.fontSize),
    labelHPad != undefined && hPadding(labelHPad),
  ];

  const textBorder = addBorderEdges(edgeDef)('noBottom');

  return (
    <VFlex {...point} {...{ styles }} noGap is3D>
      <Text {...textProps} {...textBorder} styles={labelStyles} />
      {children}
    </VFlex>
  );
};
