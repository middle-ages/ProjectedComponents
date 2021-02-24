export const Demos = () => {};

import { ReactElement } from 'react';
import { Box, LabeledBox, LabeledTextBox } from 'src/component/ThreeD';
import { Labeled, Text, VFlex } from 'src/component/TwoD';
import { css } from 'src/css';

const plainText: Text = { showMetrics: true, text: 'HELLO' },
  labeled = { ...plainText, text: 'Label' },
  labeledText = { ...plainText, labelText: 'Label' };

const hello = (props?: Text) => <Text {...plainText} {...props} />;

export interface Demo {
  name: string;
  component: ReactElement;
}

export const demos = [
  { name: 'Text + baseline', component: hello() },
  { name: 'Text + border', component: hello({ borderEdges: 'all' }) },
  { name: 'hPad = 0', component: hello({ borderEdges: 'all', hPad: 0 }) },
  {
    name: 'Labeled',
    component: (
      <Labeled {...labeled}>
        {hello({ borderEdges: 'all', styles: [css.whiteBg] })}
      </Labeled>
    ),
  },
  { name: 'Box', component: <Box>HELLO</Box> },
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
    name: 'opacity = 0.4',
    component: <LabeledTextBox {...labeledText} opacity={0.4} zLevel={1} />,
  },
  {
    name: 'Levels all the way down',
    component: (
      <LabeledBox text="Level 0" zLevel={1}>
        <VFlex>
          <LabeledBox text="Level 1" zLevel={1}>
            <VFlex>
              <LabeledBox text="Level 2" zLevel={1}>
                <VFlex>
                  <LabeledBox text="Level 3" zLevel={1}>
                    <VFlex>
                      <LabeledBox text="Level 4" zLevel={1}>
                        <VFlex>
                          <LabeledTextBox zLevel={1} {...labeledText} />
                        </VFlex>
                      </LabeledBox>
                    </VFlex>
                  </LabeledBox>
                </VFlex>
              </LabeledBox>
            </VFlex>
          </LabeledBox>
        </VFlex>
      </LabeledBox>
    ),
  },
];
