import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import './Confirmation.css';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string';


interface IProps {
    location: any
}

class Confirmation extends Component<IProps, {}> {

    componentDidMount() {
        console.log(this.props.location.search)
    }

    render() {
        return (
            <div>
                   <Header images="menuImages" title="Thanks for booking" />
                        <Link to="/"><h3>Return to Home</h3></Link>                    
            </div>
        )
    }
}

export default Confirmation;