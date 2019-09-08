import React from 'react';
import MenuData from '../../Service/MenuData';
import Header from '../../Components/Header/Header';
import './Menu.css';

export interface IMenuData {
    type: string;
    title: string;
    description: string;
    price: number;
}

class Menu extends React.Component {
    
    render() {

        let menu = new MenuData();
        let startersItemContainer: JSX.Element[] = [];
        let mainsItemContainer: JSX.Element[] = [];
        let dessertsItemContainer: JSX.Element[] = [];

        for (let i = 0; i < menu.menu.length; i++) {
            if(menu.menu[i].type === "starter") {
                startersItemContainer.push((<div key={i}>
                    <p className="itemTitle">{menu.menu[i].title}</p>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                    <p className="itemPrice">{menu.menu[i].price}</p>
                </div>));
            }

            if(menu.menu[i].type === "main") {
                mainsItemContainer.push((<div key={i}>
                    <p className="itemTitle">{menu.menu[i].title}</p>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                    <p className="itemPrice">{menu.menu[i].price}</p>
                </div>));
            }

            if(menu.menu[i].type === "dessert") {
                dessertsItemContainer.push((<div key={i}>
                    <p className="itemTitle">{menu.menu[i].title}</p>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                    <p className="itemPrice">{menu.menu[i].price}</p>
                </div>));
            }
        }

        console.log(menu.menu);

        return (
            <div>
                <Header images="menuImages" title="Our Menu" />
                        
                   
                <h3>Starter</h3>
                {startersItemContainer}

                <h3>Main</h3>
                {mainsItemContainer}

                <h3>Dessert</h3>
                {dessertsItemContainer}
            </div>
        )
    }
}

export default Menu;