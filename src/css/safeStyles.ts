import { BorderKey } from 'src/css/border';
import { Style } from 'src/css/types';
import { BackgroundKey, FontKey } from 'src/css/valueTypes';

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
 * 1. `border`, `border-(top|bottom|left|right)`,
 * `border-(top|bottom|left|right)-(style|width|color)`
 * 1. `transform-style`
 **/
export type OmitBase<S extends Style = Style> = Omit<
  S,
  BorderKey | 'transformStyle'
>;

export type OmitPosition<S extends Style = Style> = Omit<S, 'position'>;

export type OmitWidth<S extends Style = Style> = Omit<S, 'width'>;

export type OmitBackground<S extends Style = Style> = Omit<S, BackgroundKey>;

export type OmitText<S extends Style = Style> = Omit<OmitWidth<S>, FontKey>;
