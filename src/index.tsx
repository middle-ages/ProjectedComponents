import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/component';
import { FontContext, withFontManager } from 'src/font';
import 'src/style/fonts.css';
import 'src/style/reset.css';

withFontManager(
  fontManager =>
    void ReactDOM.render(
      <FontContext.Provider value={fontManager}>
        <App />
      </FontContext.Provider>,
      document.getElementById('root'),
    ),
);
