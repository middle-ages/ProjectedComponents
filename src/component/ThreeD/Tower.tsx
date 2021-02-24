import { FC } from 'react';
import { BoxFace } from 'src/component/ThreeD/Box/Face';
import { LabeledBox } from 'src/component/ThreeD/LabeledBox';
import { LabeledTextBox } from 'src/component/ThreeD/LabeledTextBox';
import { Flex } from 'src/component/TwoD';
import { FlexDir } from 'src/css';

interface Leaf {
  args: LabeledTextBox;
}

export interface Branch {
  args: BoxFace;
  text: string;
  dir: FlexDir;
  nodes: readonly Node[];
}

interface TwoDBranch {
  dir: FlexDir;
  nodes: readonly Node[];
}

type Node = Leaf | Branch | TwoDBranch;
type LeafFn = (args: LabeledTextBox) => Leaf;
type LeafKey = typeof leafKeys[number];
type CurriedLeafFn = (common?: Partial<LabeledBox>) => (text: string) => Leaf;
type NewLeaf = Record<LeafKey, CurriedLeafFn> & LeafFn;

const leafKeys = ['link', 'textField', 'fontPicker'] as const,
  isLeaf = (x: Node): x is Leaf => !('dir' in x),
  isBranch = (x: Node): x is Branch => 'dir' in x && 'text' in x,
  isTwoDBranch = (x: Node): x is TwoDBranch => !('text' in x);

export const matchNode = (
  f: FC<Leaf>,
  g: FC<Branch>,
  h: FC<TwoDBranch>,
  empty: JSX.Element,
) => (node: Node) =>
  isLeaf(node)
    ? f(node)
    : isBranch(node)
    ? g(node)
    : isTwoDBranch(node)
    ? h(node)
    : () => empty;

const renderNode = (node: Node, idx: number) =>
  matchNode(
    leaf => <Leaf {...leaf} key={idx} />,
    branch => <Branch {...branch} key={idx} />,
    twoDBranch => <TwoDBranch {...twoDBranch} key={idx} />,
    <></>,
  )(node);

export const Leaf: FC<Leaf> = ({ args }) => <LabeledTextBox {...args} />,
  TwoDBranch: FC<TwoDBranch> = ({ nodes, dir }) => (
    <Flex {...{ dir }} styles={[{ paddingTop: 0 }]}>
      {nodes.map(renderNode)}
    </Flex>
  ),
  Branch: FC<Branch> = ({ nodes, dir, args, ...props }) => (
    <LabeledBox {...props} {...args}>
      <Flex {...{ dir }}>{nodes.map(renderNode)}</Flex>
    </LabeledBox>
  );

/** * 3D tree leaf */
export const leaf: NewLeaf = (() => {
    const fn: LeafFn = args => ({ args }),
      res = fn as NewLeaf,
      curryFn = (labelText: string) => (common: Partial<LabeledBox> = {}) => (
        text: string,
      ) => leaf({ labelText, text, ...common });

    res.link = curryFn('Link');
    res.textField = curryFn('TextField');
    res.fontPicker = curryFn('FontPicker');

    return res;
  })(),
  curryLeaf = (common: LabeledTextBox) => leafKeys.map(k => leaf[k](common));

/**
 * 1. `rowBranch` - 3D horizontal flex tree branch
 * 1. `columnBranch` - 3D vertical flex tree branch
 * 1. `vertical` - 2D vertical flex tree branch
 */
export const rowBranch = (args: Partial<BoxFace>) => (
    text: string,
    ...nodes: Node[]
  ): Branch => ({
    text,
    nodes,
    dir: 'row',
    args,
  }),
  columnBranch = (args: Partial<BoxFace>) => (
    text: string,
    ...nodes: Node[]
  ): Branch => ({
    text,
    nodes,
    dir: 'column',
    args,
  }),
  vertical = (...nodes: Node[]) => ({ nodes, dir: 'column' as FlexDir });
