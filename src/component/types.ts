import { Style } from 'src/css';
import { Optional } from 'src/util';

export interface Styled<S extends Style = Style> {
  styles?: Optional<S>[];
}
