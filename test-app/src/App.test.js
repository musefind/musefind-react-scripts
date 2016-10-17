import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {observable} from 'mobx';

const MockUiStore = {
  @observable message: 'Welcome'
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App UiStore={MockUiStore} />, div);
});
