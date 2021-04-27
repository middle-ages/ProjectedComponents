export const Demos = () => {};

import { FC, ReactElement } from 'react';
import { Box, LabeledBox, LabeledTextBox } from 'src/component/ThreeD';
import { HFlex, Labeled, Text, VFlex } from 'src/component/TwoD';
import { bgColor, css, fontSizePx, heightPx, px, widthPx } from 'src/css';
import { style } from 'typestyle';

const plainText: Text = { showMetrics: true, text: 'HELLO' };
const labeled = { ...plainText, text: 'Label' };
const labeledText = { ...plainText, labelText: 'Label' };
const hello = (props?: Text) => <Text {...plainText} {...props} />;

export interface Demo {
  name: string;
  component: ReactElement;
}

export const demos = [
  { name: 'Text + baseline', component: hello() },
  { name: 'Text + border', component: hello({ borderEdges: 'all' }) },
  { name: 'hPad = 0', component: hello({ borderEdges: 'all' }) },
  {
    name: 'Labeled',
    component: (
      <Labeled {...labeled}>
        {hello({ borderEdges: 'all', styles: [css.whiteBg] })}
      </Labeled>
    ),
  },
  { name: 'Box', component: <Box>HELLO</Box> },
  { name: 'Box with no border', component: <Box borderWidth={0}>HELLO</Box> },
  { name: 'Box addFrontBg flag', component: <Box addFrontBg>HELLO</Box> },
  {
    name: 'Box semi-transparent front',
    component: (
      <Box>
        <div
          style={{
            background: 'linear-gradient(to bottom, blue, orange)',
            opacity: 1,
          }}
        >
          HELLO
        </div>
      </Box>
    ),
  },
  {
    name: 'The “transparent” theme',
    component: <Box boxThemeKey="transparent">HELLO</Box>,
  },
  {
    name: 'The “yellowOrange” theme',
    component: <Box boxThemeKey="yellowOrange">HELLO</Box>,
  },
  {
    name: 'LabeledBox',
    component: <LabeledBox {...labeled}>{hello()}</LabeledBox>,
  },
  {
    name: 'Grayscale LabeledBox',
    component: (
      <LabeledBox zLevel={1} boxThemeKey="grayscale" {...labeled}>
        {hello()}
      </LabeledBox>
    ),
  },
  {
    name: 'Stacked LabeledBox',
    component: (
      <LabeledBox {...labeled}>
        <LabeledBox zLevel={1} {...labeled}>
          {hello()}
        </LabeledBox>
      </LabeledBox>
    ),
  },
  { name: 'LabeledTextBox', component: <LabeledTextBox {...labeledText} /> },
  {
    name: 'opacity = 0.7',
    component: <LabeledTextBox {...labeledText} zLevel={1} />,
  },
  {
    name: '8 Level Tower',
    showSource: false,
    component: (() => {
      const max = 8;
      const Layer: FC<{ levels: number }> = ({ levels }) =>
        levels === 1 ? (
          <LabeledTextBox zLevel={1} labelText={`${max}`} text={`${max}`} />
        ) : (
          <LabeledBox text={`${max - levels + 1}`} zLevel={1}>
            <VFlex gap="1px">
              <Layer levels={levels - 1} />
            </VFlex>
          </LabeledBox>
        );

      return <Layer levels={max} />;
    })(),
  },
  {
    name: 'Cantor Set',
    showSource: false,
    component: (() => {
      const levels = 5;

      type Wide = FC<{ width: number; borderWidth?: number }>;

      const blockStyles = [fontSizePx(5), css.centerText],
        frontClassName = style(bgColor('transparent'), heightPx(20));

      const Block: Wide = ({ width, borderWidth = 1 }) => (
        <Box
          opacity={1}
          boxThemeKey="grayscale"
          {...{ borderWidth }}
          borderColor="grey"
          styles={[...blockStyles, widthPx(width)]}
          addFrontBg
        >
          <div className={frontClassName}></div>
        </Box>
      );

      const Space: Wide = ({ width }) => (
        <div className={style(widthPx(width))} />
      );

      const Branch: Wide = ({ width, borderWidth }) => (
        <VFlex noGap>
          <Block {...{ width, borderWidth }} />
          <Layer {...{ width }} />
        </VFlex>
      );

      const Layer: Wide = ({ width: totalWidth }) => {
        const width = totalWidth / 3;
        if (width <= 1 / 3) return <></>;

        const borderWidth = width <= 1 ? 0.1 : width <= 3 ? 0.5 : 1;

        return (
          <HFlex noGap>
            <Branch {...{ width, borderWidth }} />
            <Space {...{ width }} />
            <Branch {...{ width, borderWidth }} />
          </HFlex>
        );
      };

      return (
        <VFlex noGap z={px(24)} is3D>
          <Block width={3 ** levels} />
          <Layer width={3 ** levels} />
        </VFlex>
      );
    })(),
  },
];

/*
    name: 'Is 6 levels enough?',
-    component: (

-                      <LabeledBox text="Level 5" zLevel={1} opacity={0.4}>
-                        <VFlex>
-                          <LabeledTextBox
-                            zLevel={1}
-                            {...labeledText}
-                            opacity={0.3}
-                          />
-                        </VFlex>
-                      </LabeledBox>

-      <LabeledBox text="Level 1" zLevel={1}>
-        <VFlex>
-          <LabeledBox text="Level 2" zLevel={1} opacity={0.7}>
-            <VFlex>
-              <LabeledBox text="Level 3" zLevel={1} opacity={0.6}>
-                <VFlex>
-                  <LabeledBox text="Level 4" zLevel={1} opacity={0.5}>
-                    <VFlex>
-                      <LabeledBox text="Level 5" zLevel={1} opacity={0.4}>
-                        <VFlex>
-                          <LabeledTextBox
-                            zLevel={1}
-                            {...labeledText}
-                            opacity={0.3}
-                          />
-                        </VFlex>
-                      </LabeledBox>
-                    </VFlex>
-                  </LabeledBox>
-                </VFlex>
-              </LabeledBox>


*/
