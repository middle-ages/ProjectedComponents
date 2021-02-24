import { viewHeight, viewWidth } from 'csx';
import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { demos } from 'src/component/Demos';
import { Stage } from 'src/component/Stage';
import { HFlex } from 'src/component/TwoD';
import { Viewport } from 'src/component/Viewport';
import { css, translate } from 'src/css';
import { style } from 'typestyle';
import { ComponentSource } from 'src/component/Source';

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

/*




  { comp: <Box>{hello}</Box> },

        <LabeledBox text="Link" z={px(-1 * (depth + 2 * borderWidth))}>
          <VFlex>
            <LabeledBox text="Link">
              <VFlex>
                <LabeledBox text="Link">
                  <Hello />
                </LabeledBox>
              </VFlex>
            </LabeledBox>
          </VFlex>
        </LabeledBox>


      <LabeledText text="HELLOWORLD" labelText="link" />
      <Labeled borderWidth={0.25} text="link">
        <Box>
          <PlainText text="HELLO WORLD" />
        </Box>
      </Labeled>

  [link, fontPicker, textField] = curryLeaf(common),
  [row, column] = [rowBranch, columnBranch].map(applyTo(common));
const Example: FC<{
  idx: number;
  camera?: CameraKey;
  orbit?: Orbit;
  isOrbiting?: boolean;
}> = ({ idx, camera, orbit, isOrbiting }) => (
  <Viewport {...{ camera, orbit, scale, isOrbiting }} styles={[viewStyle]}>
    <Branch {...row('Foo', link('ABCDEF'))} />
  </Viewport>
);
//<Branch text="Foo" nodes={[link('fooaafsdf')]} dir="row" args={{}} />

const cameras = (startIdx: number) => (orbit?: Orbit | undefined) =>
  cameraKeys.map((camera, idx) => (
    <Example
      key={startIdx + idx}
      {...{ camera, orbit, idx: startIdx + idx }}
      isOrbiting={defined(orbit)}
    />
  ));
    <HFlex wrap styles={[css.w100]}>
      {cameras(0)()}
    </HFlex>
      {(['y', 'xyz'] as Orbit[]).map(cameras(cameraKeys.length))}
      {(['y', 'xyz'] as Orbit[]).map(cameras(cameraKeys.length))}


  <Labeled
    text={`${idx + 1}. ${camera}${defined(orbit) ? ' / ' + orbit : ''}`}
    render={(borderDef, style) => (
      <Viewport
        {...{ camera, orbit, scale, isOrbiting }}
        {...borderDef}
        styles={[viewStyle, style]}
      >
        <Branch {...row('App', demos)} />
      </Viewport>
    )}
  ></Labeled>
*/
