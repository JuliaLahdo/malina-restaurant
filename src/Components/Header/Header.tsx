import React, { Component } from 'react';
import './Header.css';

export interface IHeaderProps {    
    title: string;
    images: string;
  }

export default class Header extends Component <IHeaderProps,{}>{

    render() {
        return (
               <div className="headerContainer">
                        <div className={this.props.images}>
                            <h1 className="headerImageText">
                                {this.props.title}
                            </h1>
                        </div>
                </div>
        )
    }
}
