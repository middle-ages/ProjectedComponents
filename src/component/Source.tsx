import { FC, ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { HFlex, Labeled } from 'src/component/TwoD';
import { Styled } from 'src/component/types';
import { backgroundColor, css, defaultCss } from 'src/css';
import { style } from 'typestyle';

const decode = reactElementToJSXString;

interface Source extends Styled {
  idx: number;
  name?: string;
  component: ReactElement;
}

const className = style(css.bwBorder, css.flex1, {
    padding: '1ex',
    color: '#444444ff',
    fontSize: '9px',
    lineHeight: '1em',
  }),
  componentSourceStyles = [
    css.borderBox,
    css.h100,
    css.alignBaseline,
    backgroundColor('#f0f0f0ac'),
  ];

export const Source: FC<{ component: ReactElement }> = ({ component }) => (
  <pre {...{ className }}>{decode(component, { filterProps: ['key'] })}</pre>
);

export const ComponentSource: FC<Source> = ({
  idx,
  name = 'Anonymous',
  component,
}) => (
  <Labeled text={`${idx + 1}. ${name}`}>
    <HFlex styles={componentSourceStyles} borderEdges="all">
      {component}
      <Source {...{ component }} />
    </HFlex>
  </Labeled>
);
