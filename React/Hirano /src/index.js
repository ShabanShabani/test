import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/scss/main.scss'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
document.getElementById('root'));
serviceWorker.unregister();
