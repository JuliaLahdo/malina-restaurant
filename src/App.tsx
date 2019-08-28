import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import Booking from './Pages/Booking/Booking';
import Admin from './Pages/Admin/Admin';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import NotFound404 from './Pages/NotFound404/NotFound404';


class App extends React.Component{
  render() {
    return (
      <Router>
        <main>
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Menu" exact component={Menu} />
            <Route path="/Booking" exact component={Booking} />          
            <Route path="/Admin" exact component={Admin} />
            <Route component={NotFound404} />
          </Switch>
        </main>
      </Router>
    );
  }

}

export default App;
