import React, { Component } from 'react';
import './Header.css';

export interface IHeaderProps {    
    title: string;
    images: string;
  }

class Header extends Component <IHeaderProps,{}>{

    render() {
        return (
               <header className="headerContainer" role="banner">
                    <div className={this.props.images}>
                        <h1 className="headerImageText">
                            {this.props.title}
                        </h1>
                    </div>
                </header>
        )
    }
}

export default Header;