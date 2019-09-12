import React from 'react';
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom';
import './NotFound404.css';

class NotFound404 extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <main role="main">
                <Header images="errorHeaderImage" title="404"/>
                <div className="notFoundContainer">
                    <div className="pageHeaderContainer">
                        <h1 className="pageHeading">Page not found</h1>
                    </div>
                    <h3 className="notFoundText">Unfortunately, the page you are looking for is currently unavaliable</h3>
                    <Link to="/" className="returnHomeLink"><h4>Return home</h4></Link>
                </div>
            </main>
        )
    }
}

export default NotFound404;