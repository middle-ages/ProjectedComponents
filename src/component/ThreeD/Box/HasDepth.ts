import { BoxThemeKey } from 'src/component/ThreeD/Box/colors';
import { defaultHelpers } from 'src/util';

export interface TotalHasDepth {
  depth: number;
  boxThemeKey: BoxThemeKey;
  opacity: number;
}

export type HasDepth = Partial<TotalHasDepth>;

export const [
  splitHasDepth,
  withDefaultHasDepth,
  defaultHasDepth,
] = defaultHelpers<HasDepth>({
  depth: 18,
  boxThemeKey: 'primary',
  opacity: 1,
});
