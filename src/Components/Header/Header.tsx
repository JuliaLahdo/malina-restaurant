import React, { Component } from 'react';
import './Header.css';

export interface IHeaderProps {    
    
    title: any;
   
  }

export default class Header extends Component <IHeaderProps,{}>{

    constructor(props: IHeaderProps) {

        super(props);
    
      }


    render() {
        return (
            <header>
               <div className="container">
                    <div className="card">
                        <div className="title">
                            <h1 className="text">
                                {this.props.title}
                            </h1>
                           
                        </div>


                    </div>
                
                </div>
            </header>
        )
    }
}
