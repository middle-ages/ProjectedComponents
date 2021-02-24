import { viewHeight, viewWidth } from 'csx';
import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { demos } from 'src/component/Demos';
import { ComponentSource } from 'src/component/Source';
import { Stage } from 'src/component/Stage';
import { HFlex } from 'src/component/TwoD';
import { Viewport } from 'src/component/Viewport';
import { css, translate } from 'src/css';
import { style } from 'typestyle';

const scale = 1,
  [x, y] = pipe([viewWidth, viewHeight], RA.ap([100 * ((scale - 1) / 2)])),
  styles = [{ transform: translate({ x, y }), padding: viewWidth(10) }],
  rootClassName = style(css.wh100, css.autoOverflow);

export const App = () => (
  <Stage>
    <div className={rootClassName}>
      <Viewport
        orbit="y"
        strokeWidth={1}
        {...{ scale }}
        {...{ styles }}
        isOrbiting
      >
        <HFlex wrap styles={[css.stretch]}>
          {demos.map(({ name, component }, idx) => (
            <ComponentSource key={idx} {...{ idx, name, component }} />
          ))}
        </HFlex>
      </Viewport>
    </div>
  </Stage>
);
