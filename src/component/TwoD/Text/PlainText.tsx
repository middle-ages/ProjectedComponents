import { FC } from 'react';
import { At } from 'src/component/TwoD/At';
import { OmitText, splitBorderDef, Style } from 'src/css';
import {
  Measured,
  mergeDefaultMeasured,
  splitMeasured,
  useTextBoxMetrics,
} from 'src/font';

export type TextStyle<S extends Style = Style> = OmitText<S>;

export type PlainText<S extends Style = Style> = Partial<Measured> &
  At<TextStyle<S>>;

/**
 * A text div with tighter horizontal padding.
 *
 * A text div with zero horizontal padding will still show some distance
 * between the edge of some characters and the element content edge. This
 * breaks requirements such as horizontally aligned text. The space is the
 * `advance` of the head/final glyphs, used to space out glyphs in a word. We
 * _do_ want this between glyphs, but _not_ at the head/final glyph.
 *
 * This code exists until CSS gets the required font metrics. If you set
 * horizontal padding to zero, then that will be precisely the distance between
 * the text and the element edge, regardless of the glyph, font family or font
 * size. Uses the font metrics to compute the `advance` of the head/last glyphs,
 * then clips and shifts the text accordingly.
 *
 * Owns the style keys:
 * 1. `width`
 * 1. `fontFamily`
 * 1. `fontSize`
 * 1. `textIndent`
 * 1. `lineHeight
 * 1. `padding`
 * 1. `paddingLeft`
 * 1. `paddingRight`
 * 1. `transform`
 * 1. `border`
 * 1. `border(top|bottom|left|right)`
 * 1. `border(top|bottom|left|right)(style|width|color)`
 *
 * Text:
 * @param fontFamily must be loaded by the font manager
 * @param fontSize in pixels
 * @param text
 * @param hPad ½ of total horizontal padding in pixels
 *
 * Border props:
 * @param borderWidth
 * @param borderColor
 * @param borderStyle
 * @param borderEdges set to any value other than `none` to show a border on
 * the specified edges. Default is show no border
 *
 * Point translate props:
 * @param x
 * @param y
 * @param z
 */
export const PlainText: FC<PlainText> = ({
  children,
  styles = [],
  ...props
}) => {
  const [measured, rest] = splitMeasured(props),
    [borderDef, point] = splitBorderDef(rest),
    textDef = mergeDefaultMeasured(measured),
    textStyle = useTextBoxMetrics(textDef);

  return (
    <At styles={[textStyle, ...styles]} {...borderDef} {...point} {...rest}>
      {textDef.text}
      {children}
    </At>
  );
};
