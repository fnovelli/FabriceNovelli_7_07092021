import logo from  './icons/icon-left-font-monochrome-white.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Register, Login, Account, Comment } from "./components/";
import { isLogged } from './components/Auth';
import React, { Component } from 'react'
import { Redirect } from 'react-router';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  async componentDidMount() {

    const logged = await isLogged()

    if (logged) {
    this.setState({
      "isLoggedIn": true 
    });
  }
}

  globalLogin = () => {
    this.setState({ "isLoggedIn": true });
  }

  globalLogout = () => {
    this.setState( { "isLoggedIn": false });
  }

 GuardedRoute = ({loggedIn, ...props}) => {
    if (loggedIn) {
      return <Route {...props} />;
    }
    return <Redirect to="/login" />
  }

  render() {
  return (
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
          <Redirect strict from="/account" to="/login" />
          <Route path="/account" exact component={() => <Account />} />
          <Route path="/message" exact component={() => <Comment />} />
        </Switch>

      </Router>


    
      <Footer />

    </div>

  );
}
}

export default App;
