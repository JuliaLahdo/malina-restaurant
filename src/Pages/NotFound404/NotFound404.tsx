import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';

class NotFound404 extends React.Component {
    render() {
        return (
           <Header title="404">
            <h2>
                you are in the wrong place
            </h2>
            <Link to="/">
                return home
            </Link>
            
            </Header>
        )
    }
}

export default NotFound404;