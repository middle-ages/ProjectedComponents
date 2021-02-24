import { px } from 'csx';
import { FC } from 'react';
import { Box } from 'src/component/ThreeD/Box/component';
import {
  BoxDef,
  mergeDefaultBoxDef,
  splitBoxDef,
} from 'src/component/ThreeD/Box/Face';
import { Labeled } from 'src/component/TwoD';
import { mergeDefaultEdgeDef, splitEdgeDef } from 'src/css';
import { splitPoint } from 'src/geometry';

export interface LabeledBox extends Labeled, BoxDef {
  zLevel?: number;
}

/** A container that renders a label above its children and a rectangular prism
 * behind them. */
export const LabeledBox: FC<LabeledBox> = ({
  zLevel = 0,
  children,
  styles = [],
  ...props
}) => {
  const [userEdgeDef, noEdgeDef] = splitEdgeDef(props),
    [{ z = '0px', ...point }, noPoint] = splitPoint(noEdgeDef),
    [userBoxDef, labeled] = splitBoxDef(noPoint);

  const { borderWidth, ...edgeDef } = mergeDefaultEdgeDef(userEdgeDef),
    edgeProps = { borderWidth, ...edgeDef };

  const { depth, ...boxDef } = mergeDefaultBoxDef(userBoxDef),
    boxProps = { depth, ...boxDef, ...edgeProps };

  const labeledProps = {
    ...edgeProps,
    ...labeled,
    ...point,
    z: `calc(${z} + ${px(zLevel * depth + 2 * borderWidth)})`,
  };

  return (
    <Labeled {...labeledProps} {...{ styles }} isThreeD>
      <Box {...boxProps}>{children}</Box>
    </Labeled>
  );
};
