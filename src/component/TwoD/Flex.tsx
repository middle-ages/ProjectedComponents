import { FC } from 'react';
import { Base, baseStyles } from 'src/component/Base';
import { css, cssOf, FlexDir, Style } from 'src/css';
import { mergeStyles } from 'src/css/merge';

export type FlexStyle<S extends Style = Style> = Omit<S, 'display'>;
export type NoDirFlexStyle<S extends Style = Style> = Omit<
  FlexStyle<S>,
  'flexDirection'
>;

export interface Flex<S extends Style = Style> extends Base<FlexStyle<S>> {
  noGap?: boolean;
  gap?: number | string;
  wrap?: boolean;
  dir?: FlexDir;
}

export type NoDirFlex<S extends Style = Style> = Omit<
  Flex<NoDirFlexStyle<S>>,
  'dir'
>;

/** A horizontal/vertical flex container.
 *
 * @param noGap if true, overrides value in `gap` to set `gap=0`. Default is `false`
 * @param gap flex gap in CSS length units. Default is `1ex`
 * @param wrap sets `flex-wrap` if true. Default is `false`
 * @param dir `column` | `row` | `column-reverse` | `row-reverse`. Default is `row`
 */
export const Flex: FC<Flex> = ({
  noGap = false,
  gap = '1ex',
  wrap = false,
  dir,
  styles = [],
  children,
  ...props
}) => {
  const className = mergeStyles(
    !noGap && { padding: gap, gap },
    wrap && css.flexWrap,
    cssOf(dir && dir === 'row' ? 'hFlex' : 'vFlex'),

    ...baseStyles(props),

    ...styles,
  );

  return <div {...{ className }}>{children}</div>;
};

export const HFlex: FC<NoDirFlex> = ({ children, ...props }) => (
  <Flex dir="row" {...props}>
    {children}
  </Flex>
);

export const VFlex: FC<NoDirFlex> = ({ children, ...props }) => (
  <Flex dir="column" {...props}>
    {children}
  </Flex>
);
