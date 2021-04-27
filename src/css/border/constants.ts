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

/** Shortcuts for some subsets from the 4 sides of a rectangular shape */
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
