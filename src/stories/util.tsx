import {
  StoryContext,
  StoryFnReactReturnType,
} from '@storybook/react/dist/client/preview/types';
import { FC } from 'react';
import { style } from 'typestyle';
import { FontContext, FontManager, loadStyleSheetFonts } from 'src/font';
import { backgroundColor, css, paddingPx } from 'src/css';

type Decorator = (
  Story: () => StoryFnReactReturnType,
  { loaded }: StoryContext,
) => StoryFnReactReturnType;

export const commonDefaults = {
  loaders: [async () => ({ fontManager: await loadStyleSheetFonts() })],
  decorators: [
    (Story, { loaded }) => (
      <InFontContext {...{ loaded }}>
        <Story />
      </InFontContext>
    ),
  ] as Decorator[],
} as const;

export interface InFontContext {
  loaded: {
    fontManager: FontManager;
  };
}

export const InFontContext: FC<InFontContext> = ({ children, loaded }) => (
  <div className={style(css.h100, backgroundColor('#eeeeee'), paddingPx(20))}>
    <FontContext.Provider value={loaded?.fontManager ?? new FontManager()}>
      {children}
    </FontContext.Provider>
  </div>
);
