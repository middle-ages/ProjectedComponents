import { FC } from 'react';
import { Styled } from 'src/component/types';
import { css, defaultCss } from 'src/css';

const className = defaultCss(css.wh100);

export const Stage: FC<Styled> = ({ children, styles = [] }) => {
  return <div className={className(...styles)}>{children}</div>;
};
