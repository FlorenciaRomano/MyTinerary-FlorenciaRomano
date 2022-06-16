import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from "../src/helpers/scrolltotop";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>

);



