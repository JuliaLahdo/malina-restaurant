import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import Enzyme,{ shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new EnzymeAdapter()});


it('shoule render without error', () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper.length).toBe(1);
});



it('shoule change isOpen state', () => {
  const wrapper = shallow(<Navbar />);
 expect(wrapper.state("isOpen")).toBe(false);
 // Find a checkbox
 const toggle = wrapper.find('.navBtn');
 expect(toggle).toHaveLength(1);
//onClick
 toggle.simulate("Click");
 expect(wrapper.state("isOpen")).toBe(true);
});

