import { Meta, Story } from '@storybook/react';
import { Labeled, Text } from 'src/component';
import { argTypesOf } from 'src/stories/argTypes';
import { commonDefaults } from 'src/stories/util';

export default {
  title: 'Labeled',
  component: Labeled,
  argTypes: { ...argTypesOf.At, ...argTypesOf.Bordered, ...argTypesOf.Text },
  args: { hPad: 6, text: 'Label' },
  ...commonDefaults,
} as Meta;

export const Basic: Story<Labeled> = args => (
  <Labeled {...args}>
    <Text text="Labeled" borderEdges="all" />
  </Labeled>
);
