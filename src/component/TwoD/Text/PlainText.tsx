import { pipe } from 'fp-ts/lib/function';
import { FC } from 'react';
import { Base, baseStyles } from 'src/component/Base';
import { cssOf, hPadding, OmitText, px, Style } from 'src/css';
import { mergeStyles } from 'src/css/merge';
import {
  Measured,
  mergeDefaultMeasured,
  splitMeasured,
  useTextBoxMetrics,
} from 'src/font';

export type TextStyle<S extends Style = Style> = OmitText<S>;

export type PlainText<S extends Style = Style> = Partial<Measured> &
  Base<TextStyle<S>>;

// Explicitly override box-sizing in order to avoid having to measure border
// width when measuring text
const defaultStyle = cssOf('contentBox');

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
 * Adds ownership of the style keys:
 * 1. `width`
 * 1. `height`
 * 1. `fontFamily`
 * 1. `fontSize`
 * 1. `textIndent`
 * 1. `lineHeight
 *
 * Text:
 * @param fontFamily must be loaded by the font manager
 * @param fontSize in pixels
 * @param text
 *
 * Border:
 * @param borderWidth
 * @param borderColor
 * @param borderStyle
 * @param borderEdges set to any value other than `none` to show a border on
 * the specified edges. Default is show no border
 *
 * Position:
 * @param x
 * @param y
 * @param z
 *
 * 3D:
 * @param is3D
 */
export const PlainText: FC<PlainText> = ({
  children,
  styles = [],
  ...props
}) => {
  const [measured, base] = splitMeasured(props),
    textDef = mergeDefaultMeasured(measured),
    { text, fontSize } = textDef;

  const className = mergeStyles(
    ...baseStyles(base),
    defaultStyle,
    useTextBoxMetrics(textDef),
    pipe(fontSize / 2, px, hPadding),
    ...styles,
  );

  return (
    <div {...{ className }}>
      {text}
      {children}
    </div>
  );
};
