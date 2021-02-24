import { Meta, Story } from '@storybook/react';
import { Text } from 'src/component';
import 'src/style/fonts.css';
import { backgroundColor, css } from 'src/css';
import { argTypesOf } from 'src/stories/argTypes';
import { commonDefaults } from 'src/stories/util';

export default {
  title: 'Text',
  component: Text,
  args: { text: 'Lpqx|H', fontSize: 100, styles: [css.whiteBg] },
  argTypes: { ...argTypesOf.At, ...argTypesOf.Text },
  ...commonDefaults,
} as Meta;

const Template: Story<Text> = args => <Text {...args} />;

export const Tight = Template.bind({});
Tight.args = { hPad: 0 };

export const StyledTight = Template.bind({});
StyledTight.args = { ...Tight.args, styles: [backgroundColor('yellow')] };

export const DefaultPad = Template.bind({});
DefaultPad.args = {};

export const XShiftedRight = Template.bind({});
XShiftedRight.args = { x: 200 };
