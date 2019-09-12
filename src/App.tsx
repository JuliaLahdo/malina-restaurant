import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import Booking from './Pages/Booking/Booking';
import Confirmation from './Pages/Confirmation/Confirmation';
import Admin from './Pages/Admin/Admin';
import Edit from './Pages/Edit/Edit';
import NotFound404 from './Pages/NotFound404/NotFound404';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

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
                <Route path="/Confirmation" exact component={Confirmation} />          
                <Route path="/Admin" exact component={Admin} />
                <Route path="/Admin/Edit/:id" exact component={Edit} />
                <Route component={NotFound404} />
              </Switch>
          <Footer />
        </main>      
      </Router>
    );
  }
}

export default App;