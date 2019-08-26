import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Booking from './Pages/Booking';
import Admin from './Pages/Admin';
import Default from './Pages/Default';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Menu" exact component={Menu} />
          <Route path="/Booking" exact component={Booking} />          
          <Route path="/Admin" exact component={Admin} />
          <Route component={Default} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
