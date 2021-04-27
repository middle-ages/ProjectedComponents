import { deg, repeatingLinearGradient } from 'csx';
import { CsxColorStop } from 'csx/lib/types';
import { bgColor as backgroundColor } from 'src/css/builders';
import { Style } from 'src/css/types';
import { px } from 'src/css/util';
import { Color } from 'src/css/valueTypes';
import { mergeDefined, square } from 'src/util';

export interface GridConfig {
  majorStep: number;
  color: Color;
  bgColor: Color;
  strokeWidth: number;
}

const defaultConfig: GridConfig = {
  majorStep: 24,
  color: '#ff000026',
  bgColor: 'transparent',
  strokeWidth: 0,
};

const colorStop = (color: Color, strokeWidth: number): CsxColorStop => [
    color,
    px(strokeWidth),
  ],
  parallelLines = (majorStep: number, color: Color, strokeWidth: number) => (
    angle: number,
    bgColor: Color,
  ): string => {
    const halfStroke = strokeWidth / 2,
      bottom = majorStep - halfStroke;

    return repeatingLinearGradient(
      deg(angle),
      colorStop(color, 0),
      colorStop(color, halfStroke),
      colorStop(bgColor, halfStroke),
      colorStop(bgColor, bottom),
      colorStop(color, bottom),
      colorStop(color, majorStep),
    );
  };

/**
 * A background grid for debugging layout
 *
 * Given a partial `GridConfig`, returns the `background` CSS value required
 * to render the grid as a component background. Grids shown at dev time help
 * testing.
 *
 * `background` value returned depends on the given `GridConfig`:
 *
 * ```
 * ┌──────────────────────────────┐┌───────────────────┐
 * │             INPUT            ││      STYLE        │
 * ├─────────┬───────────┬────────┤├───────────────────┤
 * │majorStep│strokeWidth│bgColor ││                   │
 * ├─────────┼───────────┼────────┤│                   │
 * │    == 0 │       any │!defined││empty style        │
 * ├─────────┼───────────┼────────┤├───────────────────┤
 * │     any │      == 0 │ defined││flat bg color      │
 * ├─────────┼───────────┼────────┤├───────────────────┤
 * │    != 0 │      != 0 │!defined││grid pattern, no bg│
 * ├─────────┼───────────┼────────┤├───────────────────┤
 * │    != 0 │      != 0 │ defined││grid pattern + bg  │
 * └─────────┴───────────┴────────┘└───────────────────┘
 * ```
 *
 * Undefined grid config values are replaced with defaults:
 * ```
 * {
 *    majorStep: 24,
 *    color: '#ff000026',
 *    bgColor: 'transparent',
 *    strokeWidth: 0,
 * }
 * ```
 * Examples:
 *
 * 1. `gridBg()`, `gridBg({strokeWidth: 0, majorStep: 100})`,
 * `gridBg({majorStep: 0, strokeWidth: 1})` - no grid nor background
 * 1. `gridBg({bgColor: 'red'})`, `gridBg({strokeWidth: 0, bgColor: 'red'})` -
 * flat red background
 * 1. `gridBg({strokeWidth: 1})` - grid with no background, using default
 * `majorStep`
 * 1. `gridBg({strokeWidth: 2, majorStep: 5, bgColor: 'red', color: 'blue'})` -
 * red background with blue colored 2px wide grid, gridlines every 5px
 *
 **/
export const gridBg = (config: Partial<GridConfig> = {}): Style => {
  const { majorStep, color, bgColor, strokeWidth } = mergeDefined(
    defaultConfig,
  )(config);

  if (majorStep === 0 || strokeWidth === 0)
    return bgColor !== undefined ? backgroundColor(bgColor) : {};

  const lines = parallelLines(majorStep, color, strokeWidth),
    background = [lines(0, 'transparent'), lines(90, bgColor)].join(',');

  const halfSize = square(px(majorStep)).join(' '),
    backgroundSize = square(halfSize).join(',');

  return { background, backgroundSize, backgroundAttachment: 'local' };
};
