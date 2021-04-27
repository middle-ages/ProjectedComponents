import { render, screen } from '@testing-library/react';
import 'src/style/fonts.css';
import 'src/style/reset.css';
import { App } from 'src/component';
import { FontContext, loadLocalFonts } from 'src/font';

const fetchFont = {
  fontFamily: 'Roboto',
  src: 'style/fonts/Roboto-Regular.ttf',
};

test('Text shown', () => {
  const fontManager = loadLocalFonts([fetchFont]);
  render(
    <FontContext.Provider value={fontManager}>
      <App />
    </FontContext.Provider>,
  );

  expect(screen.getAllByText(/Set/).length).toBeGreaterThan(0);
});
