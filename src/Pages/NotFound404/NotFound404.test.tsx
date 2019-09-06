import React from 'react';
import ReactDOM from 'react-dom';
import NotFound404 from './NotFound404';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotFound404 />, div);
  ReactDOM.unmountComponentAtNode(div);
});