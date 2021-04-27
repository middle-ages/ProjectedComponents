import { FC } from 'react';
import { Base } from 'src/component/Base';
import { css, cssOf, OmitPosition } from 'src/css';
import { mergeStyles } from 'src/css/merge';

export type Panel = Base<OmitPosition>;

const defaultStyle = {
  ...cssOf('relative', 'minContentWidth'),

  // eslint will not take `$nest` as a key
  ['$nest']: { '&>*': css.absolute },
};

/**
 * A layout component for absolutely positioned children. Set `style.top/left`
 * on children to position them.
 */
export const Panel: FC<Panel> = ({ children, styles = [], ...props }) => (
  <div className={mergeStyles(defaultStyle, ...styles)} {...props}>
    {children}
  </div>
);
