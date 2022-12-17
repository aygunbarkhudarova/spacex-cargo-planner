import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CompanyContextProvider} from "./contexts/CompanyContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CompanyContextProvider>
        <App/>
      </CompanyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
