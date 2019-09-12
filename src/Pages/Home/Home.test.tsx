import React from 'react';
import Home from './Home';
import Enzyme,{ shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter()});

  it('shoule render without error', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).toBe(1);
  });
