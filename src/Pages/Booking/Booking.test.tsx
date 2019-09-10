import React from 'react';
import ReactDOM from 'react-dom';
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

  // it('should render correctly with no props', () => {
  //   const component = shallow(<Booking/>);    
  //   expect(component).toMatchSnapshot();
  // });

