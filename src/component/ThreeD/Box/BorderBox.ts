import { defaultEdgeDef, TotalEdgeDef } from 'src/css';
import {
  defaultHasDepth,
  TotalHasDepth,
} from 'src/component/ThreeD/Box/HasDepth';
import { defaultHelpers } from 'src/util';

export type TotalBorderBox = TotalHasDepth & TotalEdgeDef;

export type BorderBox = Partial<TotalBorderBox>;

export const [
  splitBorderedBox,
  mergeDefaultBorderBox,
] = defaultHelpers<BorderBox>({
  ...defaultHasDepth,
  ...defaultEdgeDef,
});
