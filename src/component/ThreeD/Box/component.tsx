import { FC } from 'react';
import { BorderBase } from 'src/component/Base';
import { Face } from 'src/component/ThreeD/Box/Face';
import { HasDepth } from 'src/component/ThreeD/Box/HasDepth';
import { FaceKeys3D } from 'src/component/ThreeD/Box/types';
import { At } from 'src/component/TwoD';
import { cssOf, OmitPosition, Style } from 'src/css';
import { splitPoint } from 'src/geometry';

export interface Box<S extends Style = Style>
  extends BorderBase<OmitPosition<S>>,
    HasDepth {
  addFrontBg?: boolean;
}

const defaultCss = cssOf('relative', 'threeD');

/** Actually an `Irregular Rectangular Prism`. */
export const Box: FC<Box> = ({
  addFrontBg: addBg,
  children,
  styles = [],
  ...props
}) => {
  const [point, faceProps] = splitPoint(props);

  return (
    <At {...point} styles={[defaultCss, ...styles]}>
      <Face face="front" {...{ addBg }} {...faceProps}>
        {children}
      </Face>
      {FaceKeys3D.map(face => (
        <Face addBg {...{ face }} {...faceProps} key={face} />
      ))}
    </At>
  );
};
