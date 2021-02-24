export const LineStyles = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
] as const;

export const BorderDirs = ['top', 'bottom', 'left', 'right'] as const;

export const BorderEdges = {
  none: [],
  all: ['top', 'bottom', 'left', 'right'],
  top: ['top'],
  right: ['right'],
  bottom: ['bottom'],
  left: ['left'],
  leftRight: ['left', 'right'],
  noBottom: ['top', 'left', 'right'],
  noTop: ['bottom', 'left', 'right'],
  topBottom: ['bottom', 'top'],
} as const;

export type HPadDir = 'left' | 'right' | 'both' | 'none';
export type VPadDir = 'top' | 'bottom' | 'both' | 'none';

export const PadDirMultiplier: Record<HPadDir | VPadDir, number> = {
  left: 1,
  right: 1,
  top: 1,
  bottom: 1,
  both: 2,
  none: 0,
};

export const HorizontalPadEdges: Record<keyof typeof BorderEdges, HPadDir> = {
  none: 'none',
  all: 'both',
  top: 'none',
  right: 'right',
  bottom: 'none',
  left: 'left',
  leftRight: 'both',
  noBottom: 'both',
  noTop: 'both',
  topBottom: 'none',
};

export const VerticalPadEdges: Record<keyof typeof BorderEdges, VPadDir> = {
  none: 'none',
  all: 'both',
  top: 'top',
  right: 'none',
  bottom: 'bottom',
  left: 'none',
  leftRight: 'none',
  noBottom: 'top',
  noTop: 'bottom',
  topBottom: 'both',
};
