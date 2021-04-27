import { FC } from 'react';
import { demos } from 'src/component/Demos';
import { ComponentSource } from 'src/component/Source';
import { HFlex } from 'src/component/TwoD';
import { Viewport } from 'src/component/Viewport';
import { css } from 'src/css';

export const App: FC = () => (
  <div style={(css.autoOverflow, css.wh100)}>
    <Viewport
      scale={1}
      camera="iso"
      orbit="y"
      strokeWidth={2}
      periodSec={20}
      perspective="150em"
      styles={[{ padding: '1em' }]}
      isOrbiting
    >
      <HFlex wrap styles={[css.stretch]}>
        {demos.map(({ name, showSource, component }, idx) => (
          <ComponentSource
            key={idx}
            {...{ showSource, idx, name, component }}
          />
        ))}
      </HFlex>
    </Viewport>
  </div>
);
