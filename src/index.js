import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';
import {TransactionsProvider} from './contexts/TransactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </ContextProvider>
  </React.StrictMode>
);
