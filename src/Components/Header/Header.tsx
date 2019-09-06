import React, { Component } from 'react';
import './Header.css';

export interface IHeaderProps {    
    
    title: string;
    images: string;
   
  }

export default class Header extends Component <IHeaderProps,{}>{

    constructor(props: IHeaderProps) {

        super(props);
    
      }


    render() {
        return (
         
               <div className="container">
                
                        <div className={this.props.images}>
                            <h1 className="text">
                                {this.props.title}
                            </h1>
                        </div>
               
                </div>
       
        )
    }
}
