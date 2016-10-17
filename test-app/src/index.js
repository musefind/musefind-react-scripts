import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'imports?jQuery=jquery,$=jquery,this=>window!bootstrap/dist/js/bootstrap'

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
