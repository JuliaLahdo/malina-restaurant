import React from 'react';
import MenuData from '../../Service/MenuData';

export interface IMenuData {
    topic: string;
    content: string;
    price: string;
}

class Menu extends React.Component {
    
    render() {

        let menu = new MenuData();
        console.log(menu.menu);

        return (
            <div>
                <p>{menu.menu[0].starters.topic}</p>
                <p>{menu.menu[0].starters.content}</p>
                <p>{menu.menu[0].starters.price}</p>
                <p>{menu.menu[0].mains.topic}</p>
                <p>{menu.menu[0].mains.content}</p>
                <p>{menu.menu[0].mains.price}</p>
                <p>{menu.menu[0].desserts.topic}</p>
                <p>{menu.menu[0].desserts.content}</p>
                <p>{menu.menu[0].desserts.price}</p>
            </div>
        )
    }
}

// render() {
//     let list = [];

//     for (let i = 0; i < this.props.todos.length; i++) {
//         list.push((<li key={i}>{this.props.todos[i].todo}</li>))
//     }

//     return(
//         <div>
//             <ul>{list}</ul>
//         </div>
//     )
// }

export default Menu;