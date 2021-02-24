import { Meta, Story } from '@storybook/react';
import { IsoScene, Scene } from 'src/component';

export default {
  title: 'Scene',
  component: Scene,
  argTypes: {
    majorStep: {
      control: { type: 'range', min: 0, max: 48, step: 1 },
    },
    strokeWidth: { control: { type: 'range', min: 0, max: 10, step: 1 } },
    color: { control: 'color' },
    bgColor: { control: 'color' },
  },
} as Meta;

const Template: Story<Scene> = args => (
  <Scene {...args}>
    <div>Sphinx of black quartz judge my vow</div>
  </Scene>
);

export const NoGridScene = Template.bind({});
NoGridScene.args = { majorStep: 0 };

export const GridScene = Template.bind({});
GridScene.args = {
  majorStep: 24,
  color: 'red',
};

export const IsometricGridScene: Story<Scene> = args => (
  <IsoScene {...args}>ISOMETRIC</IsoScene>
);
IsometricGridScene.args = {
  majorStep: 24,
  color: 'grey',
};
