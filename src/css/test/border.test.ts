import { hasBorder } from 'src/css/border';

describe('Border CSS utils', () => {
  describe('hasBorder', () => {
    test('empty record', () => expect(hasBorder({})).toBe(false));
    test('zero width', () => expect(hasBorder({ borderWidth: 0 })).toBe(false));
    test('zero width', () =>
      expect(hasBorder({ borderWidth: 1, borderEdges: 'none' })).toBe(false));
    test('borderEdges but zero width', () =>
      expect(hasBorder({ borderWidth: 0, borderEdges: 'all' })).toBe(false));
    test('no borderEdges mentioned', () =>
      expect(hasBorder({ borderWidth: 1 })).toBe(true));
  });
});
