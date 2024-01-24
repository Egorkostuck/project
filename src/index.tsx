import React from 'react';

import { createTheme, MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
