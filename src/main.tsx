import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// own imports
import App from './App';
import './assets/reset.css';
import './assets/main.css';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter><App /></BrowserRouter>
    </React.StrictMode>,
  );
}
