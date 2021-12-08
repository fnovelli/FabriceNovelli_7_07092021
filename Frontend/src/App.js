import logo from  './icons/icon-left-font-monochrome-white.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Register, Login, Account } from "./components/";

function App() {
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
          <Route path="/account" exact component={() => <Account />} />
        </Switch>

      </Router>


    
      <Footer />

    </div>

  );
}

export default App;
