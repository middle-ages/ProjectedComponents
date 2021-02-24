import { BorderKey } from 'src/css/border';
import { Style } from 'src/css/types';
import { BackgroundKey, FontKey, HPaddingKey } from 'src/css/valueTypes';

/**
 * Use as style types for components that use these style keys. The user of the
 * component will see a compile-time error when setting these keys in the
 * component's stylesheet rule.
 *
 * Example: Consider a component that renders to one DOM element. It sets the
 * `width` CSS key to some computed value. Other parts of the component depend
 * on this being the width, for example for setting borders. By setting the
 * type of the component CSS rule to `Omit<Style, 'width'>`, users will not be
 * able to touch this one stylesheet key.
 */

/**
 * The stylesheet `T` without the keys:
 * 1. `transform`
 * 1. `border`
 * 1. `border(top|bottom|left|right)`
 * 1. `border(top|bottom|left|right)(style|width|color)`
 **/
export type OmitAt<S extends Style = Style> = OmitTransform<OmitBorder<S>>;

export type OmitTransform<S extends Style = Style> = Omit<S, 'transform'>;

export type OmitBorder<S extends Style = Style> = Omit<S, BorderKey>;

export type OmitWidth<S extends Style = Style> = Omit<S, 'width'>;

export type OmitHPad<S extends Style = Style> = Omit<S, HPaddingKey>;

export type OmitBackground<S extends Style = Style> = Omit<S, BackgroundKey>;

export type OmitText<S extends Style = Style> = Omit<
  OmitWidth<OmitHPad<S>>,
  FontKey
>;

export type OmitDisplay<S extends Style = Style> = Omit<S, 'display'>;

export type OmitPosition<S extends Style = Style> = Omit<OmitAt<S>, 'position'>;
