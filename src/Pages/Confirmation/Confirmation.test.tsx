import React from 'react';
import ReactDOM from 'react-dom';
import Confirmation, {IProps} from './Confirmation';
import Enzyme,{shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter()});


describe('confirmation ', () => {
    const props: IProps = {
        location: ""

    }

it('renders without crashing', () => {
    shallow(<Confirmation {...props}/>);
  });


});