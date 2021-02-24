import { pipe } from 'fp-ts/lib/function';
import * as RE from 'fp-ts/ReadonlyArray';
import { backgroundColor, Color, Style } from 'src/css';
import { Face, Faces } from 'src/component/ThreeD/Box/types';

export type BoxTheme = Record<Face, Color>;
export type BoxThemes = typeof BoxThemes;
export type BoxThemeKey = keyof BoxThemes;

type BoxColors = [Color, Color, Color, Color, Color, Color];
type FaceNum = 0 | 1 | 2 | 3 | 4 | 5;

const fromTuple = (colors: BoxColors) =>
    pipe(Faces, RE.zip(colors), Object.fromEntries) as BoxTheme,
  mapColors = (f: (idx: FaceNum) => Color) =>
    fromTuple(
      pipe(
        RE.range(0, 5),
        RE.map(idx => f(idx as FaceNum)),
      ) as BoxColors,
    );

const idxToPercent = (idx: number) => Math.round((100 * (6 - idx)) / 6);

const BoxThemes = {
  primary: fromTuple(['white', 'purple', 'orange', 'green', 'red', 'yellow']),
  grayscale: mapColors(i => `hsl(0deg,0%,${idxToPercent(i)}%)`),
  transparent: mapColors(() => 'transparent'),
  white: mapColors(() => 'white'),
  yellowOrange: mapColors(i => (i === 0 ? '#ffff0088' : '#ffcc0088')),
} as const;

export const boxThemes = Object.keys(BoxThemes) as BoxThemeKey[],
  boxThemeColor = (key: BoxThemeKey) => (face: Face): Color =>
    BoxThemes[key][face],
  boxThemeStyle = (key: BoxThemeKey, face: Face): Style =>
    pipe(face, boxThemeColor(key), backgroundColor);
