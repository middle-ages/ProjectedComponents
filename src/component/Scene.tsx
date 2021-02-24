import { FC } from 'react';
import { Styled } from 'src/component/types';
import { css, gridBackground, GridConfig, OmitBackground } from 'src/css';
import { style } from 'typestyle';

export type Scene = Styled<OmitBackground> & Partial<GridConfig>;

export const Scene: FC<Scene> = ({ children, styles = [], ...grid }) => (
  <div className={style(gridBackground(grid), ...styles)}>{children}</div>
);

export const IsoScene: FC<Scene> = ({ styles = [], children, ...props }) => (
  <Scene {...props} styles={[css.isometric, ...styles]}>
    {children}
  </Scene>
);
