import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './Booking';
import { shallow } from 'enzyme';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<Booking />);
   });
});