import React from 'react';
import NotFound404 from './NotFound404';
import Enzyme,{ shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter()});

  it('shoule render without error', () => {
    const wrapper = shallow(<NotFound404 />);
    expect(wrapper.length).toBe(1);
  });
