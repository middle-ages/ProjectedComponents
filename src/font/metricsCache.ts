import { Measured, NumericHMetrics } from 'src/font/metrics/horizontal';
import { defined } from 'src/util';

const MAX_SIZE = 10_000;

const makeKey = ({ fontFamily, fontSize, text }: Measured): string =>
  fontFamily + '.' + fontSize + '.' + text;

export class MetricsCache {
  private cache: Map<string, NumericHMetrics> = new Map();

  get = (request: Measured): NumericHMetrics | undefined => {
    const key = makeKey(request);
    if (!this.cache.has(key)) return undefined;

    const res = this.cache.get(key);

    this.cache.delete(key);
    if (defined(res)) this.cache.set(key, res);
    return res;
  };

  put = (request: Measured, metrics: NumericHMetrics): void => {
    const key = makeKey(request);

    if (this.cache.size > MAX_SIZE)
      this.cache.delete(this.cache.keys().next().value);

    this.cache.set(key, metrics);
  };
}
