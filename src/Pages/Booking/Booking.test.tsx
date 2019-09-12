import React from 'react';
import Booking from './Booking';
import Enzyme,{ shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter()});

  it('shoule render without error', () => {
    const wrapper = shallow(<Booking />);
    expect(wrapper.length).toBe(1);
  });

  it('shoule change GDPR state', () => {
    const wrapper = shallow(<Booking />);
   expect(wrapper.state("isCheckedGdpr")).toBe(false);
   // Find a checkbox
   const toggle = wrapper.find('input[type="checkbox"]');
   expect(toggle).toHaveLength(1);
  //onChange
   toggle.simulate("change");
   expect(wrapper.state("isCheckedGdpr")).toBe(true);
  });

  // it('should handle date change after click the calender', () => {
  //   const booking = shallow(<Booking/>);
    
  //   interface IMockInterface{
  //       dateOfBooking: string;
  //       timeOfBooking: string;
  //       numberOfGuests: number;
  //       email:string;
  //       name:string;
  //       phone:string;
  //   }

  //   const mockBooking: IMockInterface = {
  //     dateOfBooking: "2019-11-11",
  //     timeOfBooking: "18:00:00",
  //     numberOfGuests: 5,
  //     email:"eunjuhuss@naver.com",
  //     name:"eunjuhuss",
  //     phone:"0101555555"
  //   } 

    
    // expect(booking.instance().state.bookings.length)
    
  // });

