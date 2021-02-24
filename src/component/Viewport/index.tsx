import { pipe } from 'fp-ts/lib/function';
import { FC } from 'react';
import { IsoScene } from 'src/component/Scene';
import { Styled } from 'src/component/types';
import { CameraKey, cameraStyle } from 'src/component/Viewport/camera';
import { Orbit, orbitAnimation } from 'src/component/Viewport/orbit';
import { animation, css, defaultCss, GridConfig } from 'src/css';
import { style } from 'typestyle';

export * from 'src/component/Viewport/camera';
export * from 'src/component/Viewport/orbit';

export interface Viewport extends Partial<GridConfig>, Styled {
  camera?: CameraKey;
  orbit?: Orbit;
  scale?: number;
  isOrbiting?: boolean;
  periodSec?: number;
  perspective?: string;
}

const className = defaultCss(css.topLeftOrigin);

export const Viewport: FC<Viewport> = ({
  camera = 'iso' as CameraKey,
  orbit = 'y',
  scale = 1,
  isOrbiting = false,
  periodSec = 10,
  perspective = '90em',
  styles = [],
  children,
  ...props
}) => {
  const animationName = orbitAnimation(camera)(orbit),
    keyframeStyle = pipe(periodSec, animation(animationName)),
    playStyle = isOrbiting ? css.play : css.pause,
    animationStyles = [
      cameraStyle(camera),
      keyframeStyle,
      playStyle,
      css.centerOrigin,
    ];

  return (
    <div className={className(...styles)}>
      <div className={style({ transform: `scale(${scale})`, perspective })}>
        <IsoScene {...props} styles={animationStyles}>
          {children}
        </IsoScene>
      </div>
    </div>
  );
};
