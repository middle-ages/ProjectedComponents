import { FC } from 'react';
import { At } from 'src/component/TwoD/At';
import {
  css,
  cssOf,
  FlexDir,
  flexGap,
  maybePxValue,
  OmitDisplay,
  Style,
} from 'src/css';
import { splitPoint } from 'src/geometry';

export type FlexStyle<S extends Style = Style> = OmitDisplay<S>;
export type NoDirFlexStyle<S extends Style = Style> = Omit<
  FlexStyle<S>,
  'flexDirection'
>;

export interface Flex<S extends Style = Style> extends At<FlexStyle<S>> {
  gap?: number | string;
  wrap?: boolean;
  dir?: FlexDir;
}

export interface NoDirFlex<S extends Style = Style>
  extends At<NoDirFlexStyle<S>> {
  gap?: number | string;
  wrap?: boolean;
}

//const defaultStyle = css.minContentWidth;

/** A horizontal/vertical flex container.
 *
 * Owns the style keys:
 * 1. `transform`
 * 1. `display`
 * 1. `border`
 * 1. `border(top|bottom|left|right)`
 * 1. `border(top|bottom|left|right)(style|width|color)`
 *
 * @param dir - `column` | `row` | `column-reverse` | `row-reverse`. Default is `row`
 * @param gap - flex gap in pixels. Default is zero
 */
export const Flex: FC<Flex> = ({
  dir,
  gap = '1ex',
  wrap = false,
  styles = [],
  children,
  ...props
}) => {
  const [point, borderDef] = splitPoint(props);

  return (
    <At
      styles={[
        flexGap(gap),
        { padding: maybePxValue(gap) },
        wrap && css.flexWrap,
        cssOf(dir && dir === 'row' ? 'hFlex' : 'vFlex'),
        ...styles,
      ]}
      {...point}
      {...borderDef}
    >
      {children}
    </At>
  );
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
