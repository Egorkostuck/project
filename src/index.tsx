import React from 'react';

import {
  localStorageColorSchemeManager,
  createTheme,
  MantineProvider,
} from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import '@mantine/core/styles.css';

import { store } from 'store/store';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-color-scheme',
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
        colorSchemeManager={colorSchemeManager}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
