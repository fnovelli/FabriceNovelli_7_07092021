import logo from  './icons/icon-left-font-monochrome-white.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Register, Login, Account, Comment } from "./components/";
import React, { useState } from "react";
import { hasAuthenticated } from './services/AuthApi';
import Auth from './contexts/Auth';
import AuthenticatedRoute from './components/AuthenticatedRoute';


export default function App()  {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());


  return (


    <Auth.Provider value={{isAuthenticated}, setIsAuthenticated}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        <Router>
        <Navigation />

        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/login" exact component={() => <Login />} />

          <Route path="/message" exact component={() => <Comment />} />
        <AuthenticatedRoute path="/account" component={() => <Account />} />
        </Switch>

      </Router>

      <Footer />

      </div>

    </Auth.Provider>
  
  );
}


