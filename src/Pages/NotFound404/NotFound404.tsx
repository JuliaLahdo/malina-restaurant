import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';
import './NotFound404.css';

class NotFound404 extends React.Component {
    render() {
        return (
           <Header images="errorHeaderImage" title="404">
            <h2>
                you are in the wrong place
            </h2>
            <Link to="/">
                <p>return home</p>
            </Link>
            
            </Header>
        )
    }
}

export default NotFound404;