import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UIStore from './UIStore'
import { observable } from 'mobx'

const tests = {
  @observable abc: 'xyz'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App UiStore={UIStore} />, div);
  
  console.log(tests.abc)
  expect(tests.abc).toEqual('xyz')
});
