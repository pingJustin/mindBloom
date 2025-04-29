import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles'; 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
