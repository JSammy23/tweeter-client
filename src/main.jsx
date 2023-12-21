import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {  BrowserRouter } from 'react-router-dom';
import theme from './styles/theme.js';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from './services/userContext.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
