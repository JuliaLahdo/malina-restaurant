import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Edit from './Edit';


Enzyme.configure({ adapter: new EnzymeAdapter() });

it('should render without error', () => {
  const wrapper = shallow(<Edit />);
  expect(wrapper.length).toBe(1);
});