import React from 'react';
import ReactDOM from 'react-dom';
import SelectDate from './SelectDate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectDate />, div);
  ReactDOM.unmountComponentAtNode(div);
});