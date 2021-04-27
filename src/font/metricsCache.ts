import { HMetrics, Measured } from 'src/font/metrics/measured';

const MAX_SIZE = 10_000;

const makeKey = ({ fontFamily, fontSize, text }: Measured): string =>
  fontFamily + '.' + fontSize + '.' + text;

/**
 * A fixed size horizontal font metrics cache. The key type is `Measured`.
 */
export class MetricsCache {
  private cache: Map<string, HMetrics> = new Map();

  get = (request: Measured): HMetrics | undefined => {
    const key = makeKey(request);
    if (!this.cache.has(key)) return undefined;

    const res = this.cache.get(key);

    this.cache.delete(key);
    if (res !== undefined) this.cache.set(key, res);
    return res;
  };

  put = (request: Measured, metrics: HMetrics): void => {
    const key = makeKey(request);

    if (this.cache.size > MAX_SIZE)
      this.cache.delete(this.cache.keys().next().value);

    this.cache.set(key, metrics);
  };
}
