import { FC, ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { HFlex, Labeled } from 'src/component/TwoD';
import { Styled } from 'src/component/types';
import { backgroundColor, css, defaultCss } from 'src/css';
import { style } from 'typestyle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors as colors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { scale } from 'csx';

const decode = reactElementToJSXString;

interface Source extends Styled {
  idx: number;
  name?: string;
  component: ReactElement;
}

const componentSourceStyles = [
  css.borderBox,
  css.h100,
  css.alignBaseline,
  backgroundColor('#f0f0f0ac'),
];

export const Source: FC<{ component: ReactElement }> = ({ component }) => (
  <SyntaxHighlighter language="tsx" style={colors}>
    {decode(component, { filterProps: ['key'] })}
  </SyntaxHighlighter>
);

export const ComponentSource: FC<Source> = ({
  idx,
  name = 'Anonymous',
  component,
}) => (
  <Labeled text={`${idx + 1}. ${name}`}>
    <HFlex styles={componentSourceStyles} borderEdges="all">
      {component}
      <div style={{ fontSize: '9px' }}>
        <Source {...{ component }} />
      </div>
    </HFlex>
  </Labeled>
);
