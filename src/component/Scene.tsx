import { FC } from 'react';
import { Styled } from 'src/component/Styled';
import { gridBg, GridConfig, OmitBackground } from 'src/css';
import { style } from 'typestyle';

export type Scene = Styled<OmitBackground> & Partial<GridConfig>;

/** A container with an optional grid background */
export const Scene: FC<Scene> = ({ children, styles = [], ...grid }) => (
  <div className={style(gridBg(grid), ...styles)}>{children}</div>
);
