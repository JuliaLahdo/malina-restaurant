import React from 'react';
import MenuData from '../../Service/MenuData';
import Header from '../../Components/Header/Header';
import './Menu.css';
import food from '../../Images/menufoodimage.jpg';

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
                    <div className="titlePriceContainer">
                        <h3 className="itemTitle">{menu.menu[i].title}</h3>
                        <p className="itemPrice">{menu.menu[i].price}</p>
                    </div>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                </div>));
            }

            if(menu.menu[i].type === "main") {
                mainsItemContainer.push((<div key={i}>
                    <div className="titlePriceContainer">
                        <h3 className="itemTitle">{menu.menu[i].title}</h3>
                        <p className="itemPrice">{menu.menu[i].price}</p>
                    </div>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                </div>));
            }

            if(menu.menu[i].type === "dessert") {
                dessertsItemContainer.push((<div key={i}>
                    <div className="titlePriceContainer">
                        <h3 className="itemTitle">{menu.menu[i].title}</h3>
                        <p className="itemPrice">{menu.menu[i].price}</p>
                    </div>
                    <p className="itemDescription">{menu.menu[i].description}</p>
                </div>));
            }
        }

        return (
            <div>
                <Header images="menuImages" title="Our Menu" />

                <div className="pageHeaderContainer">
                    <h1 className="pageHeading">With a little love</h1>
                </div>
                <p className="pageDescription">With a little love we hope to bring joy to our food and other people. We focus on good fresh food, grown as locally and naturally as possible. Enjoy!</p>

                <div className="menuContainer">
                    <h2 className="categoryHeader">Starters</h2>
                    {startersItemContainer}

                    <h2 className="categoryHeader">Mains</h2>
                    {mainsItemContainer}

                    <h2 className="categoryHeader">Desserts</h2>
                    {dessertsItemContainer}
                </div>

                <div className="imageContainer">
                    <img src={food} alt="Malina restaurant window" className="windowImage" />
                </div>
            </div>
        )
    }
}

export default Menu;