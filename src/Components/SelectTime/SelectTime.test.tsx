import React from 'react';
import ReactDOM from 'react-dom';
import SelectTime from './SelectTime';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectTime />, div);
  ReactDOM.unmountComponentAtNode(div);
});