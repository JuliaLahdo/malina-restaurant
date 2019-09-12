import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Edit from './Edit';



Enzyme.configure({ adapter: new EnzymeAdapter() });

it('should render without error', () => {
    const match = { params: { bookings: 'id' } }
  const wrapper = shallow(<Edit match={match} />);
  expect(wrapper.length).toBe(1);
});