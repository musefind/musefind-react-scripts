import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { autorun } from 'mobx';
import UIStore from './UIStore'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'imports?jQuery=jquery,$=jquery,this=>window!bootstrap/dist/js/bootstrap'

import './index.css';


autorun(() => {
  console.log(UIStore.message)
})

// test the observable stuff.
setInterval(() => {
  if (UIStore.message === 'Welcome')  UIStore.message = 'Bienvenue';
  else UIStore.message = 'Welcome';
}, 1000)

ReactDOM.render(
  <App UiStore={UIStore} />,
  document.getElementById('root')
);
