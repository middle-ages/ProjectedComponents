import { Style } from 'src/css';
import { Optional } from 'src/util';

/**
 * A props type for components with a style list of type `Optional<S>`
 *
 * The styles will be merged into a class name on render. Removes burden of
 * prop merging from components that delegate props to children. Just push
 * more styles into the style list and pass it on. Only component tree leaves
 * will merge props.
 *
 * The styles are `Optional`: `undefined`, `false`, empty record, and entries
 * with `undefined` values are perfectly valid.
 */
export interface Styled<S extends Style = Style> {
  styles?: Optional<S>[];
}
