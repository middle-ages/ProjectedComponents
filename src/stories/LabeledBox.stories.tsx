import { Meta, Story } from '@storybook/react';
import { LabeledBox, Stage, Text, Viewport } from 'src/component';
import { marginPx } from 'src/css';
import { commonDefaults } from 'src/stories/util';

export default {
  title: 'LabeledBox',
  component: LabeledBox,
  args: { depth: 32, borderWidth: 1, hPad: 6, labelText: 'Link' },
  ...commonDefaults,
} as Meta;

export const Basic: Story<LabeledBox> = args => (
  <Stage styles={[marginPx(100)]}>
    <Viewport camera="top" orbit="xyz" isOrbiting>
      <LabeledBox {...args}>
        <Text text="Demo1" />
      </LabeledBox>
    </Viewport>
  </Stage>
);
