import { Meta } from '@storybook/react';
import { FC } from 'react';
import { Panel } from 'src/component';
import { backgroundColor, whPx } from 'src/css';
import { argTypesOf } from 'src/stories/argTypes';
import { style } from 'typestyle';

export default {
  title: 'Panel',
  component: Panel,
  argTypes: { ...argTypesOf.At },
} as Meta;
export const Basic: FC<Panel> = args => (
  <Panel {...args}>
    <div className={style(backgroundColor('yellow'), whPx(300, 300))} />
    <div className={style(backgroundColor('red'), whPx(100, 100))} />
  </Panel>
);
