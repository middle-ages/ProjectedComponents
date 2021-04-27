import { FC } from 'react';
import { LabeledBox } from 'src/component/ThreeD/LabeledBox';
import { splitText, Text } from 'src/component/TwoD/Text';

export type LabeledTextBox = LabeledBox & { labelText?: string };

/** `Text` inside a `LabeledBox` */
export const LabeledTextBox: FC<LabeledTextBox> = ({
  labelText = 'label',
  children,
  styles = [],
  ...props
}) => {
  const [{ text, ...textProps }, noText] = splitText(props);

  return (
    <LabeledBox text={labelText} {...noText} {...textProps} {...{ styles }}>
      <Text {...textProps} {...{ text }} />
      {children}
    </LabeledBox>
  );
};
