import React from 'react';
import ReactDOM from 'react-dom';
import Header, {IHeaderProps} from './Header';
import Enzyme,{shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter()});

  describe('header', () => {
     const props: IHeaderProps = {
        title: "",
        images:""
     }

  it('shoule render without error', () => {
      shallow(<Header {...props} />);
  });


});