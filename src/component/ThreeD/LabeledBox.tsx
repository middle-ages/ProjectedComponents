import { px } from 'csx';
import { FC } from 'react';
import { Box } from 'src/component/ThreeD/Box/component';
import {
  HasDepth,
  splitHasDepth,
  withDefaultHasDepth,
} from 'src/component/ThreeD/Box/HasDepth';
import { Labeled } from 'src/component/TwoD';
import { splitEdgeDef, withDefaultEdgeDef } from 'src/css';
import { splitPoint } from 'src/geometry';

export interface LabeledBox extends Omit<Labeled, 'is3D'>, HasDepth {
  zLevel?: number;
}

/** A container that renders a label above its children and a rectangular prism
 * behind them
 *
 * @param zLevel multiplied by `depth` and added to the element Z coordinate.
 * Default is 0. This will render the front face flat on the parent element.
 * Set to an integer `n`, to raise the element by the height of the box sides
 * times `n`
 */
export const LabeledBox: FC<LabeledBox> = ({
  zLevel = 0,
  children,
  styles = [],
  ...props
}) => {
  const [userEdgeDef, noEdgeDef] = splitEdgeDef(props),
    [{ z = '0px', ...point }, noPoint] = splitPoint(noEdgeDef),
    [userBoxDef, labeled] = splitHasDepth(noPoint);

  const { borderWidth, ...edgeDef } = withDefaultEdgeDef(userEdgeDef),
    edgeProps = { borderWidth, ...edgeDef };

  const { depth, ...boxDef } = withDefaultHasDepth(userBoxDef),
    boxProps = { depth, ...boxDef, ...edgeProps };

  const labeledProps = {
    ...edgeProps,
    ...labeled,
    ...point,
    z: `calc(${z} + ${px(zLevel * depth + 2 * borderWidth)})`,
  };

  return (
    <Labeled {...labeledProps} {...{ styles }} is3D>
      <Box addFrontBg {...boxProps}>
        {children}
      </Box>
    </Labeled>
  );
};
