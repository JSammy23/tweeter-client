import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {  BrowserRouter } from 'react-router-dom';
import theme from './styles/theme.js';
import { ThemeProvider } from 'styled-components';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
