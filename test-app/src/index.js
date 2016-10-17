import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { observable } from 'mobx';

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'imports?jQuery=jquery,$=jquery,this=>window!bootstrap/dist/js/bootstrap'

import './index.css';


const UiStore = {
  @observable message: 'Welcome'
}

// test the observable stuff.
setInterval(() => {
  if (UiStore.message === 'Welcome')  UiStore.message = 'Bienvenue';
  else UiStore.message = 'Welcome';
}, 1000)

ReactDOM.render(
  <App UiStore={UiStore} />,
  document.getElementById('root')
);