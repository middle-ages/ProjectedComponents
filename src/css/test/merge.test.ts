import { mergeCssPair } from 'src/css/merge';

const colorRed = { color: 'red' },
  colorBlue = { color: 'blue' },
  shadowRed = { boxShadow: '1px 1px red' },
  shadowBlue = { boxShadow: '-1px -1px blue' };

describe('Merge CSS', () => {
  test('empty styles', () => expect(mergeCssPair({}, {})).toEqual({}));
  test('1st empty', () => expect(mergeCssPair(colorRed, {})).toEqual(colorRed));
  test('2nd empty', () => expect(mergeCssPair({}, colorRed)).toEqual(colorRed));

  test('2nd override wins', () =>
    expect(mergeCssPair(colorBlue, colorRed)).toEqual(colorRed));

  test('merge box shadow red first', () =>
    expect(mergeCssPair(shadowRed, shadowBlue)).toEqual({
      boxShadow: shadowRed.boxShadow + ',' + shadowBlue.boxShadow,
    }));
  test('merge box shadow blue first', () =>
    expect(mergeCssPair(shadowBlue, shadowRed)).toEqual({
      boxShadow: shadowBlue.boxShadow + ',' + shadowRed.boxShadow,
    }));

  test('stackable + non-stackable', () =>
    expect(
      mergeCssPair(
        { ...shadowRed, ...colorRed },
        { ...shadowBlue, ...colorBlue },
      ),
    ).toEqual({
      boxShadow: shadowRed.boxShadow + ',' + shadowBlue.boxShadow,
      ...colorBlue,
    }));
});
