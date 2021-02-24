import { FC } from 'react';
import { At } from 'src/component/TwoD/At';
import { css, OmitPosition } from 'src/css';

export type Panel = At<OmitPosition>;

const defaultStyle = {
  ...css.relative,
  ...css.minContentWidth,
  // must wrap $nest with `['']` for benefit of eslint
  ['$nest']: { '&>*': css.absolute },
};

/**
 * A layout component for absolutely positioned children. Set `style.top/left`
 * on children to position them.
 */
export const Panel: FC<Panel> = ({ children, styles = [], ...props }) => (
  <At styles={[defaultStyle, ...styles]} {...props}>
    {children}
  </At>
);
