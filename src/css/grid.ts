import { deg, px, repeatingLinearGradient } from 'csx';
import { CsxColorStop } from 'csx/lib/types';
import { pipe } from 'fp-ts/lib/function';
import { Style } from 'src/css/types';
import { Color } from 'src/css/valueTypes';
import { defined, mergeDefined, square } from 'src/util';

export interface GridConfig {
  majorStep: number;
  color: Color;
  backgroundColor: Color;
  strokeWidth: number;
}

const defaultConfig: GridConfig = {
  majorStep: 24,
  color: '#ff000026',
  backgroundColor: 'transparent',
  strokeWidth: 0,
};

const colorStop = (color: Color, strokeWidth: number): CsxColorStop => [
    color,
    px(strokeWidth),
  ],
  parallelLines = (majorStep: number, color: Color, strokeWidth: number) => (
    angle: number,
    backgroundColor: Color,
  ): string => {
    const halfStroke = strokeWidth / 2,
      bottom = majorStep - halfStroke;

    return repeatingLinearGradient(
      deg(angle),
      colorStop(color, 0),
      colorStop(color, halfStroke),
      colorStop(backgroundColor, halfStroke),
      colorStop(backgroundColor, bottom),
      colorStop(color, bottom),
      colorStop(color, majorStep),
    );
  };

/**
 * A background grid for debugging layout
 *
 * Return values depend on the structure of the given `GridConfig`:
 *
 * ```
 * ┌──────────────────┬───────────┬─────┬─────────────┬──────────┐
 * │     Outcome      │ majorStep │     │ strokeWidth │ bgColor  │
 * ├──────────────────┼───────────┼─────┼─────────────┼──────────┤
 * │Empty style       │       = 0 │ OR  │         = 0 │ !defined │
 * ├──────────────────┼───────────┼─────┼─────────────┼──────────┤
 * │Flat bg color     │       = 0 │ OR  │         = 0 │  defined │
 * ├──────────────────┼───────────┼─────┼─────────────┼──────────┤
 * │Grid pattern      │       ≠ 0 │ AND │         ≠ 0 │ !defined │
 * ├──────────────────┼───────────┼─────┼─────────────┼──────────┤
 * │Grid pattern + bg │       ≠ 0 │ AND │         ≠ 0 │  defined │
 * └──────────────────┴─────────────────┴─────────────┴──────────┘
 * ```
 *
 * Undefined grid config values are replaced with defaults:
 * ```
 * {
 *   majorStep: 12,
 *   color: 'lightgray',
 *   bgColor: 'transparent',
 *   strokeWidth: 0,
 * }
 * ```
 * Examples:
 * ```
 * const noGridOrBg  = gridBackground({strokeWidth: 0});
 * const flatBg      = gridBackground({strokeWidth: 0, bgColor: 'red'});
 * const defaultGrid = gridBackground({});
 * const gridAndBg   = gridBackground({bgColor: 'red'});
 * ```
 **/
export const gridBackground = (config: Partial<GridConfig>): Style => {
  const { majorStep, color, backgroundColor, strokeWidth } = mergeDefined(
    defaultConfig,
  )(config);

  if (majorStep === 0 || strokeWidth === 0)
    return defined(config.backgroundColor) ? { backgroundColor } : {};

  const orthoLines = parallelLines(majorStep, color, strokeWidth),
    background = [
      orthoLines(0, 'transparent'),
      orthoLines(90, backgroundColor),
    ].join(','),
    backgroundSize = pipe(pipe(majorStep, px, square).join(' '), square).join(
      ',',
    );

  return {
    background,
    backgroundAttachment: 'local',
    backgroundSize,
  };
};
