import { FC } from 'react';
import { BoxDef, BoxFace } from 'src/component/ThreeD/Box/Face';
import { ThreeDFaces } from 'src/component/ThreeD/Box/types';
import { At, BorderedAt } from 'src/component/TwoD';
import { css, OmitPosition, Style } from 'src/css';
import { splitPoint } from 'src/geometry';

export type Box<S extends Style = Style> = BorderedAt<OmitPosition<S>> & BoxDef;

const defaultCss = { ...css.relative, ...css.preserveThreed };

/** Actually an `Irregular Rectangular Prism`. */
export const Box: FC<Box> = ({ children, styles = [], ...props }) => {
  const [point, commonFaceProps] = splitPoint(props);

  return (
    <At {...point} styles={[defaultCss, ...styles]}>
      <BoxFace face="front" {...commonFaceProps}>
        {children}
      </BoxFace>
      {ThreeDFaces.map(face => (
        <BoxFace {...{ face }} {...commonFaceProps} key={face} />
      ))}
    </At>
  );
};
