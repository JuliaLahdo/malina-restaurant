import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Admin from './Admin';
import IAdminState from "./Admin";


Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockDatabase = [
  {
    id: 1,
    customerId: 1,
    numberofGuests: 1,
    dateOfBooking: '21-21-21',
    timeOfBooking: '21:21:21',
    email: 'mo@boolean.com',
    name: 'dga',
    phone: '12424',
  }
];

it("fetches data and updates state", async() => {
  const wrapper = shallow<Admin, {}, IAdminState>(<Admin />);
  expect(wrapper.state("reservations")).toEqual([]);

 wrapper.instance().setState({
    reservations: mockDatabase
  });

  expect(wrapper.instance().state.reservations[0].id).toBe(1);
});