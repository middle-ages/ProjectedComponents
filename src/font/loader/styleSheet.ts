import * as AR from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { AtRule, Declaration, Expression, Parser } from 'shady-css-parser';
import { FetchFont } from 'src/font/types';
import { defined } from 'src/util';

const parser = new Parser();

export interface CssRule {
  cssText: string;
}

export interface CssFontFaceRule extends CssRule {
  type: number;
}

export interface CssRuleList {
  [Symbol.iterator](): IterableIterator<CssRule>;
}

export interface CssStyleSheet {
  rules: CssRuleList;
}

const parseExpressions = (cssText: string) =>
  (parser.parse(cssText).rules[0] as AtRule).rulelist?.rules as
    | Declaration[]
    | undefined;

const cleanUrl = (url: string) =>
    url.replace(/^url\("?/, '').replace(/"?\)$/, ''),
  cleanFamily = (url: string) => url.replace(/"/g, '');

const declarationToEntry = (d: Declaration): ['src' | 'fontFamily', string] => [
  d.name === 'src' ? 'src' : 'fontFamily',
  pipe((d.value as Expression).text, d.name === 'src' ? cleanUrl : cleanFamily),
];

const ruleToFetchFont = ({ cssText }: CssFontFaceRule): FetchFont[] => {
  const declarations = parseExpressions(cssText);
  return defined(declarations)
    ? [pipe(declarations, AR.map(declarationToEntry), Object.fromEntries)]
    : [];
};

const isFontFaceRule = (rule: CssRule): rule is CssFontFaceRule =>
  (rule as CssFontFaceRule).type === 5;

/** Parse all fonts to be fetched from a stylesheet. */
export const sheetToFonts = (styleSheet: CssStyleSheet): FetchFont[] =>
  pipe(
    styleSheet.rules,
    Array.from,
    AR.filter(isFontFaceRule),
    AR.chain(ruleToFetchFont),
  );
