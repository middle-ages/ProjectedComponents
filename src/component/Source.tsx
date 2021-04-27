import { FC, ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors as colors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Styled } from 'src/component/Styled';
import { HFlex, Labeled } from 'src/component/TwoD';
import { bgColor, cssOf } from 'src/css';
import { style } from 'typestyle';

const decode = reactElementToJSXString;

interface Source extends Styled {
  idx: number;
  component: ReactElement;
  name?: string;
  showSource?: boolean;
}

const parentStyles = [cssOf('h100', 'alignBaseline'), bgColor('#f0f0f0ac')],
  sourceClassName = style({ fontSize: '9px' });

export const Source: FC<{ component: ReactElement }> = ({ component }) => (
  <SyntaxHighlighter language="tsx" style={colors}>
    {decode(component, { filterProps: ['key'] })}
  </SyntaxHighlighter>
);

export const ComponentSource: FC<Source> = ({
  idx,
  component,
  name = 'Anonymous',
  showSource = true,
}) => (
  <Labeled text={`${idx + 1}. ${name}`}>
    <HFlex styles={parentStyles} borderEdges="all">
      {component}
      {showSource && (
        <div className={sourceClassName}>
          <Source {...{ component }} />
        </div>
      )}
    </HFlex>
  </Labeled>
);
