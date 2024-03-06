import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {  BrowserRouter } from 'react-router-dom';
import theme from './styles/theme.js';
import { ThemeProvider } from 'styled-components';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './index.css';

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} >
        <ThemeProvider theme={theme} >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
